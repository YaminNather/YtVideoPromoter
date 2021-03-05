import React, { FC } from "react";
import { ToastAndroid, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import FibAuthMgr from "../../../Firebase/FibAuthMgr";
import Clipboard from "expo-clipboard"; 

const CGetReferralCodePage: FC = (props) => {
  
  const render: ()=>React.ReactElement = () => {
    const uId: string = FibAuthMgr.sfgetCurUser()?.fgetUId() as string;
    return(
      <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>        
        <Text style={{fontSize: 50, fontWeight: "bold"}}>Refer a Friend</Text>

        <View style={{height: 20}} />
        
        <Text style={{fontSize: 20}}>Refer to a friend and get 300 coins for free</Text>
        
        <Text style={{fontSize: 20}}>For you and ur friend!!!</Text>

        <View style={{height: 20}} />

        <View style={{flexDirection: "row", alignItems: "center"}}>
          <TextInput 
            mode="flat" value={uId} editable={false}
            style={{maxHeight: 50}}          
          />

          <IconButton 
            icon="content-copy" size={30} 
            onPress={() => { 
              Clipboard.setString(uId);
              ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
            }} 
          />
        </View>

        <View style={{height: 20}} />

        <Button mode="contained" onPress={()=>{}}>Refer Now</Button>
      </View>
    );
  };
  
  return render();
};

export default CGetReferralCodePage;