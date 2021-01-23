import {enableScreens} from "react-native-screens";
import {createNativeStackNavigator} from "react-native-screens/native-stack";

import React from "react";
import CompSignInPage from "../CompSignInPage/CompSignInPage";
import CompRegisterPage from "../CompRegisterPage/CompRegisterPage";
import { NavigationContainer } from "@react-navigation/native";


export default class CompAuthNavWrapper extends React.Component {
  public render(): React.ReactNode {
    enableScreens();
    const stack = createNativeStackNavigator();

    return(     
      <NavigationContainer> 
        <stack.Navigator>
          <stack.Screen name="Signin Page" component={CompSignInPage} />                      
          
          <stack.Screen name="Register Page" component={CompRegisterPage} />
        </stack.Navigator>      
      </NavigationContainer>
    );
  }
}