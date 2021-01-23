import React from "react";
import {View, Text} from "react-native";
import CDropdown, { ItemData } from "../../Components/CompDropdown/CDropdown";

export default function CLearningFunctionComponentsPage() {
  const itemsDatas: ItemData[] = [
    new ItemData(100, "100"), new ItemData(100, "200"), new ItemData(100, "300"),
    new ItemData(100, "400")
  ];

  return(
    <View style={{width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}>
      <CDropdown 
        mheading="Views" mitemsDatas={itemsDatas} 
        monChange={(value) => console.log(`CustomLog:value = ${value}`)}
        mstyle={{width: "100%"}}
      />
    </View>
  );
}