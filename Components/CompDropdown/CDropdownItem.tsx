import React from 'react';
import { Button, Divider, Menu } from 'react-native-paper';
import CDropdown from './CDropdown';

interface Props {
  mindex: number;
  mtitle: string;
  monPress?: ()=>void;
}

export default class CDropdownItem extends React.Component<Props> {
  public render(): React.ReactNode {
    return(
      <>
        <Button 
          mode="contained"  onPress={this.props.monPress} color="grey"
          style={{
            width: "100%", backgroundColor: "#EEEEEE", borderRadius: 0, 
            borderColor: "grey", borderBottomWidth: 1
          }}
        >
          {this.props.mtitle}
        </Button>                
      </>
    );
  }
}