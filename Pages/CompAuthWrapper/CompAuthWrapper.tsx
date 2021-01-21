import React from "react";
import FibAuthMgr from "../../Firebase/FibAuthMgr";
import User from "../../Models/User";
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
      console.log(`CustomLog:CompAuthWrapper rendering the CompSignInPage`);
      return(
        <CompSignInPage />        
      );
    }

    console.log(`CustomLog:CompAuthWrapper rendering the CompLoggedIn`);
    return(  
      <CompLoggedIn />
    );
  }

  public componentWillUnmount(): void {
    console.log("CustomLog:CompAuthWrapper unmounting");
  }
}