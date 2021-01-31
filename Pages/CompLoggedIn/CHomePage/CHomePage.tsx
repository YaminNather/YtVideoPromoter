import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
import FibAuthMgr from "../../../Firebase/FibAuthMgr";
import CAddVideoPage from "./CAddVideoPage/CAddVideoPage";
import { CMainPage } from "./CMainPage/CMainPage";

const CHomePage: React.FC = () => {
  const frender: ()=>React.ReactElement = () => {
    const stack = createStackNavigator();
    
    return(
      <stack.Navigator>
        <stack.Screen
          name="Home Page" component={CMainPage}
          options={{
            headerRight: () => (
              <Button onPress={async () => await FibAuthMgr.sfsignOut()}>
                Signout
              </Button>                
            )
          }}
        />
        
        <stack.Screen 
          name="Add Video Page" component={CAddVideoPage}
        />
      </stack.Navigator>
    )
  };

  return (frender());
};

export default CHomePage;