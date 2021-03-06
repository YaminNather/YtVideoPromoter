import { Observable } from "rxjs";
import Firebase from "firebase";
import "firebase/firestore";
import FibFSMgr from "../FibFSMgr";
import ViewsPurchaseInfos from "./Models/ViewsPurchasesInfo";

type CollectionReference = Firebase.firestore.CollectionReference;
type DocumentReference = Firebase.firestore.DocumentReference;

export default class ViewsPurchaseInfosMgr {
  public static sfgetViewsPurchasesInfoObservable(): Observable<ViewsPurchaseInfos> {
    const docRef: DocumentReference | undefined = FibFSMgr.sfgetFS()?.collection("Common_Datas").doc("Views_Purchases_Infos");
    
    const r: Observable<ViewsPurchaseInfos> = new Observable(
      (subscriber) => {
        const unsubscriber: (()=>void) | undefined = docRef?.onSnapshot(
          { next: (snapshot) => subscriber.next(new ViewsPurchaseInfos(snapshot)) }          
        );

        return(() => unsubscriber?.());
      }
    );

    return(r);
  }
}