import { NavigationContext } from "@react-navigation/native";
import React from "react";
import {View, ActivityIndicator} from "react-native";
import { Appbar, Button, IconButton, FAB, Text, Modal} from "react-native-paper";
import FibAuthMgr from "../../../../../Firebase/FibAuthMgr";
import FibFSMgr from "../../../../../Firebase/FibFSMgr";
import VideoData from "../../../../../Models/VideoData";
import CVideosList from "./CVideoList/CVideosList";
import { State, gmcontext as Context, ContextData } from "./UserInfoPageData";

export default class CompUserInfoPage extends React.Component<any, State> {
  constructor(props: {}) {
    super(props);

    this.state = new State();    
  }
  
  public render(): React.ReactNode {
    return(
      <Context.Provider value={new ContextData(this.state, this.fdeleteVideoData)}>
        <View style={{flex: 1}}>
          {/* {this.fbuildAppbar()} */}
          
          {this.fupperSection()}

          {this.fbuildVideoList()}

          {this.fbuildFAB()}
        </View>

        <Modal 
          visible={this.state.misDeleting}
          style={{width: "100%", height: "100%"}}
        >                    
          <ActivityIndicator size="large" color="blue" />
        </Modal>
      </Context.Provider>
    );
  }
  
  private fbuildFAB(): React.ReactNode {
    return(
      <NavigationContext.Consumer>
        {(navigation) => {
          return(
            <FAB
              icon="plus"
              style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }} 
              onPress={() => navigation?.navigate("Add Video Page")}
            />
          );
        }}      
      </NavigationContext.Consumer>
    );
  }

  public async componentDidMount(): Promise<void> {
    await this.floadData();
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
    // const videosDatas: VideoData[] = await FibFSMgr.sfgetAllVideosDatas("Yamin Nather");

    // console.log("\nLoaded VideoDatas:");
    // for(let i: number = 0; i < videosDatas.length; i++) {
    //   console.log(`\tVideoData[${i}] = ${videosDatas[i]}`);
    // }

    // this.setState({mvideosDatas: videosDatas});

    FibFSMgr.sflistenToVideoDatasCollection(
      (videosDatas) => this.setState({mvideosDatas: videosDatas}),
      FibAuthMgr.sfgetCurUser()?.fgetUId()
      // "Yamin Nather"
    );
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
        
        <View style={{flex: 1}} />

        <IconButton 
          icon="delete" color="white" size={30}
          onPress={() => this.setState((curState, props) => ({minDeleteState: !curState.minDeleteState}))}
        />
      </View>
    );
  }
  
  private fbuildVideoList(): React.ReactNode {
    if(this.state.mvideosDatas == undefined || (this.state.mvideosDatas as VideoData[]).length == 0) {
      return(
        <View style={{alignItems: "center"}}>          
          <Text style={{marginTop: 40, fontSize: 20, fontWeight: "500"}}>Click the '+' button to add a video.</Text>
        </View>
      );
    }

    return(<CVideosList />);
  }  

  public componentWillUnmount(): void {
    if(this.mvideosDatasColtnUnsubscriber != undefined)
      FibFSMgr.sfunsubscribeListener(this.mvideosDatasColtnUnsubscriber);
  }

  public fdeleteVideoData: (videoId: string)=>Promise<void> = async (videoId) => {
    this.setState({misDeleting: true});
    await FibFSMgr.sfdeleteVideoData(FibAuthMgr.sfgetCurUser()?.fgetUId() as string, videoId);
    this.setState({misDeleting: false});
  }

  //#region Variables
  private mvideosDatasColtnUnsubscriber?: ()=>void;
  //#endregion
}