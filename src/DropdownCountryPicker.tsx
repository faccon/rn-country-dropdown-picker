import React, { useRef, useState } from "react";
import Flag from "react-native-flags";
import {
  FlatList,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CountryCodes, countryData, CountryNames } from "../data";

interface RProps {
  item: string;
}

interface IProps {
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

export default function DropdownCountyPicker({
  ContainerStyle,
  InputFieldStyle,
  DropdownCountryTextStyle,
  DropdownContainerStyle,
  DropdownRowStyle,
  countryNameStyle,
  flagSize,
  flagType,
  Placeholder,
  setCountry,
}: IProps) {
  const [term, setTerm] = useState<string>("");
  const [iso, setISO] = useState<string>("");
  const [opacity, setOpacity] = useState(0);
  const [refresh, setRefresh] = useState<boolean>();
  const filteredCodes = useRef<string[]>();
  let code = useRef<string>();

  const DropdownContainerStyleDefault = {
    opacity,
    width: "100%",
  };

  const getName = (e: string): any => {
    const res = countryData.filter((i) => {
      if (i.code.toLowerCase() === e.toLowerCase()) {
        return i.name;
      }
    });
    return res[0].name;
  };

  const getCode = (e: string): any => {
    const res = countryData.filter((i) => {
      if (i.name.toLowerCase() === e.toLowerCase()) {
        return i.code;
      }
    });
    return res[0].code;
  };

  const renderItem: React.FC<RProps> = ({ item }) => {
    let name = getName(item);
    function CountrySelected(item: string) {
      let name = getName(item);
      setOpacity(0);
      if (typeof name === "undefined") {
        return;
      } else {
        setISO(item);
        setTerm(name);
        setCountry(name);
      }
    }

    return (
      <TouchableOpacity
        style={{ elevation: 1, zIndex: 1 }}
        activeOpacity={0.8}
        onPress={() => CountrySelected(item)}
      >
        <View
          style={
            DropdownRowStyle
              ? [DropdownRowStyle, styles.RowStyleDefault]
              : [styles.RowView, styles.RowStyleDefault]
          }
        >
          <View>
            <Flag
              code={item}
              size={flagSize ? flagSize : 24}
            />
          </View>
          <Text
            style={
              DropdownCountryTextStyle
                ? DropdownCountryTextStyle
                : styles.DropdownCountryTextStyle
            }
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const searchFilter = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setOpacity(1);
    setTerm(e.nativeEvent.text);
    const convertedCodes: string[] = [];
    const res = CountryNames.filter((item) => {
      return item.toLowerCase().includes(e.nativeEvent.text.toLowerCase());
    });
    res.forEach((e) => {
      code.current = getCode(e);
      convertedCodes.push(code.current!);
    });
    filteredCodes.current = convertedCodes;
    setRefresh(!refresh);
  };

  return (
    <View style={ContainerStyle ? ContainerStyle : styles.viewStyle}>
      <View
        style={
          InputFieldStyle
            ? [InputFieldStyle, styles.InputFieldDefault]
            : styles.InputField
        }
      >
        {CountryCodes.includes(iso) && CountryNames.includes(term) ? (
          <Flag code={iso} size={24} />
        ) : null}
        <TextInput
          style={
            countryNameStyle
              ? countryNameStyle
              : [
                  styles.countryNameStyle,
                  {
                    paddingStart:
                      CountryCodes.includes(iso) && CountryNames.includes(term)
                        ? 20
                        : 0,
                  },
                ]
          }
          placeholder={Placeholder ? Placeholder : "Select Country..."}
          value={term}
          onChange={searchFilter}
        />
      </View>
      <FlatList
        style={
          DropdownContainerStyle
            ? [DropdownContainerStyle, DropdownContainerStyleDefault]
            : [styles.FLstyle, DropdownContainerStyleDefault]
        }
        data={
          filteredCodes.current === null ? CountryCodes : filteredCodes.current
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        extraData={refresh}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 10,
    width: "100%",
  },
  InputField: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 6,
    borderBottomWidth: 1,
  },
  InputFieldDefault: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  DropdownCountryTextStyle: {
    fontSize: 18,
    marginVertical: 5,
    width: "100%",
  },
  FLstyle: {
    borderWidth: 0.5,
    borderTopWidth: 0,
    maxHeight: 250,
  },
  RowView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    justifyContent: "flex-start",
    paddingHorizontal: 7,
    width: "100%",
  },
  countryNameStyle: {
    paddingVertical: 8,
    fontSize: 18,
    paddingStart: 18,
    flex: 1,
  },
  RowStyleDefault: { flexDirection: "row", alignItems: "center" },
});
