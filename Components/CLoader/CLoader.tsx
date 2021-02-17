import React, {Dispatch, SetStateAction, useEffect} from "react";
import {View, Text} from "react-native";

interface Props<T> {
  mpromise: Promise<T>;
  mloadingComponent: () => React.ReactElement;
  mbuildComponent: (val: T)=>React.ReactElement;
}

export default function CLoader<T>(props: Props<T>): React.ReactElement {
  //#region Hooks  
  const componentMounted: React.MutableRefObject<boolean> = React.useRef<boolean>(false);
  const val: [T | undefined, Dispatch<SetStateAction<T | undefined>>] = React.useState<T | undefined>(undefined);

  useEffect(
    () => {
      props.mpromise.then((value) => val[1](value))
    },
    [componentMounted]
  );
  //#endregion

  if(val[0] == undefined)
    return (
      <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
        {props.mloadingComponent()}
      </View>
    );
  else
    return(props.mbuildComponent(val[0] as T));

}