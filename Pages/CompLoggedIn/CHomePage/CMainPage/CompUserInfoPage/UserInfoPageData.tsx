import React from "react";
import VideoData from "../../../../../Models/VideoData";

export class ContextData {
  public constructor(
    mstate: State = new State, mdeleteVideoData: (videoId: string)=>Promise<void> = async ()=>{}
  ) {
    this.mstate = mstate;
    this.mdeleteVideoData = mdeleteVideoData;
  }

  
  public mstate: State;
  public mdeleteVideoData: (videoId: string)=>Promise<void>;
}

export class State {
  public minDeleteState: boolean = false;
  public misDeleting: boolean = false;
}

export const gmcontext: React.Context<ContextData> = React.createContext<ContextData>(new ContextData());