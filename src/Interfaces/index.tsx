import {
    StyleProp,
    TextStyle,
    ViewStyle,
  } from "react-native";

export interface RProps {
    item: string;
  }
  
export interface IProps {
    ContainerStyle?: StyleProp<ViewStyle>;
    InputFieldStyle?: StyleProp<ViewStyle>;
    DropdownCountryTextStyle?: StyleProp<TextStyle>;
    DropdownContainerStyle?: StyleProp<ViewStyle>;
    DropdownRowStyle?: StyleProp<ViewStyle>;
    countryNameStyle?: StyleProp<TextStyle>;
    flagSize?: number;
    flagType?: string;
    Placeholder?: string;
    setCountry: (e: string) => void;
  }