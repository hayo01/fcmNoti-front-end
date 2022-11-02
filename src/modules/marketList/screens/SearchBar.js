import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

export default function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        mode="outlined"
        placeholder="Search cryptocurrencies"
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
