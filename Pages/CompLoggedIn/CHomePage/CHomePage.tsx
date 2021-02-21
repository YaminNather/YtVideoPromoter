import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import {View, Text} from "react-native";
import {createStackNavigator, StackHeaderProps} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CMainPage } from "./CMainPage/CMainPage";
import CAddVideoPage from "./CAddVideoPage/CAddVideoPage";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import FibAuthMgr from "../../../Firebase/FibAuthMgr";
import {MaterialIcons} from "@expo/vector-icons";
import UsersDatasMgr from "../../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";
import CLearningFunctionComponentsPage from "../../CLearningFunctionalComponentsPage/CLearningFunctionComponentsPage";
import CStreamBuilder from "../../../Components/CStreamBuilder/CStreamBuilder";
import UserData from "../../../Models/UserData";

const CHomePage: React.FC = () => {
  const frender: ()=>React.ReactElement = () => {
    const stackNavigator = createStackNavigator();
    return(
      <stackNavigator.Navigator>
        <stackNavigator.Screen 
          name="Main Page"
          component={CMainPage}
          options={{
            headerRight: () => (
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <CCoinsDisplay />

                <View style={{width: 10}}/>
              
                <IconButton
                  icon="exit-to-app" size={30}
                  onPress={() => FibAuthMgr.sfsignOut()}
                />

              </View>
            )
          }}
        />
        
        <stackNavigator.Screen name="Add Video Page" component={CLearningFunctionComponentsPage} />
      </stackNavigator.Navigator>
    );
  };

  return(frender());
};

const CCoinsDisplay: React.FC = () => {
  return(
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <MaterialIcons name="attach-money" size={30} />

      <CStreamBuilder<UserData | undefined>
        mstreamCreator={() => {
          return(UsersDatasMgr.sfgetUserDataStream(FibAuthMgr.sfgetCurUser()?.fgetUId() as string));
        }}
        mbuilder={(value) => { 
          if(value == undefined)
            return(<ActivityIndicator color="blue"></ActivityIndicator>);

          return(<Text style={{fontSize: 20}}>{value.mcoins}</Text>);
        }}
        minitialValue={undefined}
      />
    </View>        
  );
}

export default CHomePage;