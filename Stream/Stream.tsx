import { render } from "react-dom";

export interface IStream<T> {
  fsubscribe(subscriber: (value: T)=>void): void;
  funsubscribe(subscriber: (value: T)=>void):void;
  fgetLastValue(): T | undefined;
  fdispose(): void;
}

export class Stream<T> implements IStream<T> {  
  constructor(mdispose: (()=>void) | undefined) {
    this.mdispose = mdispose;

    this.fpush = this.fpush.bind(this);
  }

  public fsubscribe(subscriber: (value: T)=>void): void {
    this.msubscribers.push(subscriber);
    
    if(this.mlastValue != undefined)
    subscriber(this.mlastValue);
  }
  
  protected fpush(value: T): void {
    this.msubscribers.forEach(
      (element) => element(value)
    );
    
    this.mlastValue = value;    
  }

  public funsubscribe(subscriber: (value: T)=>void): void {
    if(this.msubscribers.includes(subscriber)) {
      const index: number = this.msubscribers.indexOf(subscriber);

      this.msubscribers.splice(index, 1);
    }
  }

  public fdispose(): void {
    if(this.mdispose != undefined)
      this.mdispose();
  }

  public fgetLastValue(): T | undefined { return(this.mlastValue);}
  
  //#region Variables
  protected mlastValue: T | undefined;
  protected msubscribers: ((value: T)=>void)[] = [];
  private mdispose: (()=>void) | undefined;
  //#endregion
}

export class StreamUpdater<T> {
  public fsetStreamPushFunc(pushFunc: (value: T)=>void): void {
    this.mstreamPushFunc = pushFunc;
  }

  public fpush(value: T): void {
    if(this.mstreamPushFunc != undefined)
      this.mstreamPushFunc(value);
  }

  public fremoveStreamPushFunc(): void {
    this.mstreamPushFunc = undefined;
  }

  public fdispose(): void {
    this.fremoveStreamPushFunc();
  }


  //#region Variables
  private mstreamPushFunc: ((value: T)=>void) | undefined;
  //#endregion
}

export default class WriteableStream<T> extends Stream<T> {
  constructor(mdispose: (()=>void) | undefined) {
    super(mdispose);
  }

  public fpush(value: T): void {
    super.fpush(value);
  }
}

export class ReadableStream<T> extends Stream<T> {
  constructor(mstreamUpdater: StreamUpdater<T>, mdispose: (()=>void) | undefined) {
    super(mdispose);

    this.fpush = this.fpush.bind(this);
    
    this.mstreamUpdater = mstreamUpdater;
    this.mstreamUpdater.fsetStreamPushFunc(this.fpush);
  }

  public fdispose() {
    super.fdispose();    
    this.mstreamUpdater.fremoveStreamPushFunc();
  }

  //#region Variables
  protected mstreamUpdater: StreamUpdater<T>;
  //#endregion
}

export class MapperStream<Tto, Tfrom> extends Stream<Tto> {
  constructor(mfromStream: Stream<Tfrom>, mmapper: (value: Tfrom)=>Tto, mdispose: (()=>void) | undefined) {
    super(mdispose);

    this.fpush = this.fpush.bind(this);
    this.fsubscriberToFromStream = this.fsubscriberToFromStream.bind(this);

    this.mfromStream = mfromStream;
    this.mmapper = mmapper;

    this.mfromStream.fsubscribe(this.fsubscriberToFromStream);
  }

  fsubscriberToFromStream(value: Tfrom): void {
    super.fpush(this.mmapper(value));
  }

  public fdispose() {
    super.fdispose();

    this.mfromStream.funsubscribe(this.fsubscriberToFromStream);    
  }

  //#region Variables
  private mfromStream: Stream<Tfrom>;
  private mmapper: (value: Tfrom)=>Tto;
  //#endregion
}