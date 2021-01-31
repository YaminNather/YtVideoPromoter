import React from "react";
import VideoData from "../../../../../Models/VideoData";

export class State {
  public mvideosDatas?: VideoData[] = undefined;
  public minDeleteState: boolean = false;
}

export const gmcontext: React.Context<State> = React.createContext<State>(new State());