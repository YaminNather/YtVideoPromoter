import React from "react";
import {Animated, StyleSheet, View, StyleProp, ViewStyle} from "react-native";
import {Text, Button, IconButton, Menu} from "react-native-paper";
import Icon from "react-native-paper/lib/typescript/components/Icon";
import CDropdownBox from "./CDropdownBox";
import CDropdownItem from "./CDropdownItem";
import CDropdownValues from "./CDropdownValues";

export class ItemData {
  constructor(mvalue: any, mtitle: string, monPress?: ()=>void) {
    this.mvalue = mvalue;
    this.mtitle = mtitle;
    this.monPress = monPress;
  }

  //#region Variables
  public mvalue: any;
  public mtitle: string = "";
  public monPress?: ()=>void = undefined;
  //#endregion
}

class State {
  misOpen: boolean = false;
  mcurIndex: number = 0;
}

interface Props {
  mitemsDatas: ItemData[];  
  mheading: string;
  monChange?: (value: any)=>void;
  mheadingStyle?: StyleProp<ViewStyle>;
  mboxStyle?: any;
}

export default class CDropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = new State();
  }

  public render(): React.ReactNode {
    return(
      <View style={{padding: 10, flexDirection: "row", ...this.props.mboxStyle}}>
        <Text style={{marginTop: 10, fontWeight: "bold", fontSize: 15}}>{this.props.mheading}</Text>        
        
        <View style={{width: 10}} />

        <View style={{flex: 1}}>
          <CDropdownBox 
            misOpen={this.state.misOpen} mtoggleOpen={this.ftoggleOpen} 
            mtitle={this.props.mitemsDatas[this.state.mcurIndex].mtitle}
          />        

          <View>
            {(this.state.misOpen) ? 
              <CDropdownValues 
                mitemsDatas={this.props.mitemsDatas} mtoggleIsOpen={this.ftoggleOpen}
                monChange={this.props.monChange} msetCurIndex={this.fsetCurIndex}   
              /> :
              undefined}
          </View>                    
        </View>
      </View>
    );
  }

  private ftoggleOpen: (value: boolean)=>void = (value) => this.setState({misOpen: value});
  
  private fsetCurIndex: (index: number)=>void = (index) => this.setState({mcurIndex : index})  
}