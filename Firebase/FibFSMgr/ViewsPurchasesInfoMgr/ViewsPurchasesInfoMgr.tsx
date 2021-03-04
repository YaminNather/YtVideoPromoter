import { Observable } from "rxjs";
import Firebase from "firebase";
import "firebase/firestore";
import FibFSMgr from "../FibFSMgr";
import ViewsPurchasesInfo from "./Models/ViewsPurchasesInfo";

type CollectionReference = Firebase.firestore.CollectionReference;

export default class ViewsPurchasesInfoMgr {
  static sfgetViewsPurchasesInfoObservable(): Observable<ViewsPurchasesInfo> {
    const collection: CollectionReference | undefined = FibFSMgr.sfgetFS()?.collection("Views_Purchases_Infos");
    
    const r: Observable<ViewsPurchasesInfo> = new Observable(
      (subscriber) => {
        const unsubscriber: (()=>void) | undefined = collection?.doc("Value").onSnapshot(
          { next: (snapshot) => subscriber.next(new ViewsPurchasesInfo(snapshot)) }          
        );

        return(() => unsubscriber?.());
      }
    );

    return(r);
  }
}