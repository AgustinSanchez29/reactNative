import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";

export default function UserLoged() {
  return (
    <View>
      <Text>UserLoged</Text>
      <Button title="Log out" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
