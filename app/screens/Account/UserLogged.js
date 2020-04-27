import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLoged() {
  const [userInfo, setUserInfo] = useState({}); //create a new state constant
  const [reloadData, setReloadData] = useState(false);
  //we create a state variable called "reloadData" to allow update the profile picture
  const [textLoading, setTextLoading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  //we'll use the "useEffect" to obtain the info of the current user and update this info along as refresh them
  //"useEffect" will be executed when refreshing the UserLogged screen
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser; //create a const that obtain the current user
      setUserInfo(user.providerData[0]); //updates the state of user give it the info of the user
    })();
    setReloadData(false);
  }, [reloadData]); //useEffect wait to update "reloadData"
  return (
    <View style={styles.viewUserInfo}>
      {/* call the "InfoUser" component and send "userInfo" properties */}
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <AccountOptions />
      <Button
        title="Log out"
        buttonStyle={styles.btnClosedSession}
        titleStyle={styles.btnClosedSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      {/*a function that logs out a user */}

      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnClosedSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnClosedSessionText: {
    color: "#00a680",
  },
});
