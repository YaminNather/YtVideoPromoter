import React, { useEffect } from "react";
import {View, Image, Animated} from "react-native";
import {Card, Divider, IconButton, Colors} from "react-native-paper";
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
      const toValue: number = (contextData.mstate.minDeleteState) ? -50 : 0;
      Animated.timing(animVal, {toValue: toValue, duration: 200, useNativeDriver: true}).start(); 
    }, 
    [contextData.mstate.minDeleteState]
  );
  
  const frender: ()=>React.ReactElement = () => {
    const inDeleteState: boolean = contextData.mstate.minDeleteState;                                    

    return(
      <View key={props.mkey} style={{padding: 10, flexDirection: "row", alignItems: "center"}}>  
        {/* <View style={{width: 80, height: 50, backgroundColor: "royalblue"}} /> */}
        
        <View style={{position: "absolute", height: "auto", right: 10, justifyContent: "center"}}>
          {/* <View style={{borderWidth: 0.5, borderColor: Colors.black, borderRadius: 50}}> */}
            <IconButton 
              icon="close" onPress={() => contextData.mdeleteVideoData(props.mvideoData.mvideoId)} 
              style={{borderWidth: 0.5, borderColor: Colors.black, borderRadius: 50}}
            />
          {/* </View> */}
        </View>

        <Animated.View style={{width: "100%", height: 220, transform: [ {translateX: animVal} ]}}>
          <Card elevation={20} style={{width: "100%", height: "100%", padding: 5}}>
            {/* <Card.Content> */}
              <Image style={{width: "100%", height: "100%"}} source={{uri: props.mvideoData.mthumbnailURL}} />
            {/* </Card.Content> */}
          </Card>
        </Animated.View>                    
      </View>
    );
  }

  return (frender());
};

export default CVideoDetails;