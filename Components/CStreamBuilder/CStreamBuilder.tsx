import React from "react";
import * as ObservableNS from "rxjs";
import {Observable} from "rxjs";
import WriteableStream, {IStream, Stream} from "../../Stream/Stream";

interface Props<T> {
  mstreamCreator: ()=>Stream<T>;
  minitialValue: T;
  mbuilder: (value: T)=>React.ReactElement;
}

class State<T> {
  constructor(initialValue: T) {
    this.mcurValue = initialValue;
  }

  mcurValue: T;
}

export default class CStreamBuilder<T> extends React.Component<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props);

    this.mstream = this.props.mstreamCreator();
    const streamLastValue: T | undefined = this.mstream.fgetLastValue();
    if(streamLastValue == undefined)
      this.state = new State(this.props.minitialValue);
    else
      this.state = new State(streamLastValue);
  }
  
  componentDidMount(): void {
    this.mstream.fsubscribe(this.fsubscriberFunction);
  }

  render(): React.ReactElement {
    return(this.props.mbuilder(this.state.mcurValue));    
  }

  fsubscriberFunction: (value: T)=>void = (value) => {
    this.setState({mcurValue: value});
  }

  componentWillUnmount(): void {
    this.mstream.funsubscribe(this.fsubscriberFunction);
    this.mstream.fdispose();
  }
 
  //#region Variables
  private mstream: Stream<T>;
  //#endregion
}