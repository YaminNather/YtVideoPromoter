import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import {View, Text} from "react-native";
import {createStackNavigator, StackHeaderProps} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CMainPage } from "./CMainPage/CMainPage";
import CAddVideoPage from "./CAddVideoPage/CAddVideoPage";
import { Button, IconButton } from "react-native-paper";
import FibAuthMgr from "../../../Firebase/FibAuthMgr";
import {MaterialIcons} from "@expo/vector-icons";
import UsersDatasMgr from "../../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";

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
        
        <stackNavigator.Screen name="Add Video Page" component={CAddVideoPage} />
      </stackNavigator.Navigator>
    );
  };

  return(frender());
};

const CCoinsDisplay: React.FC = () => {
  //#region Hooks
  const reactFunctionsRef: React.RefObject<number> = useRef<number>(0);
  const userDataUnsubscriber: React.MutableRefObject<(()=>void) | undefined> = useRef<()=>void>();
  const coins: [number, Dispatch<SetStateAction<number>>] = useState<number>(999);

  useEffect(
    () => {
      userDataUnsubscriber.current = UsersDatasMgr.sflistenToUserData(
        FibAuthMgr.sfgetCurUser()?.fgetUId() as string, 
        (userData) => {
          console.log(`CustomLog:Current Coins = ${userData.mcoins}`);
          coins[1](userData.mcoins);
        }
      );

      return( 
        () => {
          if(userDataUnsubscriber.current != undefined) {
            userDataUnsubscriber.current();
            userDataUnsubscriber.current = undefined;
          }
        }  
      );
    }, 
    [reactFunctionsRef]
  );
  //#endregion

  return(
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <MaterialIcons name="attach-money" size={30} />

      <Text style={{fontSize: 25}}>{`${coins[0]}`}</Text>
    </View>        
  );
}

export default CHomePage;