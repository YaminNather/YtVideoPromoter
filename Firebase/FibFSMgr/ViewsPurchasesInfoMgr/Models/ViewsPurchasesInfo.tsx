import Firebase from "firebase";
import "firebase/firestore";

type QuerySnapshot = Firebase.firestore.QuerySnapshot;
type DocumentSnapshot = Firebase.firestore.DocumentSnapshot;

export default class ViewsPurchasesInfo {
  constructor(snapshot: DocumentSnapshot) {
    this.mviews = new Map<number, number>();
    const views: any =  snapshot.get("Views");
    views.forEach(
      (element: any) => this.mviews.set(element.Views, element.Amount)    
    );

    this.mdurations = new Map<number, number>();
    const durations: any = snapshot.get("Durations");
    durations.forEach(
      (element: any) => this.mdurations.set(element.Duration, element.Amount)
    );
  }

  public fgetViews(): Map<number, number> { 
    const r: Map<number, number> = new Map<number, number>();
    this.mviews.forEach(
      (value, key) => r.set(key, value)
    );

    return r; 
  }

  public fgetDurations(): Map<number, number> {
    const r: Map<number, number> = new Map<number, number>();
    this.mdurations.forEach(
      (value, key) => r.set(key, value)
    );
     
    return r; 
  }

  // #region Variables
  private mviews: Map<number, number>;
  private mdurations: Map<number, number>;  
  // #endregion
}