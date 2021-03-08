import React, { FC } from "react";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";
import { color } from "react-native-reanimated";

interface Styles {
  height?: number;
  width?: string | number;
  color?: ColorValue;
  flex?: number;
};

interface Props {
  style?: Styles;
};

const CHR: FC<Props> = (props) => {
  const defStyle: StyleProp<ViewStyle> = {width: "auto", flex: undefined, height: 2, backgroundColor: "black"};
  let finalStyle: StyleProp<ViewStyle>;
  
  if(props.style == undefined) {
    finalStyle = defStyle;
  }  
  else {
    finalStyle = {
      width: props.style.width ?? defStyle.width, height: props.style.height ?? defStyle.height,
      backgroundColor: props.style.color ?? defStyle.backgroundColor, flex: props.style.flex ?? defStyle.flex
    };
  }

  const frender: ()=>React.ReactElement = () => {
    return <View style={finalStyle} />;
  };

  return frender();
};

export default CHR;