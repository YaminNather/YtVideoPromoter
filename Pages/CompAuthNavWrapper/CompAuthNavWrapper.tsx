import {enableScreens} from "react-native-screens";
import React from "react";
import CompRegisterPage from "../SignIn And Register Page/CompRegisterPage/CompRegisterPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CompSignInPage from "../SignIn And Register Page/CompSignInPage/CompSignInPage";
import { StyleProp, ViewStyle, View } from "react-native";
import { Theme } from "react-native-paper/lib/typescript/types";
import { withTheme } from "react-native-paper";


export class CompAuthNavWrapper extends React.Component<{theme: Theme}> {
  public render(): React.ReactNode {
    enableScreens();
    const stack = createStackNavigator();

    const lfbuildHeaderBackground: (props: {style: StyleProp<ViewStyle>})=>React.ReactElement = (_) => {
      const color: string = this.props.theme.colors.backdrop;
      return <View style={{width: "100%", height: "100%", backgroundColor: color}} />;
    };

    return(     
      <NavigationContainer> 
        <stack.Navigator>
          <stack.Screen name="Signin Page" component={CompSignInPage} options={{headerBackground: lfbuildHeaderBackground}} />
          
          <stack.Screen name="Register Page" component={CompRegisterPage} options={{headerBackground: lfbuildHeaderBackground}} />
        </stack.Navigator>      
      </NavigationContainer>
    );
  }
}

export default withTheme(CompAuthNavWrapper);