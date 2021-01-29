import React from "react";
import {View, StyleProp, ViewStyle, TextStyle, Dimensions} from "react-native";
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
  misOpen: boolean = false;
  mcurIndex: number = -1;
  mvaluesOffsetY: number = 0;
}

interface Props<T> {
  mitemsDatas: ItemData<T>[];  
  mheading: string;
  monChange?: (value: T)=>void;  
  mcontainerStyle?: StyleProp<ViewStyle>;
  mheadingStyle?: StyleProp<ViewStyle>;
  mboxStyle?: StyleProp<ViewStyle>;
}

export default class CDropdown<T = any> extends React.Component<Props<T>, State> {
  constructor(props: Props<T>) {
    super(props);

    this.state = new State();
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