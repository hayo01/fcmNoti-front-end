import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";

export const renderOrderBook = props => {
  const { item, index } = props;
  return (
    <View style={styles.rows}>
      {true && (
        <>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <Text>{item.price}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{item.amount}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rows: {
    flexDirection: "row",
    // justifyContent: "space-around",
  },
});
