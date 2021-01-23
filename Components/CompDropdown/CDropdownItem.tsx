import React from 'react';
import { Menu } from 'react-native-paper';
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
        <Menu.Item style={{width: "100%"}}
          title={this.props.mtitle} onPress={this.props.monPress}
        />
      </>
    );
  }
}