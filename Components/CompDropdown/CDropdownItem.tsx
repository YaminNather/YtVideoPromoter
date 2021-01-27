import React, { FC } from 'react';
import {Button} from "react-native";
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import {Divider, Menu, Text } from 'react-native-paper';
import CDropdown from './CDropdown';

interface Props {
  mindex: number;
  mtitle: string;
  monPress?: ()=>void;
}

const CDropdownItem : FC<Props> = (props) => {
  const render: ()=>React.ReactElement = () => {
    return(              
      <TouchableNativeFeedback 
        onPress={(e) => {
          if(props.monPress)
            props.monPress();
        }}
        style={{
          height: 40, justifyContent: "center",
          paddingHorizontal: 20
        }}
      >
        <Text style={{fontSize: 15}}>{props.mtitle}</Text>
      </TouchableNativeFeedback>      
    );
  }

  return render();
}

export default CDropdownItem;