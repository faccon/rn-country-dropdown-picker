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
  View,
  ViewStyle,
} from "react-native";
import { CountryCodes, countryData, CountryNames } from "./data";

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
}

export default function App({
  ContainerStyle,
  InputFieldStyle,
  DropdownCountryTextStyle,
  DropdownContainerStyle,
  DropdownRowStyle,
  countryNameStyle,
  flagSize,
  flagType,
  Placeholder,
}: IProps) {
  const [term, setTerm] = useState<string>("");
  const [iso, setISO] = useState<string>("");
  const [opacity, setOpacity] = useState(0);
  const [refresh, setRefresh] = useState<boolean>();
  const filteredCodes = useRef<string[]>();
  let code = useRef<string>();

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
      }
    }

    return (
      <View style={{ elevation: 1, zIndex: 1 }}>
        <View
          style={
            DropdownRowStyle
              ? DropdownRowStyle
              : [styles.RowView, { flexDirection: "row", alignItems: "center" }]
          }
        >
          <View>
            <Flag
              code={item}
              size={flagSize ? flagSize : 24}
              type={flagType === "shiny" || "flat" ? flagType : null}
            />
          </View>
          <Text
            style={
              countryNameStyle ? countryNameStyle : styles.countryNameStyle
            }
            onPress={() => CountrySelected(item)}
          >
            {name}
          </Text>
        </View>
      </View>
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
      <View style={InputFieldStyle ? InputFieldStyle : styles.InputField}>
        {CountryCodes.includes(iso) && CountryNames.includes(term) ? (
          <Flag code={iso} size={24} />
        ) : null}
        <TextInput
          style={
            DropdownCountryTextStyle
              ? DropdownCountryTextStyle
              : [
                  styles.DropdownCountryTextStyle,
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
            ? DropdownContainerStyle
            : [styles.FLstyle, { opacity, width: "100%" }]
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
  DropdownCountryTextStyle: {
    fontSize: 18,
    marginVertical: 5,
    width: "100%",
  },
  FLstyle: {
    borderWidth: 0.5,
    borderTopWidth: 0,
    maxHeight: 500,
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
});
