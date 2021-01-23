import React from "react";
import {Menu, Button} from "react-native-paper";

class State {
  public misOpen: boolean = false;
}

interface Props {
  mlabel: string;  
}

export class ContextData {
  public fopenOrClose?: (value: boolean)=>void;
}

export default class CompDropdown extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = new State();
  }

  public render(): React.ReactNode {
    const contextData: ContextData = new ContextData();
    contextData.fopenOrClose = (value) => this.setState({misOpen: value});

    return(
      <Menu
        visible={this.state.misOpen} onDismiss={() => this.setState({misOpen: false})}
        anchor={<Button onPress={() => this.setState({misOpen: true})}>
          {this.props.mlabel}
        </Button>}
      >
        <CompDropdown.sfcontext.Provider value={contextData}>
          {this.props.children}
        </CompDropdown.sfcontext.Provider>
      </Menu>      
    );
  }    

  public static sfcontext: React.Context<ContextData> = React.createContext(new ContextData()); 
}