import React, {useState, Dispatch, SetStateAction, MutableRefObject, useRef, useEffect} from "react";
import {View, Text} from "react-native";
import { Button } from "react-native-paper";
import CStreamBuilder from "../../Components/CStreamBuilder/CStreamBuilder";
import FibAuthMgr from "../../Firebase/FibAuthMgr";
import UsersDatasMgr from "../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";
import UserData from "../../Models/UserData";
import WriteableStream from "../../Stream/Stream";

export default function CLearningFunctionComponentsPage(): React.ReactElement {
  return(
    <View style={{width: "100%", height: "100%", justifyContent:"center", alignItems: "center"}}>
      <CStreamBuilder<UserData | undefined>
        mstreamCreator={() => UsersDatasMgr.sfgetUserDataStream(FibAuthMgr.sfgetCurUser()?.fgetUId() as string)}
        minitialValue={undefined}
        mbuilder={(value) => {
          const text: string = (value != undefined) ? `Coins = ${value.mcoins}` : "Undefined";
          
          return(<Text style={{fontSize: 20, fontWeight: "bold"}}>{text}</Text>);
        }}
      />
    </View>
  );
}