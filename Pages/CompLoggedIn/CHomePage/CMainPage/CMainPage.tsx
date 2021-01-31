import React from 'react';
import {BottomNavigation} from "react-native-paper";
import CompVideoPage from './CompVideoPage/CompVideoPage';
import CompUserInfoPage from "./CompUserInfoPage/CompUserInfoPage";

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
      { key: "UserInfo", title: "User Info", icon: "home"},
      { key: "Promote", title: "Promote", icon: "play"}
    ];

    return (
      <BottomNavigation
        navigationState={{ index: this.state.mcurIndex, routes }}
        renderScene={this.renderScene}
        shifting={true}
        onIndexChange={(index: number) => {
          console.log("Index Changed");
          this.setState((prevState, props) => { return { mcurIndex: index }; });
        }}
      />
    );
  }

  readonly renderScene = BottomNavigation.SceneMap(
    {
      "UserInfo": () => <CompUserInfoPage />,
      "Promote": () => <CompVideoPage />
    }
  );
}