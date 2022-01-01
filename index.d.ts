declare module 'rn-country-dropdown-picker' {
  import { StyleProp, TextStyle, ViewStyle } from 'react-native'
  import { ComponentType } from 'react'

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

  export type RProps = RProp & IProps
  export type RenderComProp = RProp

  const DDMPRrops: ComponentType<IProps> & RProp
  export default DDMPRrops
}
