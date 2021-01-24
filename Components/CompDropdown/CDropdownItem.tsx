import React from 'react';
import { Button, Divider, Menu, Text } from 'react-native-paper';
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
          onPress={this.props.monPress} color="grey"
          style={{
            width: "100%", maxWidth: "100%", backgroundColor: "#EEEEEE", borderRadius: 0,
            justifyContent: "flex-start", alignItems: "flex-start"
          }}
        >
          <Text style={{flex: 1}}>{this.props.mtitle}</Text>
        </Button>                
      </>
    );
  }
}