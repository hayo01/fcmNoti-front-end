import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

export default function SearchBar(props) {
  let { markets, setSearchList } = props;

  const searchMarket = text => {
    let searchedList = markets.filter(element =>
      element.coinName.includes(text.toUpperCase())
    );
    setSearchList(searchedList);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        mode="outlined"
        placeholder="Search cryptocurrencies"
        onChange={e => {
          searchMarket(e.nativeEvent.text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 8,
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    height: 40,
  },
});
