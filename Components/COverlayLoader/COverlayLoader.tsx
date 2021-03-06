import React, { FC } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface Props {
  misLoading: boolean;
  mloaderComponent?: ()=>React.ReactElement;
  mbuildComponent: ()=>React.ReactElement;
  style?: StyleProp<ViewStyle>;  
}

const COverlayLoader: FC<Props> = (props) => {  
  const fbuildLoader: ()=>React.ReactElement = () => {
    if(!props.misLoading)
      return(<></>);
    
    let floaderComponent: ()=> React.ReactElement;
    if(props.mloaderComponent != null)
      floaderComponent = props.mloaderComponent;
    else
      floaderComponent = () => (<ActivityIndicator color="blue" />);

    return(            
      <View 
        style={{
          position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center", alignItems: "center"
        }}
      >
        {floaderComponent()}
      </View>
    );
  };
    
  return(
    <View style={props.style}>
      {props.mbuildComponent()}    

      {fbuildLoader()}            
    </View>
  );
}

export default COverlayLoader;