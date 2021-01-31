import React, { useEffect } from "react";
import {View, Image, Animated} from "react-native";
import {Divider, IconButton} from "react-native-paper";
import {gmcontext as UserInfoContext, State} from "../UserInfoPageData";

interface Props {
  mkey: number;
  mthumbnailURL: string;
}

const CVideoDetails: React.FC<Props> = (props) => {
  const scaleAnimVal: Animated.Value = React.useRef<Animated.Value>(new Animated.Value(1)).current;
  const contextData: State = React.useContext<State>(UserInfoContext);

  useEffect(
    () => {
      Animated.timing(scaleAnimVal, {toValue: 0.9, duration: 1000, useNativeDriver: true}).start();
    }, [scaleAnimVal]
  );
  
  const frender: ()=>React.ReactElement = () => {
    const inDeleteState: boolean = contextData.minDeleteState;

    return(      
      <View key={props.mkey} style={{padding: 10, flexDirection: "row", alignItems: "center"}}>  
        {/* <View style={{width: 80, height: 50, backgroundColor: "royalblue"}} /> */}
        <Animated.Image 
          style={{flex: 1, height: 220}}
          source={{uri: props.mthumbnailURL}}
        />

        {(!inDeleteState) ?
          undefined : 
          <IconButton icon="close" onPress={() => {}} />}

        <Divider />
      </View>
    );
  }

  return (frender());
};

export default CVideoDetails;