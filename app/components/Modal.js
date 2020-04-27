import React, { Children } from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
  const { isVisible, setIsVisible, children } = props; //we receive the the state variables that were sent from
  //"AccountOptions" file
  const closeModal = () => setIsVisible(false);
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal} //it disables the overlay screen
    >
      {children}
      {/* got all components that are inside of the "Modal" component called in "AccountOptions" file */}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
  },
});
