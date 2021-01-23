import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native-paper";
import FibAuthMgr from "../../Firebase/FibAuthMgr";
import CompAddVideoPage from "./CompAddVideoPage/CompAddVideoPage";
import { CompBottomNavigation } from "./CompBottomNavigation";
import CLearningFunctionComponentsPage from "../CLearningFunctionalComponentsPage/CLearningFunctionComponentsPage";

export default class CompLoggedIn extends React.Component {
  public render(): React.ReactNode {
    const stack = createStackNavigator();
    
    return(
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen 
            name="Home Page" component={CompBottomNavigation} 
            options={{
              headerRight: () => (
                <Button onPress={async () => await FibAuthMgr.sfsignOut()}>
                  Signout
                </Button>                
              )
            }}
          />
          
          <stack.Screen 
            name="Add Video Page" component={CLearningFunctionComponentsPage}
          />
        </stack.Navigator>
      </NavigationContainer>
    );
  }
}