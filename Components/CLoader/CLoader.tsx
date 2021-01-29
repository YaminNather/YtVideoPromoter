import React, {Dispatch, SetStateAction, useEffect} from "react";
import {View, Text} from "react-native";

interface Props<T> {
  mpromise: Promise<T>;
  mcLoading: React.ReactElement;
  mbuildComponent: (val: T)=>React.ReactElement;
}

export default function CLoader<T>(props: Props<T>): React.ReactElement {
  const componentMounted: React.MutableRefObject<boolean> = React.useRef<boolean>(false);
  const val: [T | undefined, Dispatch<SetStateAction<T | undefined>>] = React.useState<T | undefined>(undefined);
    
  useEffect(
    () => {
      props.mpromise.then(
        (value) => {
          val[1](value);          
        }        
      );      
    }, 
    [componentMounted]
  );

  const faddAnotherThen: ()=>Promise<void> = async () => {
    await sleep(2000);
    props.mpromise.then((value) => console.log("CustomLog:Second then called"));
  };
    
  const frender: ()=>React.ReactElement = () => {
    if(val[0] == undefined)
      return(<>{props.mcLoading}</>);    

    return(<>{props.mbuildComponent(val[0])}</>);
  }

  return frender();
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}