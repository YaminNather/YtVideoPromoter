import React from "react";
import {Text, View} from "react-native";
import {Appbar, Button, Snackbar, Switch} from "react-native-paper";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import FibDbMgr from "../../Firebase/FibDbMgr";
import FibFSMgr from "../../Firebase/FibFSMgr";

class State {
  constructor(mcount: number) {
    this.mcount = mcount;
  }

  public mvideoIds: string[] = [];
  public mvideoIdIndex: number = 0;
  public misVideoPlaying = true;
  public mcount: number = 5;
  public mcounterTimeout?: NodeJS.Timeout;
  public misSnackbarVisible: boolean = false;
  public mtoAutoPlay: boolean = true;
}

export default class CompVideoPage extends React.Component<{}, State> {
  constructor(props: State) {
    super(props);

    // this.mvideoIds = [
    //   "7jeBAJo_PXM",
    //   "Sgsxnpjs80E",
    //   "ObDzvCORkTw"
    // ];
    this.state = new State(this.mmaxCount);
    this.mvideoRef = React.createRef<YoutubeIframeRef>();

    this.fgetVideoIds();
  }
  
  private async fgetVideoIds(): Promise<void> {
    // console.log("CustomLog: Started to load VideoIds");
    
    // const videoIds: string[] = await FibDbMgr.sfgetAllVideoIds();
    const videoIds: string[] = await FibFSMgr.sfgetAllVideoIds();
    
    // console.log("CustomLog: Loaded VideoIds: ");
    // videoIds.forEach(videoId => console.log(`\t${videoId}`));
    this.setState({mvideoIds: videoIds});
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
          async () => {            
            if(this.state.mcount <= 0) {
              this.setState({misVideoPlaying: false});
              this.setState({misSnackbarVisible: true});
              this.fstopTimer();
              this.fchangeVideo();
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
          videoId={this.state.mvideoIds[this.state.mvideoIdIndex]}
          play={this.state.misVideoPlaying}
          height={300}
          width={400}
          onReady={async () => {
            this.fstopTimer();
            this.setState({mcount: this.mmaxCount});
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
        {(this.state.mvideoIds.length == 0) ? 
            <Text style={{color: "white", fontSize: 50}}>Loading VideoIds</Text> : 
            fbuildVideoPlayer()}
        {/* <Text style={{fontSize:100, fontWeight:"bold", color: "white"}}>Video</Text> */}
      </View>
    );
  }  

  private fchangeVideo(): void {
    let nextVideoIdIndex: number = this.state.mvideoIdIndex + 1;
    if(nextVideoIdIndex == this.state.mvideoIds.length)
      nextVideoIdIndex = 0;
        
    this.setState({mvideoIdIndex: nextVideoIdIndex});
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
  
  //#region Variables
  readonly mmaxCount: number = 5;
  private mvideoRef?: React.RefObject<YoutubeIframeRef>;
  //#endregion
}