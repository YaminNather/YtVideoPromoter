import { useNavigation } from "@react-navigation/native";
import React, {FC, useEffect, MutableRefObject} from "react";
import {Image, View} from "react-native";
import {Button, TextInput, Text, ActivityIndicator, Modal} from "react-native-paper";
import { Subscription } from "rxjs";
import CDropdown, { ItemData } from "../../../../Components/CompDropdown/CDropdown";
import FibAuthMgr from "../../../../Firebase/FibAuthMgr";
import FibFSMgr from "../../../../Firebase/FibFSMgr/FibFSMgr";
import ViewsPurchasesInfo from "../../../../Firebase/FibFSMgr/ViewsPurchasesInfoMgr/Models/ViewsPurchasesInfo";
import ViewsPurchasesInfoMgr from "../../../../Firebase/FibFSMgr/ViewsPurchasesInfoMgr/ViewsPurchasesInfoMgr";
import YoutubeUtilities from "../../../../YoutubeUtilities/YoutubeUtilities";

const CAddVideoPage : FC = (props) => {
  //#region Hooks 
  const refForReactLifetimeStuff: MutableRefObject<boolean> = React.useRef<boolean>(false);

  const [videoURL, setVideoURL] = React.useState<string>("");  
  const videoThumbnailURL = React.useState<string>("");
  
  const viewsPurchasesInfo = React.useState<ViewsPurchasesInfo | undefined>();

  const views = React.useState<number | undefined>(undefined);  
  const duration = React.useState<number | undefined>(undefined);
  const isAddingToFirestore = React.useState<boolean>(false);
  const navigation = useNavigation();

  // Lifetime hook.
  useEffect(
    () => {
      const subscription: Subscription = ViewsPurchasesInfoMgr.sfgetViewsPurchasesInfoObservable().subscribe(
        (value) => viewsPurchasesInfo[1](value)
      );

      return( () => subscription.unsubscribe() );
    }, [refForReactLifetimeStuff]
  );

  useEffect(
    () => {
      const videoId: string | undefined = YoutubeUtilities.sfextractVideoIdFromURL(videoURL);
      if(videoId != undefined) {
        videoThumbnailURL[1](YoutubeUtilities.sfgetVideoThumbnailURL(videoId));
      }
    }
  );
  //#endregion
    
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
    const itemsDatas: ItemData<number>[] = [];

    viewsPurchasesInfo[0]?.fgetViews().forEach(
      (views, amount) => itemsDatas.push(new ItemData(views, `${views} for ${amount} coins`))
    );

    return(
      <CDropdown<number>
        mheading="Views" mitemsDatas={itemsDatas} mvalue={views[0]} mcontainerStyle={{marginTop: 20}} 
        monChange={(value) => views[1](value)}
      />
    );
  };

  const fbuildDurationDropdown: ()=>React.ReactElement = () => {
    const itemsDatas: ItemData<number>[] = [];

    viewsPurchasesInfo[0]?.fgetDurations().forEach(
      (duration, amount) => itemsDatas.push(new ItemData(duration, `${duration} for ${amount} coins`))
    );

    return(
      <CDropdown<number> 
        mheading="Duration (sec)" mitemsDatas={itemsDatas} mvalue={duration[0]} mcontainerStyle={{marginTop: 20, marginLeft: 20}}
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
    if(viewsPurchasesInfo[0] == null)
      return( <ActivityIndicator size="large" color="blue" /> );

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