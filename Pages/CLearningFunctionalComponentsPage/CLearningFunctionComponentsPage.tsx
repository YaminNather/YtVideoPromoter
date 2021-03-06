import React, {useState, Dispatch, SetStateAction, MutableRefObject, useRef, useEffect} from "react";
import { View, Modal } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import COverlayLoader from "../../Components/COverlayLoader/COverlayLoader";

export default function CLearningFunctionComponentsPage(): React.ReactElement {
  const fbuildLoaderComponent: ()=>React.ReactElement = () => (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
        <View style={{width: 300, height: 100, backgroundColor: "white", justifyContent: "center", alignItems: "center"}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontSize: 20}}>Adding Coins</Text>

            <View style={{width: 20}}/> 

            <ActivityIndicator size="small" />
          </View>
        </View>
      </View>
    </Modal>
  );

  return(
    <COverlayLoader 
      style={{width: "100%", height: "100%"}} misLoading={true}
      mloaderComponent={fbuildLoaderComponent}
      mbuildComponent={() => (
        <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <Text>I am a Pussy Cat.</Text>
        </View>
      )}
    />
  );
}