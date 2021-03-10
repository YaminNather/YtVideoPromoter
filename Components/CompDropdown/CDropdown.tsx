import React from "react";
import {View, StyleProp, ViewStyle, TextStyle, Dimensions} from "react-native";
import { withTheme } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import CDropdownBox from "./CDropdownBox";
import CDropdownValues from "./CDropdownValues";

export class ItemData<T = any> {
  constructor(mvalue: T, mtitle: string, monPress?: ()=>void) {
    this.mvalue = mvalue;
    this.mtitle = mtitle;
    this.monPress = monPress;
  }

  //#region Variables
  public mvalue: T;
  public mtitle: string = "";
  public monPress?: ()=>void = undefined;
  //#endregion
}

class State {
  constructor(mcurIndex = -1) {
    this.mcurIndex = mcurIndex;
  }

  //#region Variables
  misOpen: boolean = false;
  mcurIndex: number = -1;
  mvaluesOffsetY: number = 0;
  //#endregion
}

interface Props<T> {
  mheading: string;
  mitemsDatas: ItemData<T>[];  
  mvalue: T | undefined;
  monChange?: (value: T)=>void;  
  mcontainerStyle?: StyleProp<ViewStyle>;
  mheadingStyle?: StyleProp<ViewStyle>;
  mboxStyle?: StyleProp<ViewStyle>;  
}

export default class CDropdown<T = any> extends React.Component<Props<T>, State> {
  constructor(props: Props<T>) {
    super(props);
    
    let mcurIndex = -1;
    if(props.mvalue != undefined) {
      for(let i: number = 0; i < props.mitemsDatas.length; i++) {
        if(props.mitemsDatas[i].mvalue == props.mvalue) {
          mcurIndex = i;
          break;
        }      
      }
      
    }    
    
    this.state = new State(mcurIndex);
  }

  public render(): React.ReactNode {
    const containerDefStyle: StyleProp<ViewStyle> = {flex: 1, flexDirection: "row"};        
    const headingDefStyle: StyleProp<TextStyle> = {marginTop: 10, fontWeight: "bold", fontSize: 15};

    return(
      <View style={[containerDefStyle, this.props.mcontainerStyle]}>        
        <View style={{flex: 1}}>
          <CDropdownBox 
            mheading={this.props.mheading} misOpen={this.state.misOpen} mopen={this.fopen} 
            mtitle={(this.state.mcurIndex != -1) ? this.props.mitemsDatas[this.state.mcurIndex].mtitle : "-"} 
            mstyle={this.props.mboxStyle}
          />        

          <View>
            {(this.state.misOpen) ?
              <CDropdownValues moffsetY={this.state.mvaluesOffsetY}
                mitemsDatas={this.props.mitemsDatas} mclose={this.fclose}
                monChange={this.props.monChange} msetCurIndex={this.fsetCurIndex}   
              /> :
              undefined}
          </View>                    
        </View>
      </View>
    );
  }

  private fopen: (touchPos: [number, number])=>void = (touchPos) => {
    const valuesOffsetY: number = this.ffindValuesOffsetY(touchPos);
    this.setState({misOpen: true, mvaluesOffsetY: valuesOffsetY});
  };

  private fclose: ()=>void = () => this.setState({misOpen: false});
  
  private fsetCurIndex: (index: number)=>void = (index) => this.setState({mcurIndex : index});  

  private ffindValuesOffsetY: (touchPos: [number, number])=>number = (touchPos) => {
    const windowHeight = Dimensions.get("window").height;
    
    const dropdownItemHeight: number = 40;
    const lowerEndPos: number = (windowHeight - touchPos[1]) + (dropdownItemHeight * this.props.mitemsDatas.length);
    
    let r: number = 0;
    if(lowerEndPos > windowHeight)
      r = windowHeight - lowerEndPos;

    // console.log(`touchPosY=${touchPos[1]}, LowerEndPos=${lowerEndPos}, window height=${windowHeight}, Values OffsetY=${r}`);
    return r;
  };
}