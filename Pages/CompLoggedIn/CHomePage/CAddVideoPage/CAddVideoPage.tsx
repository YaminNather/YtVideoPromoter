import { useNavigation } from "@react-navigation/native";
import React, {FC, useEffect, MutableRefObject} from "react";
import {Image, View} from "react-native";
import {Button, TextInput, Text, ActivityIndicator, Modal, Surface, useTheme} from "react-native-paper";
import { Subscription } from "rxjs";
import CDropdown, { ItemData } from "../../../../Components/CompDropdown/CDropdown";
import FibAuthMgr from "../../../../Firebase/FibAuthMgr";
import FibFSMgr from "../../../../Firebase/FibFSMgr/FibFSMgr";
import UsersDatasMgr from "../../../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";
import ViewsPurchaseInfos from "../../../../Firebase/FibFSMgr/ViewsPurchasesInfoMgr/Models/ViewsPurchasesInfo";
import ViewsPurchaseInfosMgr from "../../../../Firebase/FibFSMgr/ViewsPurchasesInfoMgr/ViewsPurchasesInfoMgr";
import YoutubeUtilities from "../../../../YoutubeUtilities/YoutubeUtilities";

const CAddVideoPage : FC = (props) => {
  //#region Hooks 
  const refForReactLifetimeStuff: MutableRefObject<boolean> = React.useRef<boolean>(false);

  const [videoURL, setVideoURL] = React.useState<string>("");  
  const videoThumbnailURL = React.useState<string>("");
  
  const viewsPurchasesInfo = React.useState<ViewsPurchaseInfos | undefined>();
  const views = React.useState<number | undefined>(undefined);  
  const duration = React.useState<number | undefined>(undefined);

  const coins = React.useState<number>(-1);

  const isAddingToFirestore = React.useState<boolean>(false);
  
  const navigation = useNavigation();

  // Lifetime hook.
  useEffect(
    () => {
      const viewsPurchasesInfoSubscription: Subscription = ViewsPurchaseInfosMgr.sfgetViewsPurchasesInfoObservable().
        subscribe((value) => viewsPurchasesInfo[1](value));

      const coinsSubscription: Subscription = UsersDatasMgr.
        sfgetUserDataObservable(FibAuthMgr.sfgetCurUser()?.fgetUId() as string).
        subscribe((value) => coins[1](value?.mcoins as number));      

      return( 
        () => {
          viewsPurchasesInfoSubscription.unsubscribe();          
          coinsSubscription.unsubscribe();
        } 
      );
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

  const fgetInitialLoadStatus: ()=>boolean = () => {
    if(viewsPurchasesInfo[0] == undefined || coins[0] < 0)
      return false;

    return true;
  } 

  const fvalidate: ()=>boolean = () => {
    if(views[0] == undefined || duration[0] == undefined || coins[0] - fgetTotal() < 1)
      return false;    

    return true;
  }
    
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
      (value) => itemsDatas.push(new ItemData(value.mviews, `${value.mviews} for ${value.mamount} coins`))
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
      (value) => itemsDatas.push(new ItemData(value.mduration, `${value.mduration} for x${value.mamount} coins`))
    );

    return(
      <CDropdown<number> 
        mheading="Duration (sec)" mitemsDatas={itemsDatas} mvalue={duration[0]} mcontainerStyle={{marginTop: 20, marginLeft: 20}}
        monChange={(value) => duration[1](value)}  
      />
    );
  };

  const fbuildTotalLbl: ()=>React.ReactElement = () => {
    if(views[0] == undefined || duration[0] == undefined)
      return <></>;
    const total: number = fgetTotal();    

    return(
      <View style={{width: "100%", alignItems: "center"}}>
        <Text style={{marginTop: 20, fontSize: 20}}>{`Total = ${total} coins`}</Text>
      </View>
    );
  };

  const fbuildAddVideoBtn: ()=>React.ReactElement = () => {          
    return(
      <Button 
        mode="contained" 
        style={{marginTop: 20}}
        color={(!fvalidate()) ? "grey" : undefined}
        onPress={async () => {
          if(!fvalidate())
            return;

          console.log(`CustomLog:VideoId = ${YoutubeUtilities.sfextractVideoIdFromURL(videoURL)}, views = ${views[0]}, duration = ${duration[0]}`);          
          
          const videoId: string | undefined = YoutubeUtilities.sfextractVideoIdFromURL(videoURL);
          if(videoId != undefined && views[0] != undefined && duration[0] != undefined) {
            const hasVideoData: boolean = await FibFSMgr.sfcheckIfVideoDataExists(FibAuthMgr.sfgetCurUser()?.fgetUId() as string, videoId);
            if(!hasVideoData) {
              console.log(`CustomLog:Created a videoData:`);

              isAddingToFirestore[1](true);
              await FibFSMgr.sfaddVideoData(FibAuthMgr.sfgetCurUser()?.fgetUId() as string, videoId, views[0], duration[0]);


              await UsersDatasMgr.sfupdateUserData(FibAuthMgr.sfgetCurUser()?.fgetUId() as string, coins[0] - fgetTotal());
              navigation.goBack();
            }
            else 
              console.log("CustomLog:VideoData already exists");
          }
        }}         
      >
        Add Video
      </Button>
    );
  }  

  const fgetTotal: ()=>number = () => {
    if(views[0] == undefined || duration[0] == undefined)
      return -1;

    const coinsForViews: number = viewsPurchasesInfo[0]?.fgetViews().get(views[0])?.mamount as number;
    const multiplierForDuration: number = viewsPurchasesInfo[0]?.fgetDurations().get(duration[0])?.mamount as number;

    return coinsForViews * multiplierForDuration;    
  }

  const frender: ()=>React.ReactElement = () => {    
  
    if(!fgetInitialLoadStatus())
      return(
        <View style={{width: "100%", height: "100%", backgroundColor: useTheme().colors.background, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" color="blue" /> 
        </View>
      );

    return(
      <View style={{width: "100%", height: "100%", backgroundColor: useTheme().colors.background}}>
        <View style={{paddingVertical: 10, flex: 1, justifyContent: "center"}}>
          {fbuildVideoThumbnail()}
        </View>
  
        <Surface style={{padding: 10, borderColor: "black"}}>          
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

          {fbuildTotalLbl()}
            
          {fbuildAddVideoBtn()}
        </Surface>

        <Modal visible={isAddingToFirestore[0]}>
          <ActivityIndicator size="large" color="blue" />
        </Modal>
      </View>
    );
  };
  

  return frender();
};

export default CAddVideoPage;