import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, Appbar, Button, Snackbar, Surface, Switch, withTheme } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import COverlayLoader from "../../../../../Components/COverlayLoader/COverlayLoader";
import FibAuthMgr from "../../../../../Firebase/FibAuthMgr";
import FibFSMgr from "../../../../../Firebase/FibFSMgr/FibFSMgr";
import UsersDatasMgr from "../../../../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";
import ViewsPurchaseInfos from "../../../../../Firebase/FibFSMgr/ViewsPurchasesInfoMgr/Models/ViewsPurchasesInfo";
import ViewsPurchaseInfosMgr from "../../../../../Firebase/FibFSMgr/ViewsPurchasesInfoMgr/ViewsPurchasesInfoMgr";
import UserData from "../../../../../Models/UserData";
import VideoData from "../../../../../Models/VideoData";

class State {
  constructor(mcount: number) {
    this.mcount = mcount;
  }

  //#region Variables 
  public mvideosDatas: VideoData[] = [];
  public mcurVidIndex: number = 0;
  public misVideoPlaying = true;
  public mcount: number = 5;
  public mcounterTimeout?: NodeJS.Timeout;
  public misSnackbarVisible: boolean = false;
  public mtoAutoPlay: boolean = true;
  public misAddingCoins: boolean = false;
  //#endregion
}

export class CompVideoPage extends React.Component<{theme: Theme}, State> {
  constructor(props: {theme: Theme}) {
    super(props);

    this.fbuildMainPart = this.fbuildMainPart.bind(this);
    this.fbuildLoader = this.fbuildLoader.bind(this);

    // this.mvideoIds = [
    //   "7jeBAJo_PXM",
    //   "Sgsxnpjs80E",
    //   "ObDzvCORkTw"
    // ];
    this.state = new State(0);
    this.mvideoRef = React.createRef<YoutubeIframeRef>();

    this.flistenToData();
  }

  public async componentDidMount(): Promise<void> {
    await this.flistenToData();
  }
  
  private async flistenToData(): Promise<void> {
    // const videoData: VideoData[] = await FibFSMgr.sfgetAllVideosDatas("", "Yamin Nather");
    // this.setState({mvideosDatas: videoData});

    this.mvideosDatasColtnUnsubber = FibFSMgr.sflistenToVideoDatasCollection(
      (videosDatas) => this.setState({mvideosDatas: videosDatas}),
      "",
      FibAuthMgr.sfgetCurUser()?.fgetUId()      
    );    

    console.log("CustomLog:Done Listening");
  }

  public render(): React.ReactElement {
    return(
      <COverlayLoader 
        style={{width: "100%", height: "100%"}} misLoading={this.state.misAddingCoins} mloaderComponent={this.fbuildLoader}
        mbuildComponent={this.fbuildMainPart}
      />
    );
  }

  public fbuildLoader(): React.ReactElement {
    const styles = StyleSheet.create(
      {
        container: {
          backgroundColor: "white", borderRadius: 3, paddingVertical: 20, paddingHorizontal: 40,
          justifyContent: "center", alignItems: "center"
        }
      }
    );

    return(
      <View style={styles.container}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text>Adding Coins</Text>

          <View style={{width: 10}} />

          <ActivityIndicator />
        </View>
      </View>
    );    
  }

  public fbuildMainPart(): React.ReactElement {
    return(
      <View style={{flex: 1, backgroundColor: "red"}}>
        {/* {this.fbuildAppbar()} */}
        
        <View style={{flex: 1, backgroundColor: "blue"}}>
          {this.fbuildAd()}
          
          {this.fbuildYtVideo()}
          
          {this.fbuildBottomSection()}     

          {this.fbuildAddingCoinsSnackbar()}     
        </View>
      </View>
    );
  }

  private fstartTimer(): void {
    this.setState(
      {
        mcounterTimeout: setInterval(
          () => {            
            if(this.state.mcount <= 0) {
              this.fonTimerDone();
              return;
            }

            this.setState(
              (prevState, _) => {return {mcount: prevState.mcount - 1};}
            )
          }, 1000
        )
      }
    );
  }  

  private async fonTimerDone(): Promise<void> {
    this.setState({ misVideoPlaying: false, misSnackbarVisible: true });    
    this.fstopTimer();    

    this.setState({ misAddingCoins: true });
    
    let curVideoData: VideoData = this.state.mvideosDatas[this.state.mcurVidIndex];    
    
    await FibFSMgr.sfupdateVideoData(curVideoData.mid, {views: curVideoData.mviews - 1});

    const curUserData: UserData = await UsersDatasMgr.sfgetUserData(FibAuthMgr.sfgetCurUser()?.fgetUId() as string) as UserData;
    const viewsPurchaseInfos: ViewsPurchaseInfos = await ViewsPurchaseInfosMgr.sfgetViewsPurchaseInfo();
    const reward: number = viewsPurchaseInfos.fgetDurations().get(curVideoData.mduration)?.mreward as number;
    UsersDatasMgr.sfupdateUserData(FibAuthMgr.sfgetCurUser()?.fgetUId() as string, curUserData.mcoins + reward);    

    this.setState({misAddingCoins: false});

    this.fchangeVideo();
  }

  private fstopTimer(): void {
    if(this.state.mcounterTimeout == undefined) 
      return;

    clearInterval(this.state.mcounterTimeout);
    this.setState({mcounterTimeout: undefined});
  }

  private fbuildAppbar(): React.ReactNode {
    return(
      <Appbar.Header>
        
        <Appbar.Action icon="menu" />
        
        <Appbar.Content title="Video Promoter"/>
        
        <Appbar.Action style={{marginRight: 0}} icon="currency-usd"/>
        
        <Text style={{color: "white", fontSize: 20, fontWeight:"bold"}}>50</Text>
      </Appbar.Header>
    );
  }

  private fbuildAd(): React.ReactNode {
    return(
      <View style={{height:80, backgroundColor:"grey", justifyContent:"center", alignItems:"center"}}>
        <Text style={{fontSize:30, fontWeight:"bold", color: "white"}}>An Ad</Text>
      </View>
    );
  }

  private fbuildYtVideo(): React.ReactNode {
    // console.log(`CustomLog:Is Video playing? ${this.state.misVideoPlaying}`);    
    const fbuildVideoPlayer: ()=>React.ReactNode = () => {
      return(
        <YoutubePlayer           
          ref={this.mvideoRef}
          videoId={this.state.mvideosDatas[this.state.mcurVidIndex].mvideoId}
          play={this.state.misVideoPlaying}
          height={300}
          width={400}
          onReady={async () => {
            this.fstopTimer();
            this.setState({mcount: this.state.mvideosDatas[this.state.mcurVidIndex].mduration});
            if(this.state.mtoAutoPlay){
              this.mvideoRef?.current?.seekTo(0, true);
            }
            else {
              this.setState({misVideoPlaying: false});
            }
          }}
          onChangeState={(e): void => {
            console.log("CustomLog: Video state changed to " + e);
            switch(e) {
              case "playing":                
                this.setState({misVideoPlaying: true});
                this.fstartTimer();                
                break;

              case "onEnded":
              case "paused":
                this.setState({misVideoPlaying: false});              
                this.fstopTimer();
                break;
            }
          }}                    
        />
      );
    };

    return(
      <View style={{flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
        {(this.state.mvideosDatas.length == 0) ? 
            <Text style={{color: "white", fontSize: 50}}>No VideoIds Available</Text> : 
            fbuildVideoPlayer()}
        {/* <Text style={{fontSize:100, fontWeight:"bold", color: "white"}}>Video</Text> */}
      </View>
    );
  }  

  private fchangeVideo(): void {
    if(this.state.mvideosDatas.length == 1)
      return;

    let nextVideoIdIndex: number = this.state.mcurVidIndex + 1;
    if(nextVideoIdIndex == this.state.mvideosDatas.length)
      nextVideoIdIndex = 0;
        
    this.setState({mcurVidIndex: nextVideoIdIndex});    
  }

  private fbuildBottomSection(): React.ReactNode {
    return(
      <Surface style={{padding: 10, alignItems: "center"}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View style={{width:50, height:50, backgroundColor: "black", borderRadius: 25}} />
          
          <Text style={{marginLeft: 20, fontSize: 40, color: this.props.theme.colors.accent}}>{this.state.mcount}</Text>
          
          <View style={{flex: 1}} />

          <Text style={{fontSize: 20}}>Auto-Play</Text>
          <Switch 
            value={this.state.mtoAutoPlay} 
            onValueChange={() => {
              this.setState((prevState, _) => {return {mtoAutoPlay: !prevState.mtoAutoPlay};})
            }}
          />
          {/* <Switch style={{margin: 0, padding: 0}}/> */}
        </View>

        <View style={{height: 20}} />
        
        <Button 
          mode="contained" 
          style={{width: "100%", borderRadius: 0}}
          onPress={() => this.fchangeVideo()}
        >
          Skip this
        </Button>
      </Surface>
    );
  }

  private fbuildAddingCoinsSnackbar(): React.ReactNode {
    return(
      <Snackbar
        visible={this.state.misSnackbarVisible}
        duration={10}
        onDismiss={() => this.setState({misSnackbarVisible: false})}
      >
        Adding coins.
      </Snackbar>
    );
  } 
  
  public componentWillUnmount(): void {
    if(this.mvideosDatasColtnUnsubber != undefined)
      FibFSMgr.sfunsubscribeListener(this.mvideosDatasColtnUnsubber);

    this.fstopTimer();
  }

  //#region Variables
  // readonly mmaxCount: number = 5;
  private mvideoRef?: React.RefObject<YoutubeIframeRef>;
  private mvideosDatasColtnUnsubber?: ()=>void;
  //#endregion
}

export default withTheme(CompVideoPage);