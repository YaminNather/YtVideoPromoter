import { useNavigation } from "@react-navigation/native";
import React, {FC, Dispatch, SetStateAction, useEffect, useRef} from "react";
import {Image, View} from "react-native";
import {Button, TextInput, Text, ActivityIndicator, Modal} from "react-native-paper";
import CDropdown, { ItemData } from "../../../../Components/CompDropdown/CDropdown";
import FibAuthMgr from "../../../../Firebase/FibAuthMgr";
import FibFSMgr from "../../../../Firebase/FibFSMgr";
import YoutubeUtilities from "../../../../YoutubeUtilities/YoutubeUtilities";

const CAddVideoPage : FC = (props) => {
  const [videoURL, setVideoURL]: [string, Dispatch<SetStateAction<string>>] = React.useState<string>("");  
  const videoThumbnailURL: [string, Dispatch<SetStateAction<string>>] = React.useState<string>("");
  
  const views: [number | undefined, Dispatch<SetStateAction<number | undefined>>] = 
    React.useState<number | undefined>(undefined);  
  const duration: [number | undefined, Dispatch<SetStateAction<number | undefined>>] = 
    React.useState<number | undefined>(undefined);
  const isAddingToFirestore: [boolean, Dispatch<SetStateAction<boolean>>] = React.useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(
    () => {
      const videoId: string | undefined = YoutubeUtilities.sfextractVideoIdFromURL(videoURL);
      if(videoId != undefined) {
        videoThumbnailURL[1](YoutubeUtilities.sfgetVideoThumbnailURL(videoId));
      }
    }
  );
    
  const fbuildVideoThumbnail: ()=>React.ReactElement = () => {
    return(
      <>
        {(videoThumbnailURL[0] != "") ?
          <Image source={{uri: videoThumbnailURL[0]}} style={{width: "100%", height: "80%"}} /> :
          <View style={{width: "100%", height: "90%", backgroundColor: "grey"}} />}
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
        mheading="Views" mitemsDatas={itemsDatas} mvalue={views[0]} mcontainerStyle={{marginTop: 20}} 
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
        mheading="Duration" mitemsDatas={itemsDatas} mvalue={duration[0]} mcontainerStyle={{marginTop: 20, marginLeft: 20}}
        monChange={(value) => duration[1](value)}  
      />
    );
  };

  const fbuildAddVideoBtn: ()=>React.ReactElement = () => {
    return(
      <Button 
        mode="contained" 
        onPress={async () => {
          console.log(`CustomLog:VideoId = ${YoutubeUtilities.sfextractVideoIdFromURL(videoURL)}, views = ${views[0]}, duration = ${duration[0]}`);          
          
          const videoId: string | undefined = YoutubeUtilities.sfextractVideoIdFromURL(videoURL);
          if(videoId != undefined && views[0] != undefined && duration[0] != undefined) {
            const hasVideoData: boolean = await FibFSMgr.sfcheckIfVideoDataExists(FibAuthMgr.sfgetCurUser()?.fgetUId() as string, videoId);
            if(!hasVideoData) {
              console.log(`CustomLog:Created a videoData:`);

              isAddingToFirestore[1](true);
              await FibFSMgr.sfaddVideoData(FibAuthMgr.sfgetCurUser()?.fgetUId() as string, videoId, views[0], duration[0]);
              navigation.goBack();
            }
            else 
              console.log("CustomLog:VideoData already exists");
          }
        }} 
        style={{marginTop: 20}}
      >
        Add Video
      </Button>
    );
  }

  const frender: ()=>React.ReactElement = () => {
    return(
      <View style={{width: "100%", height: "100%"}}>
        <View style={{backgroundColor: "#DDDDDD", paddingVertical: 10, flex: 1, justifyContent: "center"}}>
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
            
          {fbuildAddVideoBtn()}
        </View>

        <Modal visible={isAddingToFirestore[0]}>
          <ActivityIndicator size="large" color="blue" />
        </Modal>
      </View>
    );
  };

  return frender();
};

export default CAddVideoPage;