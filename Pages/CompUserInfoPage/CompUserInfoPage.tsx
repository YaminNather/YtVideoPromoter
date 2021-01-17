import { forFadeFromBottomAndroid } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";
import React from "react";
import {View, Text, ScrollView, Image} from "react-native";
import { Appbar, Button, Divider, IconButton } from "react-native-paper";
import FibFSMgr from "../../Firebase/FibFSMgr";
import VideoData from "../../Models/VideoData";

class State {
  // public mvideoIds?: string[];
  public mvideosDatas?: VideoData[];
}

export default class CompUserInfoPage extends React.Component<any, State> {
  constructor(props: {}) {
    super(props);

    this.state = new State();
  }
  
  public render(): React.ReactNode {
    if(this.state.mvideosDatas == undefined) {
      return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontSize: 30}}>Loading...</Text>
        </View>
      );
    }

    return(
      <View style={{flex: 1}}>
        {/* {this.fbuildAppbar()} */}
        
        {this.fupperSection()}

        {this.fbuildVideoList()}
      </View>
    );
  }
  
  public componentDidMount(): void {
    this.floadData();
  }

  // public async floadData(): Promise<void> {
  //   const videoIds: string[] = await FibFSMgr.sfgetAllVideoIds("Yamin Nather");
  //   const videosDatas: VideoData[] = [];

  //   for(let i: number = 0; i < videoIds.length; i++) {
  //     const videoData: VideoData = await VideoData.sfbuildFromVideoId(videoIds[i]);
  //     // console.log(`VideoData[${i}]={videoId=${videoData.mvideoId}, title=${videoData.mtitle}}`);
  //     // console.log(`VideoData[${i}]=${videoData}`);
  //     videosDatas.push(videoData);
  //   }

  //   this.setState({mvideosDatas: videosDatas});
  // }

  public async floadData(): Promise<void> {
    const videosDatas: VideoData[] = await FibFSMgr.sfgetAllVideosDatas("Yamin Nather");

    console.log("\nLoaded VideoDatas:");
    for(let i: number = 0; i < videosDatas.length; i++) {
      console.log(`\tVideoData[${i}] = ${videosDatas[i]}`);
    }

    this.setState({mvideosDatas: videosDatas});
  }
  
  private fbuildAppbar(): React.ReactNode {
    return(
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => this.props.navigation.navigate("VideoPage")}/>

        <Appbar.Content title="User Info" />

        <Appbar.Action icon="currency-usd" />
        
        <Text style={{color: "white", fontSize: 20}}>200</Text>
      </Appbar.Header>    
    )
  }
  
  private fupperSection(): React.ReactNode {
    return (
      <View style={{ flexDirection: "row", backgroundColor: "royalblue", padding: 10 }}>
        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "grey" }} />

        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 15, color: "white" }}>yamin nather</Text>
          <Button 
            mode="contained" style={{marginTop: 5}}
            onPress={async () => {
              console.log("CustomLog:Started Duplicate Collection");
              await FibFSMgr.sfduplicateCollection("Video_Ids", "VideosDatas"); 
            }}
          >
            Go to your channel
          </Button>
        </View>

        <IconButton icon="pencil" color="white" />
      </View>
    );
  }
  
  private fbuildVideoList(): React.ReactNode {
    let videoComps: React.ReactNode[] = [];
    for(let i: number = 0; i < (this.state.mvideosDatas?.length as number); i++) {
      const videoData: VideoData = (this.state.mvideosDatas as VideoData[])[i];
      const title: string = videoData.mtitle;
      const thumbnailURL: string = (videoData.mthumbnailURL);

      videoComps.push(
        <View key={i}>
          <View style={{flexDirection: "row", padding: 10}}>
            {/* <View style={{width: 80, height: 50, backgroundColor: "royalblue"}} /> */}
            <Image 
              style={{width: 80, height: 50}}
              source={{uri: thumbnailURL}}
            />            
            <View style={{width:10}} />
            
            <Text style={{fontSize: 15, fontWeight: "bold"}}>{title}</Text>
          </View>

          <Divider />
        </View>
      );      
    }
    return(
      <ScrollView>
        {videoComps}
      </ScrollView>
    );
  }  
}