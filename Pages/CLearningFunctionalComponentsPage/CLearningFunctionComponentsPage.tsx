import React from "react";
import {View, Text} from "react-native";
import { Button, Menu } from "react-native-paper";
import CLoader from "../../Components/CLoader/CLoader";
import CDropdown, { ItemData } from "../../Components/CompDropdown/CDropdown";

type DispatchSetStateAction<DispatchType> = React.Dispatch<React.SetStateAction<DispatchType>>;

export default function CLearningFunctionComponentsPage(): React.ReactElement {  
  return (
    <View style={{width: "100%", height: "100%"}}>
      <CLoader<number>
        mpromise={fgetOne()} 
        mcLoading={<Text>Loading...</Text>} 
        mbuildComponent={(val) => {
          return(<Text>{`Loaded value = ${val}`}</Text>);
        }} 
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