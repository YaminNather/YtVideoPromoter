import React, { FC, Ref, useEffect, useRef } from "react";
import {Animated, View, Modal} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ItemData } from "./CDropdown";
import CDropdownItem from "./CDropdownItem";

interface Props {
  mitemsDatas: ItemData[];
  mtoggleIsOpen: (value: boolean)=>void;
  msetCurIndex: (index: number)=>void;
  monChange?: (value: any)=>void;
}

const CDropdownValues: FC<Props> = (props) => {
  const componentRef: React.RefObject<View | undefined> = useRef<View>();
  const openAnimValue: Animated.Value = useRef(new Animated.Value(0)).current;
  
  useEffect(
    () => Animated.timing(openAnimValue, {toValue: 1, duration: 100, useNativeDriver: true}).start(),
    [openAnimValue]
  );

  const fbuildDropdownItems: ()=>React.ReactNode = () => {
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
              props.mtoggleIsOpen(false);
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
      <Animated.View
        ref={componentRef}
        style={{
          width: "100%", zIndex: 10, borderWidth: 1, borderColor: "grey", 
          position: "absolute", transform: [{scaleY: openAnimValue}]
        }}
      >
        {fbuildDropdownItems()}
      </Animated.View>
      
      <View 
        onTouchStart={() => props.mtoggleIsOpen(false)}
        style={{
          position: "absolute", width: 4000, height: 4000, backgroundColor: "transparent",
          transform: [{translateX: -2000}, {translateY: -2000}]
        }}
      />
    </>
  );
};

export default CDropdownValues;