import React from "react";
import {Text, View} from "react-native";
import {Appbar, Button, Snackbar, Switch} from "react-native-paper";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import FibDbMgr from "../../Firebase/FibDbMgr";
import FibFSMgr from "../../Firebase/FibFSMgr";
import VideoData from "../../Models/VideoData";

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
  //#endregion
}

export default class CompVideoPage extends React.Component<{}, State> {
  constructor(props: State) {
    super(props);

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

    this.mlistenerUnsubscriber = FibFSMgr.sflistenToVideoDatasCollection(
      (videosDatas) => this.setState({mvideosDatas: videosDatas}),
      "",
      "Yamin Nather"
    );

    console.log("CustomLog:Done Listening");
  }  

  public render(): React.ReactNode {
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

  private fonTimerDone(): void {
    this.setState({ misVideoPlaying: false });
    this.setState({ misSnackbarVisible: true });
    this.fstopTimer();    

    let newData: VideoData = this.state.mvideosDatas[this.state.mcurVidIndex];
    newData.mviews--;
    FibFSMgr.sfupdateVideoData(newData);

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
            <Text style={{color: "white", fontSize: 50}}>Loading VideoIds</Text> : 
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
      <View style={{padding: 10, backgroundColor: "white", alignItems: "center"}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View style={{width:50, height:50, backgroundColor: "black", borderRadius: 25}} />
          
          <Text style={{marginLeft: 20, fontSize: 40, color: "orange"}}>{this.state.mcount}</Text>
          
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
      </View>
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
    (this.mlistenerUnsubscriber as ()=>void)();
    this.fstopTimer();
  }

  //#region Variables
  // readonly mmaxCount: number = 5;
  private mvideoRef?: React.RefObject<YoutubeIframeRef>;
  private mlistenerUnsubscriber?: ()=>void;
  //#endregion
}