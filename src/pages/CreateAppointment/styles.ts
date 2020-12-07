import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

import { Provider } from '../Dashboard';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  background: #FFFFFF;
  flex: 1;
`;

export const Header = styled.View`
  padding: 5px 24px 0 24px;
  padding-top: ${ getStatusBarHeight() + 10 }px;

  flex-direction: row;
  justify-content: space-between;
  text-align: right;
`;

export const BackButton = styled.TouchableOpacity`
`;

// export const SwitchText = styled.Text`

// `;

export const Content = styled.ScrollView`
  margin-top: 20px;
  padding: 0px 0px 0 0px;
`;

export const ProviderList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderListContainer = styled.View`
  height: 112px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${ props => (props.selected ? '#ff9000' : '#3e3b47') };
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${ props => (props.selected ? '#232129' : '#f4ede8') };
`;

export const Calendar = styled.View`
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content:center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
`;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${ props => (props.selected ? '#ff9000' : '#3e3b47') };
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${ props => (props.available ? 1 : 0.3) };
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${ props => (props.selected ? '#232129' : '#f4ede8') };
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const CreateAppointmentButton = styled(OpenDatePickerButton)`
  border-radius: 5px;
  height: 50px;
  background: #75C283;
  border-radius: 5px;
  margin: 16px 50px 24px 50px;
`;

export const CreateAppointmentButtonText = styled(OpenDatePickerButtonText)`
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
`;

//////new

export const ContentTitle = styled.Text`
  font-size: 24px;
  text-align: center;
  margin:0 50px 0 50px;
`;

export const Block = styled.TouchableOpacity`
  background: #FFFFFF;
  padding:9px 30px;
  margin: 15px 50px 0 50px;
  margin-top: 15px;
  border: 1px solid #DDDADA;
  border-radius: 10px;
`;

export const DescriptionView = styled.Text`
  font-size: 12px;
`;

export const DescriptionNews = styled.Text`
  color: #75C283;
  font-size: 14px;
`;

export const PaymentGroup = styled.View`
  margin: 20px 5px 0 5px;
  margin-top: 20px;
`;

export const  PaymentDesciption = styled.Text`
  font-size:18px;
  margin-top: 8px;
  text-align: center;
  font-family: Roboto;
`;

export const CardEditButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 13px 19px;
  border-radius: 10px;
  border-color: #000000;
  margin-top:5px;
  border: 1px;
`;

export const CardTemp = styled.View`
  width: 78px;
  height: 49px;
  background: #69B07B;
  border-radius: 5px;
`;

export const CardDescription = styled.Text`
  margin-left: 19px;
  color: #686767;
  font-size: 12px;
  align-items: center;
`;

export const Line = styled.View`
  margin-top: 25px;
  background: #000000;
  height: 11px;
`;

export const ValueConform = styled.View`
  margin: 0 50px 0 50px;
  padding:5px;
`;

export const ValueConformTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
`;

export const ValueContent = styled.View`
  display:flex;
  flex-direction: row;
  margin:auto;
`;

export const Currency = styled.Text`
  color: #69B07B;
  font-size: 18px;
  font-weight: bold;
`;

export const Value = styled.Text`
  color: #69B07B;
  font-size: 48px;
  font-weight: bold;
`;
 
export const ModalCancel = styled.TouchableOpacity`
  margin: 10px auto 10px auto;
  background:#000000;
  width: ${wp(15)}px;
  height: ${hp(5)}px;
  border-radius: 5px;
`;

export const ModalCancelText = styled.Text`
  color: #ffffff;
  margin: auto;
  text-align: center;
  font-family: Roboto;
`;

export const Input = styled.TextInput`
  flex: 1;
  border-radius: 5px;
  border:1px;
  border-color: rgba(24, 32, 111, 0.05);
  font-size: 12px;
  color: black;
  padding: 6px;
  font-family: 'RobotoSlab-Regular';
`;

export const Row = styled.View`
  padding: 3px 0;
  border-bottom-width: 1px;
  border-bottom-color: rgba(24, 31, 77, 0.15);
`;

export const UnLineRow = styled.View`
  padding: 3px 0;
`;

export const RowTitle = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #9B9EB1;
`;

export const Label = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  margin-bottom:3px;
  color: #000000;
`;

export const InLine = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InLineBlock = styled.View`
  width: 48%;
`;

export const UpdateText = styled.Text`
  text-align: center;
  margin-top: 20px;
  color: black;
  font-size: 20px;
`;

export const UpdateValue = styled.Text`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 50px;
  color: black;
  font-size: 25px;
`;

export const CurrencyUpdateValue = styled.Text`
  margin-left: 30px;
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  color: #69B07B;
`;