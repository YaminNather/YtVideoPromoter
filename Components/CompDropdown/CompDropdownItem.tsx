import React from "react";
import {Menu} from "react-native-paper"
import CompDropdown from "./CompDropdown";
// import {}

interface CompDropdownItemProps {
  mtitle: string;
  monPress?: ()=>void;
}

export default class CompDropdownItem extends React.Component<CompDropdownItemProps> {
  public render(): React.ReactNode {
    return(
      <CompDropdown.sfcontext.Consumer>
        {(contextValue) => {
          return(
            <Menu.Item 
              title={this.props.mtitle} 
              onPress={() => {
                if(this.props.monPress != undefined)
                  this.props.monPress();
                (contextValue.fopenOrClose as (value: boolean)=>void)(false);              
              }}
            />
          );
        }}
      </CompDropdown.sfcontext.Consumer>          
    );
  }
}