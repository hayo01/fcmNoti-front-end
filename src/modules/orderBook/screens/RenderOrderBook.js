import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";

export const RenderOrderBook = ({ item }) => {
  let price = Number(item.price).toFixed(2);
  let amount = Number(item.amount).toFixed(3);

  return (
    <View style={styles.rows}>
      {true && (
        <>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text>{price}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{amount}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rows: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0000000D",
    height: 23,
    marginVertical: 1,
  },
});
