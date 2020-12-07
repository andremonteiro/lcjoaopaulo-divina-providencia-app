import { useNavigation } from '@react-navigation/native';
import React, { useRef, useCallback } from 'react';
import {
  View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert, PermissionsAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import api from '../../services/api';

import {
  Container, BackButton, Title, UserAvatarButton, UserAvatar,
} from './styles';


import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const handleGoBack = useCallback(async () => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmit = useCallback(async (formData: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Informe um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required(('Campo obrigatório')),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required(('Campo obrigatório')),
          otherwise: Yup.string(),
        }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
      });

      await schema.validate(formData, { abortEarly: false });

      const {
        name, email, old_password, password, password_confirmation,
      } = formData;

      const userProfile = {
        name,
        email,
        ...(old_password ? { old_password, password, password_confirmation } : {}),
      };

      const { data } = await api.put('/profile', userProfile);

      updateUser(data);

      Alert.alert(
        'Perfil atualizado com sucesso!',
      );

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na atualização do perfil',
        'Ocorreu um erro ao atualizar o seu perfil, tente novamente.',
      );
    }
  }, [navigation, updateUser]);

  const handleUpdateAvatar = useCallback(async () => {
    ImagePicker.showImagePicker({
      title: 'Selecione um avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar Câmera',
      chooseFromLibraryButtonTitle: 'Escolha da Galeria',
      cameraType: 'front',
      quality: 0.7,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'Pictures/myAppPicture/', // -->this is neccesary
        privateDirectory: true,
      },
    }, async data => {
      if (data.didCancel) {
        return;
      }

      if (data.error) {
        Alert.alert('Erro ao atualizar seu avatar.');
        return;
      }
      api.post('/upload',
        {
          'imgsource' : data.data,
        },
      )
      .then(response => {
        console.log(response);
        console.log("ok")
      })
      .then(error => {
        console.log('err');
      })
    });
  }, [updateUser, user.id]);


  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <BackButton onPress={ handleGoBack }>
            <Icon name="chevron-left" size={ 24 } color="#999591" />
          </BackButton>

          <UserAvatarButton onPress={ handleUpdateAvatar }>
          </UserAvatarButton>

          <View>
            <Title>Email : {user.email}</Title>
            <Title>UserName : {user.name}</Title>
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
