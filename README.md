# rn-country-dropdown-picker

A fully customizable react native component that displays the flag and name of the selected country from a dropdwon list.


## Import components

1. `npm i react-native-flag` install peer dependencies
2. `npm i rn-country-dropdown-picker`



### Import Component
```javascript
import CountryPicker from 'rn-country-dropdown-picker';

```

## Usage

This component can be used as it is with any customization, just import and use

```jsx

import React from "react";
import {StyleSheet, View } from "react-native";
import CountryPicker from "rn-country-dropdown-picker";

function Home() {

  function setCountry(e: string) {
    console.log(e);
  }

  return (
    <View style={styles.container}>
      <CountryPicker setCountry={setCountry} />
    </View>
  );
}

const styles = StyleSheet.create({...},});

export default Home;


```

## Usage with customizations

```jsx

import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import CountryPicker from "rn-country-dropdown-picker";

function Home() {

  function setCountry(e: string) {
    console.log(e);
  }

  return (
    <View style={styles.container}>
     <CountryPicker
        InputFieldStyle={styles.ContainerStyle}
        DropdownContainerStyle={styles.myDropdownContainerStyle}
        DropdownRowStyle={styles.myDropdownRowStyle}
        Placeholder="choose country ..."
        DropdownCountryTextStyle={styles.myDropdownCountryTextStyle}
        countryNameStyle={styles.mycountryNameStyle}
        flagSize={24}
        setCountry={setCountry}
      />

    </View>
  );
}

const styles = StyleSheet.create({{...},});

export default Home;


```

| Props                         | Type               | Description                                                                 	          |  Optional      |
| ----------------------------- | ------------------ | -------------------------------------------------------------------------------------- | -------------- |
| InputFieldStyle		            | View Style	       | Defines the first color in the linear gradient of a chart's background   	            |      yes       |
| ContainerStyle                | View Style         | Defines the View style of the components container    				                          |      yes       |
| DropdownCountryTextStyle      | Text Style         | Defines the style of the country names in the dropdown    			                        |      yes       |
| DropdownContainerStyle	      | View Style         | Defines the style of the whole dropdown container        			                        |      yes       |
| DropdownRowStyle		          | View Style         | Defines the style of the individual view row in the dropdown ( icon + country name )   |      yes       |
| countryNameStyle	          	| Text Style         | Defines the style of the selected country name  					                              |      yes       |
| flagSize			                | Number             | Flag size according to react-native-flags  (Allowed values: 16, 24, 32, 48 or 64)      |      yes       |
| Placeholder                   | String             | Place holder for input                                                                 |      yes       |
| setCountry	                  | (e:string) => void | a function that sets the selected country                                              |    mandatory   |

## More information

This library is built on top of the following open-source projects:

- react-native-Flags (https://github.com/frostney/react-native-flags)
