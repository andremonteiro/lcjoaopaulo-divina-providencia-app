import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  View, Image, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert,
} from 'react-native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container, Title, ForgotPasswordButton, ForgotPasswordText, CreateAccountButton, CreateAccountText, Fixed,
  TitleContainer, FormContainer
} from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';


interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [loading, setLoadingState] = useState(false)

  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Informe um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });
      setLoadingState(true);
      await signIn({
        email: data.email,
        password: data.password,
      });
      Alert.alert(
        'Logon realizado',
        'Você foi autenticado com sucesso!',
      );
      setLoadingState(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      setLoadingState(false);
      Alert.alert(
        'Erro na autenticação',
        'O usuário informado não está registrado!',
      );
    }
  }, [signIn]);

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
          <TitleContainer>
            <Title>Bem vindo ao SOL</Title>
          </TitleContainer>

            <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Input
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
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>Login</Button>
            </Form>

          {/* <ForgotPasswordButton>
            <ForgotPasswordText onPress={() => navigation.navigate('ForgetPassword')}>Esqueci minha senha</ForgotPasswordText>
          </ForgotPasswordButton> */}

          <CreateAccountButton>
            <CreateAccountText onPress={() => navigation.navigate('SignUp')}>Criar uma conta</CreateAccountText>
          </CreateAccountButton>

          <Fixed>
            <Image source={logoImg}/>
          </Fixed>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
