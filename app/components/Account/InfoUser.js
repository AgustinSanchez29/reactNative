//In this module/component we show the user info that's logged.... change the profile photo

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions"; //for phone permissions
import * as ImagePicker from "expo-image-picker"; //for open the photo gallery
import Loading from "../Loading";

export default function InfoUser(props) {
  const {
    //you can use "userInfo" variable if you need it
    //destructure the props to obtain the user info, we use double destructuring
    userInfo: { uid, displayName, email, photoURL },
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading,
  } = props;

  /* FUNCTION TO CHANGE YOUR AVATAR */
  const changeAvatar = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    ); //we need give permissions of camera roll in "app.json"
    const resultPermissionsCamera =
      resultPermissions.permissions.cameraRoll.status;
    //WHIT THIS WE GIVE A STATUS OF PERMISSION

    if (resultPermissionsCamera === "denied") {
      toastRef.current.show("You need to accept camera permissions");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        //open the photo gallery
        allowsEditing: true, //allows edit your image before pick it
        aspect: [4, 3], //size range of image
      }); /* with this function, we will open the photo gallery */
      if (result.cancelled) {
        toastRef.current.show("the gallery has been closed");
      } else {
        uploadImage(result.uri, uid).then(() => {
          //we call the function that upload the image to firebase
          toastRef.current.show("Imagen subida correctamente");

          updatePhotoUrl(uid);
        });
      }
    }
  };

  /* FUNCTION TO UPLOAD A IMAGE */
  const uploadImage = async (uri, nameImage) => {
    setTextLoading("avatar is updating");
    setIsLoading(true);
    const response = await fetch(uri); //return a long object
    const blob = await response.blob(); //return a blob object
    const ref = firebase.storage().ref().child(`avatar/${nameImage}`); //we take the route where we will save the photos
    return ref.put(blob); //upload de image
  };

  //function to update the profile photo and change in the aplication
  //pending to understand**********
  const updatePhotoUrl = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      /*       whit this method we download the image that we saved to the server, it get a url in an variable 
        called in this case "url"
 */ .then(
        async (url) => {
          const update = {
            /* info of user*/
            photoURL: url,
            /*will update profile picture */
          };
          await firebase.auth().currentUser.updateProfile(update); //upload changes
          setReloadData(true); //in this moment "useEffect" reloads and update the user info
          setIsLoading(false); //when changing your profile picture the loading screen will be disabled
        }
      )
      .catch(() => {
        toastRef.current.show("Error to obtain the image of the server");
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          //this is conditional if photoURL doesn't exist it shows an avatar image
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/285/abott@adorable.pngCopy to Clipboard",
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {/* this is conditional if "displayName" don't have value will set "Anonim" to default*/}
          {displayName ? displayName : "Anonim"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: { marginRight: 20 },
  displayName: {
    fontWeight: "bold",
  },
});
