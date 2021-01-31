import React from "react";
import { FlatList } from "react-native";
import CompUserInfoPage from "../CompUserInfoPage";
import CVideoDetails from "./CVideoDetails";

const CVideosList: React.FC = () => {
  const contextData = React.useContext(CompUserInfoPage.smcontext);
  console.log(`CustomLog:ContextData = ${contextData}`);

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