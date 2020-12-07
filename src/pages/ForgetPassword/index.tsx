import { useNavigation } from '@react-navigation/native';
import React, { useRef, useCallback, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View, Image, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { config } from '../../utils/config';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, Block } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';


interface SignUpFormData {
  email: string;
  password: string;
}

const ForgetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [loading, setLoadingState] = useState(false)

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Informe um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
      });
      if(data.password.length < 6){
        Alert.alert(
          'Atenção!',
          'A senha deve ter pelo menos 6 caracteres.',
        );

        return;
      }
      
      await schema.validate(data, { abortEarly: false });
      setLoadingState(true);
      axios.post(`${config.apiUri}/updatepassword`, data)
      .then(res => {
        Alert.alert(
          'Em formação!',
          'Sua senha foi alterada corretamente.',
        );
        navigation.goBack();
        setLoadingState(false)
      })
      .catch(err => {
        setLoadingState(false)
        Alert.alert(
          'Erro de mudança',
          'O usuário informado não está registrado!',
        );
        return;    
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer o seu cadastro, tente novamente.',
      );
    }
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Spinner
            visible={loading}
            textStyle={{'color': '#000000'}}
          />
          <View>
            <Title>Mudar Senha</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>

            <Input
              ref={emailInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              placeholder="Seu email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              placeholder="Nova senha"
              textContentType="newPassword"
              returnKeyType="next"
              secureTextEntry
            />

          </Form>

          <Block>
            <Button onPress={() => formRef.current?.submitForm()}>Cadastre-se</Button>
          </Block>
        </Container>


      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;
