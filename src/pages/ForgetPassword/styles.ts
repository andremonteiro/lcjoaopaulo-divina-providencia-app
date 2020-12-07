import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: ${hp(100)}px;
  background: #F3C711;
  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: #FFFFFF;
  font-family: 'RobotoSlab-Regular';
  margin: 64px 0 24px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #F3C711;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSignInText = styled.Text`
  color: #4F4F4F;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`;

export const Block = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5% 30px 15%;

  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: #FFFFFF
`;
