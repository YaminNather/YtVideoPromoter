import React from 'react';
import {Button} from "react-native";
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import {Divider, Menu, Text } from 'react-native-paper';
import CDropdown from './CDropdown';

interface Props {
  mindex: number;
  mtitle: string;
  monPress?: ()=>void;
}

export default class CDropdownItem extends React.Component<Props> {
  public render(): React.ReactNode {
    return(
      <>
        {/* <Button 
          onPress={(e) => {
            if(this.props.monPress)
              this.props.monPress();
          }} 
          color="#DDDDDD"          
          title={this.props.mtitle}          
        /> */}
        <TouchableNativeFeedback 
          onPress={(e) => {
            if(this.props.monPress)
              this.props.monPress();
          }}
          style={{
            height: 50, justifyContent: "center",
            paddingHorizontal: 20
          }}
        >
          <Text>{this.props.mtitle}</Text>
        </TouchableNativeFeedback>
      </>
    );
  }
}