import React from "react";
import {View, Text, ScrollView, Image} from "react-native";
import { Appbar, Button, Divider, IconButton } from "react-native-paper";
import FibFSMgr from "../../Firebase/FibFSMgr";

class VideoData {
  constructor(mvideoId: string) {
    this.mvideoId = mvideoId;
  }

  private async fgetVideoTitle(): Promise<string> {
    // const url: string = `https://youtube.googleapis.com/youtube/v3/videos?
    //   part=snippet
    //   &key=AIzaSyDPpUer1aBe9CAvgcBKmzuRYdO6PiRFwAo
    //   &id=${videoId}`;
    // const url: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyDPpUer1aBe9CAvgcBKmzuRYdO6PiRFwAo&id=Ks-_Mh1QhMc`;
    const url: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyDPpUer1aBe9CAvgcBKmzuRYdO6PiRFwAo&id=${this.mvideoId}`;
    const response: Response = await fetch(
      url,
      {method: "GET"}
    );

    const json: any = await response.json();

    // console.log(`Response for url ${url}:`);
    // console.log(`\t${Object.getOwnPropertyNames(json.items[0])}`);
    // console.log(`\t${json.items[0].snippet.title}`);

    return json.items[0].snippet.title;
  }

  private fgetVideoThumbnailURL(): string {
    return(`https://img.youtube.com/vi/${this.mvideoId}/0.jpg`);
  }

  public async fgetDataFromVideoId(): Promise<void> {
    this.mtitle = await this.fgetVideoTitle();
    this.mthumbnailURL = this.fgetVideoThumbnailURL();
  }

  public toString(): string {
    return(`VideoData{mvideoId=${this.mvideoId},mtitle=${this.mtitle},mthumbnailURL=${this.mthumbnailURL}}`);
  }

  public mvideoId: string;
  public mtitle: string = "";
  public mthumbnailURL: string = "";
}

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

  public async floadData(): Promise<void> {
    const videoIds: string[] = await FibFSMgr.sfgetAllVideoIds();
    const videosDatas: VideoData[] = [];

    for(let i: number = 0; i < videoIds.length; i++) {
      const videoData: VideoData = new VideoData(videoIds[i]);
      await videoData.fgetDataFromVideoId();
      // console.log(`VideoData[${i}]={videoId=${videoData.mvideoId}, title=${videoData.mtitle}}`);
      console.log(`VideoData[${i}]=${videoData}`);
      videosDatas.push(videoData);
    }

    this.setState({mvideosDatas: videosDatas});
  }
  
  private fbuildAppbar() {
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