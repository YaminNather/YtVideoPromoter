import React, { FC } from "react";
import {StyleSheet, View, StyleProp, ViewStyle, GestureResponderEvent} from "react-native";
import { Text, useTheme } from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import { Theme } from "react-native-paper/lib/typescript/types";

interface Props {
  mheading: string;
  mtitle: string;
  misOpen: boolean;
  mopen: (touchLoc: [number, number])=>void;
  mstyle?: StyleProp<ViewStyle>;
}

const CDropdownBox: FC<Props> = (props) => {
  //#region Hooks
  const theme: Theme = useTheme();
  //#endregion
  
  let touchLoc: [number, number] = [0, 0];

  const fonTouchStart: (e: GestureResponderEvent)=>void = (e) => {
    touchLoc = [e.nativeEvent.locationX, e.nativeEvent.locationY];
    props.mopen(touchLoc);
  };

  const frender: ()=>React.ReactElement = () => {    
    const defStyle: StyleProp<ViewStyle> = {
      backgroundColor: theme.colors.background, borderBottomWidth: (props.misOpen) ? 2 : 1, 
      borderColor: "black", paddingHorizontal: 10, paddingVertical: 5
    };

    const labelAndIconColor: string = (props.misOpen) ? theme.colors.primary : "#6E6E6E";

    return(
      <View style={[defStyle, props.mstyle]} onTouchStart={fonTouchStart}>
        <Text style={{color: labelAndIconColor}}>{props.mheading}</Text>
        
        <View style={{flexDirection: "row", alignItems: "center"}}> 
          <Text style={{fontSize: 15, color: labelAndIconColor}}>{props.mtitle}</Text>
          
          <View style={{flex: 1}} />
          
          {/* <IconButton 
            icon={(!props.misOpen) ? "arrow-down-drop-circle-outline" : "arrow-up-drop-circle-outline"} 
            style={{padding: 0}}
          />                 */}
          <MaterialIcons name="arrow-drop-down" size={30} color={labelAndIconColor} />
        </View>
      </View>      
    );
  };

  return frender();
};

export default CDropdownBox;