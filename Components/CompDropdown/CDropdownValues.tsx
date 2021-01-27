import React, { FC, Ref, useEffect, useRef } from "react";
import {Animated, View, Modal, Platform, StyleProp, ViewStyle, LayoutChangeEvent} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ItemData } from "./CDropdown";
import CDropdownItem from "./CDropdownItem";

interface Props {
  mitemsDatas: ItemData[];
  mclose: ()=>void;
  msetCurIndex: (index: number)=>void;
  monChange?: (value: any)=>void;
  moffsetY: number;
}

const CDropdownValues: FC<Props> = (props) => {
  const componentRef: React.RefObject<View | undefined> = useRef<View>();
  const openAnimValue: Animated.Value = useRef(new Animated.Value(0)).current;
  
  useEffect(
    () => Animated.timing(openAnimValue, {toValue: 1, duration: 100, useNativeDriver: true}).start(),
    [openAnimValue]
  );

  const frender: ()=>React.ReactElement = () => {
    const defStyle: StyleProp<Animated.WithAnimatedObject<ViewStyle>> = {
      width: "100%", zIndex: 20, backgroundColor: "#EEEEEE",
      position: "absolute", transform: [{scaleY: openAnimValue}, {translateY: props.moffsetY}],
      elevation: 5, borderColor: "#000000"
    };

    const lfbuildDropdownItems: ()=>React.ReactElement = () => {
      return(
        <>
          {props.mitemsDatas.map(
            (value, index, _) => {
              const lfonPress: ()=>void = () => {
                if(value.monPress != undefined) 
                  value.monPress();
                if(props.monChange != undefined)
                  props.monChange(value.mvalue);
                props.msetCurIndex(index);
                props.mclose();
              };
  
              return(
                <CDropdownItem key={index} mtitle={value.mtitle} mindex={index} monPress={lfonPress} />
              );
            }
          )}
        </>
      );
    };    

    return(
      <>
        <Animated.View ref={componentRef} style={defStyle}>
          {lfbuildDropdownItems()}
        </Animated.View>
        
        <View 
          onTouchStart={() => props.mclose()}
          style={{
            position: "absolute", width: 4000, height: 4000, zIndex: 19, backgroundColor: "transparent",
            transform: [{translateX: -2000}, {translateY: -2000}]
          }}
        />
      </>
    );
  };

  return frender();
};

export default CDropdownValues;