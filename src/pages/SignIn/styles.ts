import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const Container = styled.View`
  height:${hp('100%')}px;
  flex: 1;
  flexDirection: column;
  justifyContent: space-between;
  align-items: center;
  padding: 20px 40px ${Platform.OS === 'android' ? 40 : 40}px;
`;

export const TitleContainer = styled.View`
  height:${hp('25%')}px;
  justify-content: center;
`;

export const FormContainer = styled.View`

`;

export const Title = styled.Text`
  font-size: 30px;
  color: #ffffff;
  font-family: 'RobotoSlab-Regular';
  `;

export const ForgotPasswordButton = styled.TouchableOpacity`
  justify-content: center;
  height:${hp('7%')}px;
`;

export const ForgotPasswordText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  justify-content: center;
  height:${hp('7%')}px;
`;

export const CreateAccountText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';

`;

export const Fixed = styled.View`
`;
