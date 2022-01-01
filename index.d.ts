declare module 'rn-country-dropdown-picker' {
  import { StyleProp, TextStyle, ViewStyle } from 'react-native'

  interface RProp {
    item: string
  }
  interface ItemProps {
    country: string
    code: string
  }
  interface IProps {
    ContainerStyle?: StyleProp<ViewStyle>
    InputFieldStyle?: StyleProp<ViewStyle>
    DropdownCountryTextStyle?: StyleProp<TextStyle>
    DropdownContainerStyle?: StyleProp<ViewStyle>
    DropdownRowStyle?: StyleProp<ViewStyle>
    countryNameStyle?: StyleProp<TextStyle>
    flagSize?: number
    flagType?: string
    Placeholder?: string
    selectedItem: (e: ItemProps) => void
  }

  export type DDMPRrops = IProps
  export type RProps = RProp
}
