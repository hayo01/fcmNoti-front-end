import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const renderOrderBook = ({ item }) => {
  return (
    <View style={styles.rows}>
      <View>
        <Text>Price : {item.price}</Text>
      </View>
      <View>
        <Text>Amount : {item.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rows: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
