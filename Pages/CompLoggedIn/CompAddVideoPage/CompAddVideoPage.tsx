import React, { ComponentProps } from "react";
import {View} from "react-native";
import {Menu, Button} from "react-native-paper";
import CompDropdown from "../../../Components/CompDropdown/CompDropdown";
import CompDropdownItem from "../../../Components/CompDropdown/CompDropdownItem";
// import {Picker} from "@react-native-picker/picker";

class State {

}

export default class CompAddVideoPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = new State();
  }

  public render(): React.ReactNode {
    return(
      <View 
        style={{width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}
      >
        <CompDropdown mlabel="Views">
          <CompDropdownItem mtitle="Item 0" monPress={() => {}} />
          <CompDropdownItem mtitle="Item 1" />
        </CompDropdown>
      </View>     
    );
  }
}