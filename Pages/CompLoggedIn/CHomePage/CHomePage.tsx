import React from "react";
import {createStackNavigator, StackHeaderProps} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CMainPage } from "./CMainPage/CMainPage";
import CAddVideoPage from "./CAddVideoPage/CAddVideoPage";

const CHomePage: React.FC = () => {
  const frender: ()=>React.ReactElement = () => {
    const stackNavigator = createStackNavigator();
    return(
      <stackNavigator.Navigator>
        <stackNavigator.Screen name="Main Page" component={CMainPage} />
        
        <stackNavigator.Screen name="Add Video Page" component={CAddVideoPage} />
      </stackNavigator.Navigator>
    );
  };

  return(frender());
};

export default CHomePage;