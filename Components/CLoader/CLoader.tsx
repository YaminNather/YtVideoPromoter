import React, {Dispatch, SetStateAction, useEffect} from "react";
import {View, Text} from "react-native";

interface Props<T> {
  misLoading: boolean;
  mloadingComponent: ()=>React.ReactElement;
  mbuildComponent: ()=>React.ReactElement;
}

export default function CLoader<T>(props: Props<T>): React.ReactElement {
  if(props.misLoading == true)
    return props.mloadingComponent();  

  return props.mbuildComponent();
}