import React from "react";
import {View, Text} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import CLoader from "../../Components/CLoader/CLoader";

export default function CLearningFunctionComponentsPage(): React.ReactElement {
  return (
    <View style={{width: "100%", height: "100%"}}>
      <CLoader<number>
        mpromise={fgetOne()}
        mloadingComponent={() => (<ActivityIndicator color="red" size="large" />)}
        mbuildComponent={(val) => (<Text>{`Loaded value = ${val}`}</Text>)} 
      />
    </View>
  );
}

async function fgetOne(): Promise<number> {
  await sleep(2000);
  return 1;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}