import React from "react";
import { View } from "react-native";
import {Button, Text, Colors} from "react-native-paper";
import {NavigationContext} from "@react-navigation/native";
import FibAuthMgr from "../../../Firebase/FibAuthMgr";
import CCustomTextInput from "../Common/Components/CCustomTextInput/CCustomTextInput";
import { CommonStyles } from "../Common/Styles/CommonStyles";

class State {
  public mcurEmail: string = "";
  public mcurPassword: string = "";
}

export default class CompSignInPage extends React.Component<{}, State> {
  constructor(props: State) {
    super(props);

    this.state = new State();
  }
  
  public render(): React.ReactNode {
    return(
      <View style={{flex: 1, paddingHorizontal: 10, justifyContent: "center"}}>         
        <Text style={CommonStyles.Title}>Signin Page</Text>

        <View style={{height: 20}} />

        <View style={{width: "auto", alignItems: "center"}}>
          <View style={CommonStyles.Container}>
            <CCustomTextInput
              mlabel="Email" mvalue={this.state.mcurEmail} monChangeText={(text) => this.setState({mcurEmail: text})}
            />                    

            <CCustomTextInput 
              mlabel="Password" mvalue={this.state.mcurPassword} monChangeText={(text) => this.setState({mcurPassword: text})}
              mstyle={{marginTop: 20}}
            />
            
            <Button 
              mode="contained" onPress={() => {FibAuthMgr.sfsignInWithEAP(this.state.mcurEmail, this.state.mcurPassword)}}
              style={[CommonStyles.Button, {width: "60%", marginTop: 20}]}
            >
              SignIn With EAP
            </Button>          
          </View>        

          <View style={{width: "90%", flexDirection: "row", paddingVertical: 30, alignItems: "center"}}>
            <View style={{height: 2, flex: 50, backgroundColor: Colors.grey300}} />

            <Text style={{color: "rgba(1, 1, 1, 0.5)", marginHorizontal: 10}}>OR</Text>
            
            <View style={{height: 2, flex: 50, backgroundColor: Colors.grey300}} />
          </View>        

          <Button 
            mode="contained" onPress={async () => { await FibAuthMgr.sfsignInAnon(); }} style={[CommonStyles.Button, {width: "60%"}]}
          >
            Signin Anonymously
          </Button>                         

          <View style={{height: 50}} />     

          <Text>Dont have an account already?</Text>

          <View style={{height: 5}} />

          <NavigationContext.Consumer>
            {(navigation) => {
              return(
                <Button 
                  mode="contained" onPress={() => navigation?.navigate("Register Page")}
                  style={[CommonStyles.Button, {width: "60%"}]}
                >
                  Register
                </Button>
              );
            }}
          </NavigationContext.Consumer>
        </View>
      </View>
    );
  }
}