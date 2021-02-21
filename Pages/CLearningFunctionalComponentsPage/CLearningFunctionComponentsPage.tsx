import React, {useState, Dispatch, SetStateAction, MutableRefObject, useRef, useEffect} from "react";
import {View, Text, ActivityIndicator} from "react-native";
import { Button } from "react-native-paper";
import CObservableBuilder from "../../Components/CObservableBuilder/CObservableBuilder";
import CStreamBuilder from "../../Components/CStreamBuilder/CStreamBuilder";
import FibAuthMgr from "../../Firebase/FibAuthMgr";
import UsersDatasMgr from "../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";
import UserData from "../../Models/UserData";
import WriteableStream from "../../Stream/Stream";

export default function CLearningFunctionComponentsPage(): React.ReactElement {
  return(
    <View style={{width: "100%", height: "100%", justifyContent:"center", alignItems: "center"}}>
      <CObservableBuilder<UserData | undefined>
        minitialValue={undefined}
        mobservable={UsersDatasMgr.sfgetUserDataObservable(FibAuthMgr.sfgetCurUser()?.fgetUId() as string)}
        mbuilder={(userData) => {
          if(userData == undefined)
            return(<ActivityIndicator color="blue" />);

          return(<Text style={{fontSize: 20, fontWeight: "bold"}}>{`Coins = ${userData?.mcoins}`}</Text>);
        }}
      />
    </View>
  );
}