import React, { useEffect } from "react";
import {View, Image, Animated} from "react-native";
import {Divider, IconButton} from "react-native-paper";
import VideoData from "../../../../../../Models/VideoData";
import {ContextData, gmcontext as UserInfoContext, State} from "../UserInfoPageData";

interface Props {
  mkey: number;
  mvideoData: VideoData;
}

const CVideoDetails: React.FC<Props> = (props) => {  
  const contextData: ContextData = React.useContext<ContextData>(UserInfoContext);
  const animVal: Animated.Value = React.useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(
    () => {
      Animated.timing(animVal, {toValue: 1, duration: 5000, useNativeDriver: true}).start();
    }, 
    [animVal]
  );
  
  const frender: ()=>React.ReactElement = () => {
    const inDeleteState: boolean = contextData.mstate.minDeleteState;

    return(
      <View key={props.mkey} style={{padding: 10, flexDirection: "row", alignItems: "center"}}>  
        {/* <View style={{width: 80, height: 50, backgroundColor: "royalblue"}} /> */}
        <Image 
          style={{flex: 1, height: 220}}
          source={{uri: props.mvideoData.mthumbnailURL}}
        />

        {(!inDeleteState) ?
          undefined : 
          <IconButton icon="close" onPress={() => contextData.mdeleteVideoData(props.mvideoData.mvideoId)} />
        }
        <Divider />
      </View>
    );
  }

  return (frender());
};

export default CVideoDetails;