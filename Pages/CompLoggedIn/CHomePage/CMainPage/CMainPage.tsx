import React from 'react';
import { BottomNavigation, Drawer} from "react-native-paper";
import CompVideoPage from './CompVideoPage/CompVideoPage';
import CompUserInfoPage from "./CompUserInfoPage/CompUserInfoPage";
import CBuyCoinsPage from './CBuyCoinsPage/CBuyCoinsPage';

class State {
  constructor(mcurIndex: number = 0) {
    this.mcurIndex = mcurIndex;
  }

  public mcurIndex: number;
}

export class CMainPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = new State(0);
  }

  public render(): React.ReactNode {
    const routes = [
      {key: "User Info", title: "User Info", icon: "home"}, {key: "Promote", title: "Promote", icon: "play"},
      {key: "Buy Coins", title: "Buy Coins", icon: "bitcoin"}
    ];
    const renderScene = BottomNavigation.SceneMap(
      {
        "User Info": () => <CompUserInfoPage />, "Promote": () => <CompVideoPage />, "Buy Coins": () => <CBuyCoinsPage />
      }
    );
    
    return (      
      <BottomNavigation
        navigationState={{ index: this.state.mcurIndex, routes }} renderScene={renderScene} shifting={true}
        onIndexChange={(index: number) => {
          console.log(`Main Page current tab: ${this.state.mcurIndex}`);
          this.setState( {mcurIndex: index} );
        }}
      /> 
    );
  }
}