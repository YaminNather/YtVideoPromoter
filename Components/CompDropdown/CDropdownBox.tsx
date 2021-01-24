import React, { FC } from "react";
import {StyleSheet, View, Text} from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
  mtitle: string;
  misOpen: boolean;
  mtoggleOpen: (value: boolean)=>void;
}

const CDropdownBox: FC<Props> = (props) => {
  const styleSheet = StyleSheet.create(
    {
      box: {               
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "grey",
        paddingHorizontal: 10,
        flexDirection: "row",          
        // justifyContent: "center",
        alignItems: "center"
      }
    }
  );

  return(
    <View style={styleSheet.box} onTouchStart={() => props.mtoggleOpen(true)}>
      <Text>{props.mtitle}</Text>
      
      <View style={{flex: 1}} />
      
      <IconButton icon={(!props.misOpen) ? "arrow-down-drop-circle-outline" : "arrow-up-drop-circle-outline"} />                
    </View>      
  );
};

export default CDropdownBox;