import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CHomePage from "./CHomePage/CHomePage";
import CGetReferralCodePage from "./CGetReferralCodePage/CGetReferralCodePage";

export default class CompLoggedIn extends React.Component {
  public render(): React.ReactNode {
    const drawerNavigator = createDrawerNavigator();
    
    return(
      <NavigationContainer>
        <drawerNavigator.Navigator>
          <drawerNavigator.Screen name="Home Page" component={CHomePage} />

          <drawerNavigator.Screen name="Refer to a friend" component={CGetReferralCodePage} />                    
        </drawerNavigator.Navigator>
      </NavigationContainer>
    );
  }
}