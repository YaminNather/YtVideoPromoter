import React from "react";
import FibAuthMgr from "../../Firebase/FibAuthMgr";
import User from "../../Models/User";
import CompAuthNavWrapper from "../CompAuthNavWrapper/CompAuthNavWrapper";
import CompLoggedIn from "../CompLoggedIn/CompLoggedIn";
import CompSignInPage from "../CompSignInPage/CompSignInPage";

class State {
  public muser?: User = undefined;
} 

export class CompAuthWrapper extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = new State();
  }

  public componentDidMount(): void {
    FibAuthMgr.sfonAuthChanged(
      (user) => {
        console.log(`CustomLog:Auth State Changed, User = ${user}`);
        this.setState({muser: user});
      }
    );
  }

  public render(): React.ReactNode {
    if(this.state.muser == undefined) {
      return(
        <CompAuthNavWrapper />        
      );
    }

    return(  
      <CompLoggedIn />
    );
  }

  public componentWillUnmount(): void {
    console.log("CustomLog:CompAuthWrapper unmounting");
  }
}