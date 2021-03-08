import React, { FC } from "react";
import { StyleProp, TextStyle, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface CustomTextInputProps {
  mlabel: string;
  mtextContentType?: "password";
  mvalue?: string;
  monChangeText?: ((text: string) => void) & Function;
  mstyle?: StyleProp<TextStyle>;
}

const CCustomTextInput: FC<CustomTextInputProps> = (props) => {
  const styleSheet = StyleSheet.create(
    { 
      textInput: { width: "100%", backgroundColor: "transparent" } 
    }
  ); 

  const frender: ()=>React.ReactElement = () => {
    const finalStyle = Object.assign({}, styleSheet.textInput, props.mstyle);

    return(
      <TextInput
        mode="flat" label={props.mlabel} textContentType={props.mtextContentType} value={props.mvalue} 
        style={finalStyle} onChangeText={props.monChangeText} 
      />
    );
  };

  return frender();
}

export default CCustomTextInput;