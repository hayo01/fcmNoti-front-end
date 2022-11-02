import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const RenderMarket = ({ item }) => {
  let price = Number(item.price).toFixed(2);
  let change = Number(item.change).toFixed(2);
  let volume = Number(item.volume).toFixed(2);

  return (
    <View style={styles.rows}>
      <View style={styles.coinName}>
        <Text>{item.coinName}</Text>
      </View>
      <View style={styles.rightTd}>
        <Text>{price}</Text>
      </View>
      <View style={styles.rightTd}>
        {change > 0 ? (
          <Text style={styles.blue}>+{change}%</Text>
        ) : (
          <Text style={styles.red}>{change}%</Text>
        )}
      </View>
      <View style={styles.rightTd}>
        <Text>{volume}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rows: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  coinName: {
    flex: 0.6,
    fontWeight: "bold",
  },
  rightTd: {
    flex: 1.4,
    alignItems: "flex-end",
  },
  blue: {
    color: "#000FFF",
  },
  red: {
    color: "#FF0000",
  },
});
