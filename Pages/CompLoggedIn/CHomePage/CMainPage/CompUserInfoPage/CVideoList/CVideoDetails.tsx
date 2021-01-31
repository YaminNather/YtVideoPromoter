import React from "react";
import { View, Image } from "react-native";
import { Divider, Text } from "react-native-paper";

interface Props {
  mkey: number;
  mthumbnailURL: string;
}

const CVideoDetails: React.FC<Props> = (props) => {
  const frender: ()=>React.ReactElement = () => {
    return(
      <View key={props.mkey} style={{padding: 10}}>          
          {/* <View style={{width: 80, height: 50, backgroundColor: "royalblue"}} /> */}
          <Image 
            style={{width: "100%", height: 220}}
            source={{uri: props.mthumbnailURL}}
          />

          <Divider />
        </View>
    );
  }

  return (frender());
};

export default CVideoDetails;