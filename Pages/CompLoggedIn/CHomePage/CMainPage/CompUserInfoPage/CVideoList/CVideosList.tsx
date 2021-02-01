import React from "react";
import { FlatList } from "react-native";
import { State, gmcontext as UserInfoPageContext, ContextData } from "../UserInfoPageData";
import CVideoDetails from "./CVideoDetails";

const CVideosList: React.FC = () => {
  const contextData: ContextData = React.useContext<ContextData>(UserInfoPageContext);

  const frender: ()=>React.ReactElement = () => {
    return(
      <FlatList 
        data={contextData.mstate.mvideosDatas}
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