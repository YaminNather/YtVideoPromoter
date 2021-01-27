import React, { ComponentProps, FC, Dispatch, SetStateAction } from "react";
import {View} from "react-native";
import {Button, TextInput, Text} from "react-native-paper";
import CDropdown, { ItemData } from "../../../Components/CompDropdown/CDropdown";

const CAddVideoPage : FC = (props) => {
  const [videoURL, setVideoURL] : [string, Dispatch<SetStateAction<string>>] = React.useState<string>("");

  const fbuildViewsDropdown: ()=>React.ReactElement = () => {
    const itemsDatas: ItemData[] = [
      new ItemData(100, "100"), new ItemData(200, "200"), new ItemData(300, "300"), new ItemData(400, "400")
    ];
    return(
      <CDropdown mheading="Views" mitemsDatas={itemsDatas} mcontainerStyle={{marginTop: 20}}
      />
    );
  };

  const fbuildDurationDropdown: ()=>React.ReactElement = () => {
    const itemsDatas: ItemData[] = [
      new ItemData(60, "1 minute"), new ItemData(60 * 5, "5 minutes"), new ItemData(60 * 10, "10 minutes"),
      new ItemData(60 * 30, "30 minutes")
    ];

    return(
      <CDropdown mheading="Duration" mitemsDatas={itemsDatas} mcontainerStyle={{marginTop: 20, marginLeft: 20}}
      />
    );
  }

  return(
    <View style={{width: "100%", height: "100%"}}>
      <View style={{backgroundColor: "#DDDDDD", paddingVertical: 10, flex: 1, justifyContent: "center"}}>        
        <View style={{width: "100%", height: "100%", backgroundColor: "#AAAAAA"}} />
      </View>

      <View style={{padding: 10, borderColor: "black"}}>          
        <Text style={{fontSize: 20}}>Video Details:</Text>
        
        <TextInput 
          mode="outlined" label="Video URL" placeholder="URL" onChangeText={(text) => {setVideoURL(text)}} 
          style={{marginTop: 5}}
        />

        <View style={{width: "100%", flexDirection: "row"}}>
          {fbuildViewsDropdown()}
          
          {fbuildDurationDropdown()}
        </View>

        <Button mode="contained" style={{marginTop: 20}}>Add Video</Button>
      </View>
    </View>
  );
};

export default CAddVideoPage;