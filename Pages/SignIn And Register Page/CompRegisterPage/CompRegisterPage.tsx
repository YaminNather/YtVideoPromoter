import React, { FC } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import {TextInput, Button, ActivityIndicator} from "react-native-paper"; 
import CLoader from "../../../Components/CLoader/CLoader";
import FibAuthMgr from "../../../Firebase/FibAuthMgr";
import UsersDatasMgr from "../../../Firebase/FibFSMgr/UsersDatasMgr/UsersDatasMgr";
import User from "../../../Models/User";
import UserData from "../../../Models/UserData";
import CCustomTextInput from "../Common/Components/CCustomTextInput/CCustomTextInput";
import { CommonStyles } from "../Common/Styles/CommonStyles";

class State {
  public mcurEmail: string = "";
  public mcurPassword: string = "";
  public mcurReferralCode: string = "";

  public merrorMsg: string = "";

  public misBusy: boolean = false;
}

export default class CompRegisterPage extends React.Component<{}, State> {
  public constructor(props: {}) {
    super(props);

    this.state = new State();

    this.fbuildActualPage = this.fbuildActualPage.bind(this);
    this.fregister = this.fregister.bind(this);
  }

  public render(): React.ReactElement {
    return(
      <View 
        style={{width: "100%", flex: 1, paddingHorizontal: 10, justifyContent: "center"}}
      >    
        <CLoader 
          misLoading={this.state.misBusy}
          mloadingComponent={() => (<ActivityIndicator color="blue" size="large"/>)}
          mbuildComponent={this.fbuildActualPage}
        />
      </View>
    );
  }

  private fbuildActualPage(): React.ReactElement {
    return(
      <>
        <Text style={CommonStyles.Title}>Register Page</Text>

        <View style={{height: 20}} />

        <View style={{width: "100%", alignItems: "center"}}>
          <View style={{width: "100%", backgroundColor: "white", borderRadius: 20,  padding: 20, alignItems: "center"}}>
            <CCustomTextInput 
              mlabel="Email" mvalue={this.state.mcurEmail} 
              monChangeText={(text) => { this.setState({mcurEmail: text}); }} 
            />         

            <CCustomTextInput 
              mlabel="Password" mtextContentType="password" mvalue={this.state.mcurPassword} 
              monChangeText={(text) => { this.setState({mcurPassword: text}); }} 
              mstyle={{marginTop: 20}}
            /> 

            <CCustomTextInput 
              mlabel="Referral Code (Optional)" mvalue={this.state.mcurReferralCode} mstyle={{marginTop: 20}}
              monChangeText={(text) => { this.setState({mcurReferralCode: text}); }}
            />
            
            <Button mode="contained" style={[CommonStyles.Button, {width: "60%", marginTop: 20}]} onPress={this.fregister}>Register With EAP</Button>

            <View style={{height: 20}} />

            {this.fbuildErrorMsg()}
          </View>
        </View>
      </>
    );
  }

  private async fregister(): Promise<void> {
    this.fsetBusyState(true);

    const validationResult: boolean = await this.fvalidate();
    
    if(!validationResult) {
      this.setState({merrorMsg: "Invalid entry", misBusy: false});      
      return;            
    }
    
    this.setState({merrorMsg: ""});              
      const newUser: User = await FibAuthMgr.sfregisterWithEAP(this.state.mcurEmail, this.state.mcurPassword);
      
      if(this.state.mcurReferralCode != "") {
        const newUserUserData: UserData = await UsersDatasMgr.sfgetUserData(newUser.fgetUId()) as UserData;                
        const referredUserUserData: UserData = await UsersDatasMgr.sfgetUserData(this.state.mcurReferralCode) as UserData;

        await UsersDatasMgr.sfupdateUserData(newUser.fgetUId(), newUserUserData.mcoins + 300);
        await UsersDatasMgr.sfupdateUserData(this.state.mcurReferralCode, referredUserUserData.mcoins + 300);
      }   
  }

  private fsetBusyState(value: boolean): void { this.setState({misBusy: value}); }

  private async fvalidate(): Promise<boolean> {
    if(this.state.mcurEmail == "" || this.state.mcurPassword == "")
      return false;

    if(this.state.mcurReferralCode != "") {
      const doesUserExist: boolean = await FibAuthMgr.sfdoesUserExist(this.state.mcurReferralCode);

      return doesUserExist;
    }

    return true;
  }

  private fbuildErrorMsg(): React.ReactElement {
    if(this.state.merrorMsg == "")
    return <></>;
    
    return <Text style={{color: "red"}}>{this.state.merrorMsg}</Text>;    
  }
}