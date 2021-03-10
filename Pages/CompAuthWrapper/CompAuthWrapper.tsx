import React from "react";
import CObservableBuilder from "../../Components/CObservableBuilder/CObservableBuilder";
import FibAuthMgr from "../../Firebase/FibAuthMgr";
import User from "../../Models/User";
import CompAuthNavWrapper from "../CompAuthNavWrapper/CompAuthNavWrapper";
import CompLoggedIn from "../CompLoggedIn/CompLoggedIn";

export class CompAuthWrapper extends React.Component {
  public render(): React.ReactNode {
    return(
      <CObservableBuilder<User | undefined> 
        minitialValue={undefined}
        mobservable={FibAuthMgr.sfgetUsersObservable()}
        mbuilder={(value) => {
          if(value == undefined)
            return(<CompAuthNavWrapper />);
          
          return(<CompLoggedIn />);
        }}
      />
    );
  }
}