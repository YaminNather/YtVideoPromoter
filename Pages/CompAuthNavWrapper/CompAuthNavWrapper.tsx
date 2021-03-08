import {enableScreens} from "react-native-screens";
import React from "react";
import CompRegisterPage from "../SignIn And Register Page/CompRegisterPage/CompRegisterPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CompSignInPage from "../SignIn And Register Page/CompSignInPage/CompSignInPage";


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