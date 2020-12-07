import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #6D466F;
  border-radius: 35px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #FFFFFF;
  font-size: 20px;
`;
