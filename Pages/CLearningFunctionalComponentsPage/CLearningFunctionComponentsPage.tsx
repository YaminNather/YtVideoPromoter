import React from "react";
import {View, Text} from "react-native";
import { Button, Menu } from "react-native-paper";
import CDropdown, { ItemData } from "../../Components/CompDropdown/CDropdown";

type DispatchSetStateAction<DispatchType> = React.Dispatch<React.SetStateAction<DispatchType>>;

export default function CLearningFunctionComponentsPage() {
  const [isMenuOpen, toggleMenuOpen]: [boolean, DispatchSetStateAction<boolean>] = React.useState<boolean>(false);
  return(
    <View style={{width: "100%", flex: 1, justifyContent: "flex-end"}}>
      <Menu
        style={{width: "95%"}}
        // contentStyle={{width: "100%"}}
        visible={isMenuOpen}
        onDismiss={()=> toggleMenuOpen(false)}
        anchor={<Button onPress={() => toggleMenuOpen(true)}>Menu</Button>}
      >       
        <Text style={{backgroundColor: "red"}}>Yamin</Text>
      </Menu>
    </View>
  );
}