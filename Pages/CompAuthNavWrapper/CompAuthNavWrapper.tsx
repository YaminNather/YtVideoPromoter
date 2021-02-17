import {enableScreens} from "react-native-screens";
import React from "react";
import CompSignInPage from "../CompSignInPage/CompSignInPage";
import CompRegisterPage from "../CompRegisterPage/CompRegisterPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


export default class CompAuthNavWrapper extends React.Component {
  public render(): React.ReactNode {
    enableScreens();
    const stack = createStackNavigator();

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