import React from "react";
import {View, Text} from "react-native";
import CDropdown, { ItemData } from "../../Components/CompDropdown/CDropdown";

export default function CLearningFunctionComponentsPage() {
  const itemsDatas: ItemData[] = [
    new ItemData(100, "100"), new ItemData(200, "200"), new ItemData(300, "300"),
    new ItemData(400, "400")
  ];

  return(
    <View style={{width: "100%", flex: 1, alignItems: "center"}}>
      <CDropdown 
        mheading="Views" mitemsDatas={itemsDatas} 
        monChange={(value) => console.log(`CustomLog:value = ${value}`)}
        mboxStyle={{width: "100%"}}
      />
      
      <CDropdown 
        mheading="Duration" mitemsDatas={itemsDatas} 
        monChange={(value) => console.log(`CustomLog:value = ${value}`)}
        mboxStyle={{width: "100%"}}
      />
    </View>
  );
}