import React from "react";
import { View } from "react-native";
import {Button, TextInput} from "react-native-paper";
import {NavigationContext} from "@react-navigation/native";
import FibAuthMgr from "../../Firebase/FibAuthMgr";

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
      <View style={{flex: 1, paddingHorizontal: 20, justifyContent: "center", alignItems: "center"}}> 
        <View style={{width: "100%", height: 300}}>
          <TextInput 
            mode="outlined" label="Email" 
            onChangeText={(text) => this.setState({mcurEmail: text})}
            value={this.state.mcurEmail}
          />
          
          <TextInput 
            mode="outlined" label="Password"
            onChangeText={(text) => this.setState({mcurPassword: text})}
            value={this.state.mcurPassword}
            style={{marginTop: 20}}
          />
          
          <Button 
            mode="contained"
            onPress={() => {FibAuthMgr.sfsignInWithEAP(this.state.mcurEmail, this.state.mcurPassword)}}
            style={{marginTop: 20}}
          >
            SignIn With EAP
          </Button>

          <NavigationContext.Consumer>
            {(navigation) => {
              return(
                <Button
                  mode="contained"
                  onPress={() => navigation?.navigate("Register Page")}
                  style={{marginTop: 20}}
                >
                  Register
                </Button>
              );
            }}
          </NavigationContext.Consumer>
        </View>
        
        <View 
          style={{
            width: "100%", justifyContent: "center", alignItems: "center"
          }}
        >
          <Button
            style={{width: "80%"}}             
            mode="contained"
            onPress={async () => {await FibAuthMgr.sfsignInAnon();}}
          >
            Login Anonymously
          </Button>
        </View>
      </View>
    );
  }
}