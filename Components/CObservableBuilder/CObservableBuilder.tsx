import React from "react";
import { Observable, Subscription } from "rxjs";

interface Props<T> {
  minitialValue: T;
  mobservable: Observable<T>;
  mbuilder: (value: T)=>React.ReactElement;
}

class State<T> {
  constructor(mcurValue: T) {
    this.mcurValue = mcurValue;
  }

  public mcurValue: T;
}

export default class CObservableBuilder<T> extends React.Component<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props);

    this.state = new State<T>(this.props.minitialValue);

    this.msubscription = this.props.mobservable.subscribe( (value) => this.setState({mcurValue: value}) );
  }  
  
  public render(): React.ReactElement {
    return(this.props.mbuilder(this.state.mcurValue));
  }

  public componentWillUnmount(): void {
    this.msubscription.unsubscribe();    
  }

  //#region Variables
  private msubscription: Subscription;
  //#endregion
}