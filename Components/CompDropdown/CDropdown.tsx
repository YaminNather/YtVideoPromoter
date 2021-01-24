import React from "react";
import {Animated, StyleSheet, View, StyleProp} from "react-native";
import {Text, Button, IconButton, Menu} from "react-native-paper";
import Icon from "react-native-paper/lib/typescript/components/Icon";
import CDropdownItem from "./CDropdownItem";

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
  mstyle?: any;
}

class ContextData {
  
}

export default class CDropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = new State();
  }

  public render(): React.ReactNode {
    return(
      <View style={{padding: 10, flexDirection: "row", ...this.props.mstyle}}>
        <Text style={{marginTop: 10, fontWeight: "bold", fontSize: 20}}>{this.props.mheading}</Text>        
        
        <View style={{width: 10}} />

        <View style={{flex: 1}}>
          {this.fbuildDropdownBox()}        

          <View>
            {(this.state.misOpen) ? 
              <View style={{
                  width: "100%", zIndex: 1, borderWidth: 1,
                  borderColor: "grey", position: "absolute"
                }}
              >
                {this.fbuildDropdownItems()}
              </View> : 
              undefined}
          </View>                    
        </View>
      </View>
    );
  }

  private fbuildDropdownBox(): React.ReactNode {
    const styleSheet = StyleSheet.create(
      {
        box: {               
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "grey",
          paddingHorizontal: 10,
          flexDirection: "row",          
          // justifyContent: "center",
          alignItems: "center"
        }
      }
    );

    return(
      <View style={styleSheet.box}
        onTouchStart={() => this.setState({misOpen: true})}
      >
        <Text>{this.props.mitemsDatas[this.state.mcurIndex].mtitle}</Text>
        
        <View style={{flex: 1}} />
        
        <IconButton icon={(!this.state.misOpen) ? "arrow-down-drop-circle-outline" : "arrow-up-drop-circle-outline"}/>                
      </View>      
    );
  }

  private fcloseDropdown: ()=>void = () => this.setState({misOpen: false});
  
  private fsetCurIndex: (index: number)=>void = (index) => this.setState({mcurIndex : index})

  private fbuildDropdownItems(): React.ReactNode {
    return(
      <>
        {this.props.mitemsDatas.map(
          (value, index, _) => {
            const lfonPress: ()=>void = () => {
              if(value.monPress != undefined) 
                value.monPress();
              if(this.props.monChange != undefined)
                this.props.monChange(value.mvalue);
              this.fsetCurIndex(index);
              this.fcloseDropdown();
            };

            return(
              <CDropdownItem key={index} mtitle={value.mtitle} mindex={index} monPress={lfonPress} />
            );
          }
        )}
      </>
    );
  }  
}