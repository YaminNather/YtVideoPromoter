import React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {createStackNavigator, StackHeaderProps, StackNavigationOptions} from "@react-navigation/stack";
import { CMainPage } from "./CMainPage/CMainPage";
import CAddVideoPage from "./CAddVideoPage/CAddVideoPage";
import { ActivityIndicator, IconButton, useTheme, Text } from "react-native-paper";
import FibAuthMgr from "../../../Firebase/FibAuthMgr";
import {FontAwesome5} from "@expo/vector-icons";
import UsersDatasMgr from "../../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";
import UserData from "../../../Models/UserData";
import CObservableBuilder from "../../../Components/CObservableBuilder/CObservableBuilder";
import { Theme } from "react-native-paper/lib/typescript/types";

const CHomePage: React.FC = () => {
  const frender: ()=>React.ReactElement = () => {
    const stackNavigator = createStackNavigator();

    const fbuildHeaderBackground: (props: {style: StyleProp<ViewStyle>})=>React.ReactElement = (_) => {
      const color: string = useTheme().colors.backdrop;
      return <View style={{width: "100%", height: "100%", backgroundColor: color}} />;
    };

    return(      
      <stackNavigator.Navigator>
        <stackNavigator.Screen 
          name="Main Page" component={CMainPage}
          options={{
            headerBackground: fbuildHeaderBackground,
            headerRight: () => (
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <CCoinsDisplay />

                <View style={{width: 10}}/>
              
                <IconButton
                  icon="exit-to-app" size={30} color={useTheme().colors.primary}
                  onPress={() => FibAuthMgr.sfsignOut()}
                />

              </View>
            )
          }}
        />
        
        <stackNavigator.Screen name="Add Video Page" 
          component={CAddVideoPage} 
          options={{
            headerBackground: fbuildHeaderBackground,
            headerRight: () => (
              <View style={{padding: 10}}>
                <CCoinsDisplay />
              </View>
            )
          }}
        />
      </stackNavigator.Navigator>
    );
  };

  return frender();
};

const CCoinsDisplay: React.FC = () => {
  const theme: ReactNativePaper.Theme = useTheme();

  return(      
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <FontAwesome5 name="coins" size={30} color={theme.colors.primary} />

      <View style={{width: 5}} />

      <CObservableBuilder<UserData | undefined>
        minitialValue={undefined} 
        mobservable={UsersDatasMgr.sfgetUserDataObservable(FibAuthMgr.sfgetCurUser()?.fgetUId() as string)}
        mbuilder={(value) => {
          if(value == undefined)
            return(<ActivityIndicator color="blue" />);

          return(<Text style={{fontSize: 20}}>{`${value.mcoins}`}</Text>);
        }}
      />
    </View>        
  );
}

export default CHomePage;