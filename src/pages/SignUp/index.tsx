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
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [loading, setLoadingState] = useState(false)

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      if(data.password.length < 6){
        Alert.alert(
          'Atenção!',
          'A senha deve ter pelo menos 6 caracteres.',
        );
        return;
      }
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Informe um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
      });
      
      await schema.validate(data, { abortEarly: false });

      setLoadingState(true);
      const result = axios.post(`${config.apiUri}/user`, data)
      .then(res => {
        Alert.alert(
          'Cadastro realizado',
          'Você já pode efetuar o seu logon no GoBarber!',
        );
        navigation.goBack();
        setLoadingState(false)
      })
      .catch(err => {
        console.log(err);
        setLoadingState(false)
        Alert.alert(
          'Erro no cadastro',
          'Este usuário já está registrado, tente novamente.',
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
            <Title>CRIE SUA CONTA</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Input
              autoCapitalize="words"
              name="name"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              ref={emailInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              secureTextEntry
            />

            <Input
              ref={confirmPasswordInputRef}
              name="confirmPassword"
              placeholder="Confirme sua senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
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

export default SignUp;
