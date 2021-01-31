import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import {DarkTheme, Provider as PaperProvider, Button} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { CMainPage } from "./Pages/CompLoggedIn/CHomePage/CMainPage/CMainPage";
import { gfinitFirebase, gfsignInAnon } from "./Firebase/FirebaseMgr";
import FibAuthMgr from "./Firebase/FibAuthMgr";
import { CompAuthWrapper } from "./Pages/CompAuthWrapper/CompAuthWrapper";

// export default function App() {
//   return (
//     <View style={styles.container}>      
//       <Button>Press Me</Button>
//       <Button icon="camera"
//         onPress={() => {
//           console.log("Yamin Nather");
//         }}
//       >
//         Im Gay
//       </Button>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


export default function App(): React.ReactNode {
  LogBox.ignoreLogs(['Setting a timer']);
  gfinitFirebase();
  
  return(
    <PaperProvider>
      <CompAuthWrapper />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
