import React from "react";
import { FlatList } from "react-native";
import VideoData from "../../../../../../Models/VideoData";
import { State, gmcontext as UserInfoPageContext, ContextData } from "../UserInfoPageData";
import CVideoDetails from "./CVideoDetails";

interface Props {
  mvideosDatas: VideoData[];
}

const CVideosList: React.FC<Props> = (props) => {
  const frender: ()=>React.ReactElement = () => {
    return(
      <FlatList 
        data={props.mvideosDatas}
        renderItem={(itemInfo) => {
          return (<CVideoDetails mkey={itemInfo.index} mvideoData={itemInfo.item} />);
        }}
        keyExtractor={(_, index) => `${index}`}
      />
    );
  };

  return(frender());
};

export default CVideosList;