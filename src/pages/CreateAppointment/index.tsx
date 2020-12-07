import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { Alert, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
// import { CreditCardInput } from "react-native-input-credit-card";
import { CreditCardInput } from "../../components/react-native-input-credit-card";
import { FormHandles } from '@unform/core';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import Stripe from '../../utils/stripe.js';
import api from '../../services/api';
import axios from 'axios';
import { config } from '../../utils/config';

import {
  Container, Header, BackButton, Content,CreateAppointmentButton, CreateAppointmentButtonText, ContentTitle, 
  Block, DescriptionView, DescriptionNews,PaymentGroup, PaymentDesciption, ValueConform, ValueConformTitle,
  ValueContent, Currency, Value, ModalCancel, ModalCancelText, UpdateText, UpdateValue, CurrencyUpdateValue
} from './styles';

import { useAuth } from '../../hooks/auth';

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {

  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const [state, setState] = useState({
    planList: [],
    test_planList: [],
    live_planList: [],
    planModalState: false,
    cardModalState: false,
    loading: true,
    switch: false,
    test_exitplan:{
      price: "",
      text: ""
    },
    live_exitplan:{
      price: "",
      text: ""
    },
    selectPlan: {
      id: "",
      text: 'selecione seu plano',
      price: '0'
    },
  });

  const [cardState, setCardState] = useState({
    valid:false,
    cvc:"",
    expiry:"",
    number:"",
    type:""
  });

  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();

  const client_test = new Stripe(user.key.test);
  const client_live = new Stripe(user.key.live);
  useEffect(() => {
    loadPlanList();
  }, []);

  const handleNavigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const format = (string: string) => {
    return `${(parseFloat(string) / 100).toFixed(2)}`;
  }

  const loadPlanList = async() => {
    let temp_test = {price:'', text:''};
    let temp_live = {price:'', text:''};
    const result_test = await axios.post(`${config.apiUri}/getallplanlist`, {env: true});
    const result_live = await axios.post(`${config.apiUri}/getallplanlist`, {env: false});
    if(user.subscription_test){
      const plan_test = await axios.post(`${config.apiUri}/exitplan`,{subscription: user.subscription_test, env: "test"});
      temp_test = {price:plan_test.data.responsedata.amount, text: plan_test.data.responsedata.nickname};
    }
    if(user.subscription_live){
      const plan_live = await axios.post(`${config.apiUri}/exitplan`,{subscription: user.subscription_live, env: "live"});
      temp_live = {price:plan_live.data.responsedata.amount, text: plan_live.data.responsedata.nickname};
    }
    setState({...state, test_exitplan: temp_test ,live_exitplan: temp_live ,test_planList : result_test.data.products[0]['plans'], live_planList : result_live.data.products[0]['plans'], loading:false});
  }
  const togglePlanModal = () => {
    setState({...state, planModalState: !state.planModalState});
  };
  
  const setPlan = async (item : any) => {
    setState({...state, planModalState: false, selectPlan: { id: item.id, price: item.amount, text: item.nickname }});
  };

  const makePayment = async() => {

    if(!state.switch){
      if(user.subscription_live && state.selectPlan.id){
        try{
          setState({...state, loading:true})
          const res = await axios.post(`${config.apiUri}/updateplan`,{
            subscription: user.subscription_live,
            updateplan: state.selectPlan.id,
            env: "live"
          })
          navigate('AppointmentCreated');
          setState({...state, loading:false});
        }catch(e){
          setState({...state, loading:false});
          Alert.alert(
            'Advertir!',
            `Existe um problema com o servidor.Entre em contato com o suporte.`,
          );
        }
      }
      else if(cardState.valid && state.selectPlan.id && !user.subscription_live){
        try{
          setState({...state, loading:true})
          const temp = {
            "number": cardState.number,
            "exp_month":cardState.expiry.split('/')[0],
            "exp_year":cardState.expiry.split('/')[1],
            "cvc":cardState.cvc
          }
          const token = await client_live.createToken(temp)
          const res = await api.post(`${config.apiUri}/appointments`,{
            customerEmail: user.email,
            planId: state.selectPlan.id,
            env: "live",
            stripeToken:token
          })
          signIn({
            email: user.email,
            password: user.password,
          });
          setState({...state, loading:false});
          navigate('AppointmentCreated');
        }catch(e){
          setState({...state, loading:false});
          Alert.alert(
            'Advertir!',
            `Existe um problema com o servidor.Entre em contato com o suporte.`,
          );
        }
      }else{
        setState({...state, loading:false});
        Alert.alert(
          'Advertir!',
          'Preencha todos os campos',
        );
      }
    }
    else{
      if(user.subscription_test && state.selectPlan.id){
        try{
          setState({...state, loading:true})
          const res = await axios.post(`${config.apiUri}/updateplan`,{
            subscription: user.subscription_test,
            updateplan: state.selectPlan.id,
            env: "test"
          })
          navigate('AppointmentCreated');
          setState({...state, loading:false});
        }catch(e){
          setState({...state, loading:false});
          Alert.alert(
            'Advertir!',
            `Existe um problema com o servidor.Entre em contato com o suporte.`,
          );
        }
      }
      else if(cardState.valid && state.selectPlan.id && !user.subscription_test){
        try{
          setState({...state, loading:true})
          const temp = {
            "number": cardState.number,
            "exp_month":cardState.expiry.split('/')[0],
            "exp_year":cardState.expiry.split('/')[1],
            "cvc":cardState.cvc
          }
          const token = await client_test.createToken(temp)
          const res = await api.post(`${config.apiUri}/appointments`,{
            customerEmail: user.email,
            planId: state.selectPlan.id,
            env: "test",
            stripeToken:token
          })
          signIn({
            email: user.email,
            password: user.password,
          });
          setState({...state, loading:false});
          navigate('AppointmentCreated');

        }catch(e){
          setState({...state, loading:false});
          Alert.alert(
            'Advertir!',
            `Existe um problema com o servidor.Entre em contato com o suporte.`,
          );
        }
      }else{
        Alert.alert(
          'Advertir!',
          'Preencha todos os campos',
        );
      }
    }
  }

  const toggleSwitch = () => {
    setState({
      ...state, 
      switch: !state.switch,
      selectPlan: {
        id: "",
        text: 'selecione seu plano',
        price: '0'
      }
    });
  }

  const _onChange = (form: any) => {
    setCardState({...cardState, 
      valid:form.valid, 
      cvc:form.values.cvc, 
      expiry:form.values.expiry, 
      number:form.values.number, 
      type:form.values.type
    })
  }

  return (
    <Container>
      <Spinner
        visible={state.loading}
        textStyle={{'color': '#000000'}}
      />
      <Modal
        isVisible={state.planModalState}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: hp(50),
            width: wp(85),
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text style={{ width: wp(100), textAlign: 'center' }}>
            Selecione seu plano
          </Text>
          <View style={{ height: hp(45), width: wp(85) }}>
            <ScrollView>
              {
                state.switch?
                <>
                  {state.test_planList.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        height: hp(5),
                        width: wp(85),
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }} onPress={() => setPlan(item)}>
                      <Text>{item['nickname']}(R${item['amount']})</Text>
                    </TouchableOpacity>
                  ))}
                </>:
                <>
                  {state.live_planList.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        height: hp(5),
                        width: wp(85),
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }} onPress={() => setPlan(item)}>
                      <Text>{item['nickname']}(R${item['amount']})</Text>
                    </TouchableOpacity>
                  ))}
                </>
              }
              

            </ScrollView>
            <ModalCancel>
              <ModalCancelText onPress={togglePlanModal} >Cancelar</ModalCancelText>
            </ModalCancel>
          </View>
        </View>
      </Modal>

      <Header>
        <BackButton onPress={handleNavigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <View style={{display:'flex', flexDirection: 'row', alignItems:'center'}}>
          <Text style={{marginRight: 10 }}>
            Modo de teste
          </Text>
          <Switch
            onValueChange={toggleSwitch}
            value={state.switch}
          />  
        </View>
      </Header>

      <Content>

        <ContentTitle>
          Apadrinhamento
        </ContentTitle>
        <Block onPress={togglePlanModal}>
          <DescriptionView>Plano Mensal</DescriptionView>
          <DescriptionNews>{state.selectPlan.text}</DescriptionNews>
        </Block>

        <PaymentGroup>
          <PaymentDesciption>Método de pagamento</PaymentDesciption>
          {
            state.switch?
            <>
              {
                user.subscription_test?
                <>
                  <UpdateText>Você está contribuindo com o seguinte plano:</UpdateText>
                  <UpdateText>{state.test_exitplan.text}</UpdateText>
                  <UpdateValue><CurrencyUpdateValue>R$</CurrencyUpdateValue>{format(state.test_exitplan.price)}</UpdateValue>
                </>:
                <CreditCardInput onChange={(form) =>_onChange(form)} />
              }
            </>:
            <>
              {
                user.subscription_live?
                <>
                  <UpdateText>Você está contribuindo com o seguinte plano:</UpdateText>
                  <UpdateText>{state.live_exitplan.text}</UpdateText>
                  <UpdateValue><CurrencyUpdateValue>R$</CurrencyUpdateValue>{format(state.live_exitplan.price)}</UpdateValue>
                </>:
                <CreditCardInput onChange={(form) =>_onChange(form)} />
              }
            </>
          }
        </PaymentGroup>
        <ValueConform>
            <ValueConformTitle>Valor</ValueConformTitle>
            <ValueContent>
              <Currency>R$</Currency>
              <Value>{state.selectPlan.price}</Value>
            </ValueContent>
          </ValueConform>
        <CreateAppointmentButton onPress={makePayment}>
          {
              state.switch?
              <>
                {
                  user.subscription_test?
                    <CreateAppointmentButtonText>Mudar adesão</CreateAppointmentButtonText>
                  : <CreateAppointmentButtonText>Enviar doação</CreateAppointmentButtonText> 
                }
              </>:
              <>
                {
                  user.subscription_live?
                    <CreateAppointmentButtonText>Mudar adesão</CreateAppointmentButtonText>
                  : <CreateAppointmentButtonText>Enviar doação</CreateAppointmentButtonText> 
                }
              </>
          }
   
        </CreateAppointmentButton>
        

      </Content>
    </Container>
  );
};

export default CreateAppointment;
