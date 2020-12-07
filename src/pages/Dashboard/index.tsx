import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, ScrollView, Text, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import donateIcon from '../../assets/donate-icon.png';

import axios from 'axios';
import { config } from '../../utils/config';

import {
  Container, Header, UserName, ProfileButton, UserAvatar, Description, RectangleBotton,
  Block, RectangleText, SignOutButton
} from './styles';

import { useAuth } from '../../hooks/auth';

export interface Provider {
  id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();
  const [uri , setUri] = useState('');

  const { navigate } = useNavigation();

  const handleNavigateToCreateAppointment = useCallback(() => {
    navigate('CreateAppointment');
  }, [navigate]);

  useEffect(() => {
    (async () => {
      const result = await axios.post(`${config.apiUri}/getAvatar`, { email:user.email });
      var uri = "https://shrouded-castle-28692.herokuapp.com"+result.data.uri;
      setUri(uri);
    })();
  }, []);

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
      
      const res = await axios.post(`${config.apiUri}/upload`,{'userinfo' : user ,'imgsource' : data.data})
      var uri = "https://shrouded-castle-28692.herokuapp.com/profile_photo/"+res.data['filename']+".png";
      setUri(uri);
    });
  }, [updateUser, user.id]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <Header>
          <SignOutButton onPress={ signOut }>
              <Icon
                name="log-out"
                size={30}
                color="white"
              />
            </SignOutButton>
          <ProfileButton onPress={ handleUpdateAvatar }>
            <UserAvatar source={{ uri: uri }} />
          </ProfileButton>
          <UserName>{ user.name }</UserName>
          <Description>Vamos começar</Description>
          <Block>
            <RectangleBotton onPress={ handleNavigateToCreateAppointment }>
              <Image source={donateIcon} style={{width: '100%', height:"100%"}}/>
            </RectangleBotton>
            <RectangleText>Apadrinhe um aluno!</RectangleText>
          </Block>
        </Header>
      </Container>
    </ScrollView>
  );
};

export default Dashboard;
