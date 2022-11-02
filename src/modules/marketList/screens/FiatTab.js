import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

export default function FiatTab(props) {
  const fiatlist = ["ZAR", "USDT", "BTC"];

  return (
    <View style={styles.fiats}>
      {fiatlist.map(fiat => {
        return (
          <TouchableOpacity
            key={fiat}
            style={props.nowFiat === fiat ? styles.nowFiat : styles.button}
            onPress={() => props.setFiat(fiat)}
          >
            <Text>{fiat}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  fiats: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginTop: 8,
  },
  nowFiat: {
    backgroundColor: "#63AADE",
    borderColor: "#63AADE",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    marginRight: 5,
    alignItems: "center",
  },
  button: {
    borderColor: "#63AADE",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    marginRight: 5,
    alignItems: "center",
  },
});
