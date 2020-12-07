import FeatherIcon from 'react-native-vector-icons/Feather';

import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 10px;
  background: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 20px;
  border-width: 2px;
  border-color: #FFFFFF;
  flex-direction: row;
  align-items: center;

  ${props => props.hasError && css`
    border-color: #0017ff;
  ` }

  ${props => props.isFocused && css`
    border-color: #6D466F;
  ` }
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #6D466F;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
