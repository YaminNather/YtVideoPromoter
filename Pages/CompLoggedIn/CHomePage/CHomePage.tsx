import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import {View, Text} from "react-native";
import {createStackNavigator, StackHeaderProps} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CMainPage } from "./CMainPage/CMainPage";
import CAddVideoPage from "./CAddVideoPage/CAddVideoPage";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import FibAuthMgr from "../../../Firebase/FibAuthMgr";
import {FontAwesome5} from "@expo/vector-icons";
import UsersDatasMgr from "../../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";
import CLearningFunctionComponentsPage from "../../CLearningFunctionalComponentsPage/CLearningFunctionComponentsPage";
import CStreamBuilder from "../../../Components/CStreamBuilder/CStreamBuilder";
import UserData from "../../../Models/UserData";
import CObservableBuilder from "../../../Components/CObservableBuilder/CObservableBuilder";
import { observable } from "rxjs";

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
        
        <stackNavigator.Screen name="Add Video Page" 
          component={CAddVideoPage} 
          options={{
            headerRight: () => (
              <View style={{padding: 10}}>
                <CCoinsDisplay />
              </View>
            )
          }}
        />
      </stackNavigator.Navigator>
    );
  };

  return frender();
};

const CCoinsDisplay: React.FC = () => {
  return(
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <FontAwesome5 name="coins" size={30} />

      <View style={{width: 5}} />

      <CObservableBuilder<UserData | undefined>
        minitialValue={undefined}        
        mobservable={UsersDatasMgr.sfgetUserDataObservable(FibAuthMgr.sfgetCurUser()?.fgetUId() as string)}
        mbuilder={(value) => {
          if(value == undefined)
            return(<ActivityIndicator color="blue" />);

          return(<Text style={{fontSize: 20}}>{`${value.mcoins}`}</Text>);
        }}
      />
    </View>        
  );
}

export default CHomePage;