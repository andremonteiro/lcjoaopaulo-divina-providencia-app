import FeatherIcon from 'react-native-vector-icons/Feather';

import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  padding: 0 0px;
  background: #FFFFFF;
  border-radius: 10px;
  border-width: 2px;
  border-color: #FFFFFF;
  flex-direction: row;
  align-items: center;

  ${props => props.hasError && css`
    border-color: #c53030;
  ` }

  ${props => props.isFocused && css`
    border-color: #6D466F;
  ` }
`;

export const TextInput = styled.TextInput`
  flex: 1;
  border-radius: 5px;
  border:1px;
  border-color: rgba(24, 32, 111, 0.05);
  font-size: 12px;
  color: black;
  padding: 6px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
