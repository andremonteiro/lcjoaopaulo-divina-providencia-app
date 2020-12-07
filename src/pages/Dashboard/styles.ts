import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

import { Provider } from './index';

export const Container = styled.View`
  font-family: Roboto;
  color: #FFFFFF;
`;

export const Header = styled.View`
  height: ${hp(100)}px;
  padding-top: 24px;
  
  padding-top: ${ getStatusBarHeight() + 70 }px;
  background: #8EC74C;
  align-items: center;
`;

export const RectangleText = styled.Text`
  text-align: center;
  color: #FFFFFF;
  font-size: 12px;
  margin-top: 9px;
`;

export const UserName = styled.Text`
  color: #FFFFFF;
  font-size: 24px;
  padding:16px 0 0px 0;

`;

export const Description = styled.Text`
  font-size: 22px;
  color: #FFFFFF;
  padding: 16px 0 0 0;
`;

export const RectangleBotton = styled.TouchableOpacity`
  width: 66px;
  height: 66px;
  border-radius: 5px;
  
  margin: 0 10px 0 10px;
`;

export const SignOutButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top:30px;
  width: 30px;
  height: 30px;
`;

export const ProfileButton = styled.TouchableOpacity`
  background: #FFFFFF;
  border-radius: 100px;
`;

export const UserAvatar = styled.Image`
  width: 125px;
  height: 125px;
  border-radius: 100px;
`;

export const ProviderList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 11px 24px 16px;
  background: #FFFFFF;
`;

export const ProviderListTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 24px;
  color: #000000;
`;

export const ProviderContainer = styled(RectButton)`
  background: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.View`
  width: 91px;
  height: 91px;
  background: #B6B4B4;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #000000;
  font-family: 'Roboto';
  font-size: 14px;
`;

export const ProviderMetaTextSm = styled.Text`
  margin-left: 8px;
  color: #000000;
  font-family: 'Roboto';
  font-size: 12px;
`;

export const Block = styled.View`
  alignItems: center;
  text-align: center;
  padding: 45px 50px 0px 50px;
`;

export const donteIcon = styled.Image`
  width: ${wp("100%")}px;
  height: ${hp("100%")}px;
`