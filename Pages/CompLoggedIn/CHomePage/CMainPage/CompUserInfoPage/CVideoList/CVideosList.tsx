import React from "react";
import { FlatList } from "react-native";
import { State, gmcontext as UserInfoPageContext } from "../UserInfoPageData";
import CVideoDetails from "./CVideoDetails";

const CVideosList: React.FC = () => {
  const contextData: State = React.useContext<State>(UserInfoPageContext);

  const frender: ()=>React.ReactElement = () => {
    return(
      <FlatList 
        data={contextData.mvideosDatas}
        renderItem={(itemInfo) => {
          return (<CVideoDetails mkey={itemInfo.index} mthumbnailURL={itemInfo.item.mthumbnailURL} />);
        }}
        keyExtractor={(_, index) => `${index}`}   
      />
    );
  };

  return(frender());
};

export default CVideosList;