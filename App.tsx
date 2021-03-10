import "react-native-gesture-handler";
import React from 'react';
import { LogBox, StyleSheet} from 'react-native';
import { Colors, DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { gfinitFirebase } from "./Firebase/FirebaseMgr";
import { CompAuthWrapper } from "./Pages/CompAuthWrapper/CompAuthWrapper";
import { Theme } from "react-native-paper/lib/typescript/types";

export default function App(): React.ReactNode {
  LogBox.ignoreLogs(['Setting a timer']);
  gfinitFirebase();

  const theme: Theme = {...DarkTheme, colors: {...DarkTheme.colors}};
  
  return(
    <PaperProvider theme={theme}>
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
