import React from "react";
import { StyleProp, StyleSheet, View } from "react-native";
import {TextInput, Button} from "react-native-paper"; 
import FibAuthMgr from "../../Firebase/FibAuthMgr";

class State {
  public mcurEmail: string = "";
  public mcurPassword: string = "";
}

export default class CompRegisterPage extends React.Component<{}, State> {
  public constructor(props: {}) {
    super(props);

    this.state = new State();
  }

  public render(): React.ReactNode {
    const styleSheet = StyleSheet.create(
      {
        textInput: {width: "100%"}
      }
    );    
    
    return(
      <View 
        style={{
          width: "100%", flex: 1, paddingHorizontal: 20, justifyContent: "center", alignItems: "center"
        }}
      >
          <TextInput
            mode="outlined" label="Email" 
            value={this.state.mcurEmail}
            onChangeText={(text) => this.setState({mcurEmail: text})}
            style={styleSheet.textInput}
          />
          
          <TextInput 
            textContentType="password" mode="outlined" label="Password"
            value={this.state.mcurPassword}
            onChangeText={(text) => this.setState({mcurPassword: text})}
            style={{...styleSheet.textInput, ...{marginTop: 20}}}
          />
          
          <Button 
            mode="contained" style={{marginTop: 20}}
            onPress={() => {              
              const curEmail = this.state.mcurEmail;
              const curPassword = this.state.mcurPassword;
              if(curEmail == "" || curPassword == "")
                return;

              FibAuthMgr.sfregisterWithEAP(curEmail, curPassword);
            }}
          >
            Register With EAP
          </Button>
        </View>
    );
  }  
}