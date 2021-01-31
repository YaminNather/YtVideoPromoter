import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native-paper";
import FibAuthMgr from "../../Firebase/FibAuthMgr";
import CAddVideoPage from "./CHomePage/CAddVideoPage/CAddVideoPage";
import { CMainPage } from "./CHomePage/CMainPage/CMainPage";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CHomePage from "./CHomePage/CHomePage";

export default class CompLoggedIn extends React.Component {
  public render(): React.ReactNode {
    const drawer = createDrawerNavigator();
    
    return(
      <NavigationContainer>
        <drawer.Navigator>
          <drawer.Screen 
            name="Home Page" component={CHomePage} 
            options={{
              headerRight: () => (
                <Button onPress={async () => await FibAuthMgr.sfsignOut()}>
                  Signout
                </Button>                
              )
            }}
          />          
        </drawer.Navigator>
      </NavigationContainer>
    );
  }
}