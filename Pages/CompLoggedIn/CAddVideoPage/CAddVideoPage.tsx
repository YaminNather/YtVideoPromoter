import React, {FC, Dispatch, SetStateAction, useEffect, useRef} from "react";
import {Image, View} from "react-native";
import {Button, TextInput, Text} from "react-native-paper";
import CDropdown, { ItemData } from "../../../Components/CompDropdown/CDropdown";
import YoutubeUtilities from "../../../YoutubeUtilities/YoutubeUtilities";

const CAddVideoPage : FC = (props) => {    
  const [videoURL, setVideoURL]: [string, Dispatch<SetStateAction<string>>] = React.useState<string>("");  
  let videoTitle: [string, Dispatch<SetStateAction<string>>] = React.useState<string>("");
  let videoThumbnailURL: [string, Dispatch<SetStateAction<string>>] = React.useState<string>("");
  let views: [number, Dispatch<SetStateAction<number>>] = React.useState<number>(0);
  let duration: [number, Dispatch<SetStateAction<number>>] = React.useState<number>(0);

  // console.log(`CustomLog:Video Thumbnail URL = ${videoThumbnailURL[0]}`);

  useEffect(
    () => {
      const videoId: string | undefined = YoutubeUtilities.sfextractVideoIdFromURL(videoURL);
      if(videoId != undefined) {
        YoutubeUtilities.sfgetVideoTitle(videoId).then((value) => videoTitle[1](value));
        
        // console.log(`CustomLog:Setting Video Thumbnail URL = ${videoThumbnailURL[0]}`);
        videoThumbnailURL[1](YoutubeUtilities.sfgetVideoThumbnailURL(videoId));
      }
    }
  );

  const fbuildVideoTitle: ()=>React.ReactElement = () => {
    return(<Text style={{marginHorizontal: 5, fontWeight: "bold", fontSize: 20}}>{videoTitle[0]}</Text>);
  };
  
  const fbuildVideoThumbnail: ()=>React.ReactElement = () => {
    return(
      <>
        {(videoThumbnailURL[0] != "") ?
          <Image source={{uri: videoThumbnailURL[0]}} style={{width: "100%", height: "80%"}} /> :
          <View style={{width: "100%", height: "90%", backgroundColor: "red"}} />}
      </>        
    );
  };

  const fbuildViewsDropdown: ()=>React.ReactElement = () => {
    const itemsDatas: ItemData<number>[] = [
      new ItemData<number>(100, "100"), new ItemData<number>(200, "200"), new ItemData<number>(300, "300"), 
      new ItemData<number>(400, "400")
    ];
    return(
      <CDropdown<number> 
        mheading="Views" mitemsDatas={itemsDatas} mcontainerStyle={{marginTop: 20}} 
        monChange={(value) => views[1](value)}  
      />
    );
  };

  const fbuildDurationDropdown: ()=>React.ReactElement = () => {
    const itemsDatas: ItemData<number>[] = [
      new ItemData<number>(60, "1 minute"), new ItemData<number>(60 * 5, "5 minutes"), 
      new ItemData<number>(60 * 10, "10 minutes"), new ItemData<number>(60 * 30, "30 minutes")
    ];

    return(
      <CDropdown<number> 
        mheading="Duration" mitemsDatas={itemsDatas} mcontainerStyle={{marginTop: 20, marginLeft: 20}}
        monChange={(value) => duration[1](value)}  
      />
    );
  };

  const frender: ()=>React.ReactElement = () => {
    return(
      <View style={{width: "100%", height: "100%"}}>
        <View style={{backgroundColor: "#DDDDDD", paddingVertical: 10, flex: 1, justifyContent: "center"}}>  
          {fbuildVideoTitle()}
          {fbuildVideoThumbnail()}
        </View>
  
        <View style={{padding: 10, borderColor: "black"}}>          
          <Text style={{fontSize: 20}}>Video Details:</Text>
          
          <TextInput
            mode="outlined" label="Video URL" placeholder="URL" value={videoURL}
            onChangeText={(text) => {
              if(text != videoURL)
                setVideoURL(text);
            }} 
            style={{marginTop: 5}}
          />
  
          <View style={{width: "100%", flexDirection: "row"}}>
            {fbuildViewsDropdown()}
            
            {fbuildDurationDropdown()}
          </View>
  
          <Button mode="contained" style={{marginTop: 20}}>Add Video</Button>
        </View>
      </View>
    );
  };

  return frender();
};

export default CAddVideoPage;