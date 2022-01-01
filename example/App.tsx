import React from 'react';
import {View, Text} from 'react-native';
import CountryPicker from 'rn-country-dropdown-picker';

interface ItemProps {
  country: string;
  code: string;
}

export default function App() {
  function item(e: ItemProps) {
    console.log(e);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CountryPicker selectedItem={item} />
    </View>
  );
}
