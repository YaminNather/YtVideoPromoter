import Firebase from "firebase";
import "firebase/firestore";

type QuerySnapshot = Firebase.firestore.QuerySnapshot;
type DocumentSnapshot = Firebase.firestore.DocumentSnapshot;

export default class ViewsPurchasesInfo {
  constructor(snapshot: DocumentSnapshot) {
    this.mviews = new Map<number, number>();
    snapshot.get("Views").forEach(
      (element: any) => this.mviews.set(element.Views, element.Amount)    
    );

    this.mdurations = new Map<number, number>();
    snapshot.get("Durations").foreach(
      (element: any) => this.mdurations.set(element.Time, element.Amount)
    );
  }

  private mviews: Map<number, number>;
  private mdurations: Map<number, number>;  
}