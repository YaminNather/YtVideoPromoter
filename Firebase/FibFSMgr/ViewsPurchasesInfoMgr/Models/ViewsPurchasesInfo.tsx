import Firebase from "firebase";
import "firebase/firestore";

type QuerySnapshot = Firebase.firestore.QuerySnapshot;
type DocumentSnapshot = Firebase.firestore.DocumentSnapshot;

export default class ViewsPurchaseInfos {
  constructor(snapshot: DocumentSnapshot) {
    this.mviews = new Map<number, ViewPurchaseInfo>();
    const views: any = snapshot.get("Views");
    views.forEach(
      (element: any) => { 
        const views: number = element.Views;
        const amount: number = element.Amount;

        this.mviews.set(views, new ViewPurchaseInfo(views, amount)); 
      }
    );

    this.mdurations = new Map<number, DurationPurchaseInfo>();
    const durations: any = snapshot.get("Durations");
    durations.forEach(
      (element: any) => { 
        const duration: number = element.Duration;
        const amount: number = element.Amount;
        const reward: number = element.Reward;

        this.mdurations.set(duration, new DurationPurchaseInfo(duration, amount, reward)); 
      }
    );
  }

  public fgetViews(): Map<number, ViewPurchaseInfo> { 
    const r: Map<number, ViewPurchaseInfo> = new Map<number, ViewPurchaseInfo>();
    
    this.mviews.forEach(
      (value, key) => { r.set(key, Object.assign({}, value)); }
    );

    return r;
  }

  public fgetDurations(): Map<number, DurationPurchaseInfo> {
    const r: Map<number, DurationPurchaseInfo> = new Map<number, DurationPurchaseInfo>();
    
    this.mdurations.forEach(
      (value, key) => { r.set(key, Object.assign({}, value)); }
    );
     
    return r; 
  }

  // #region Variables
  private mviews: Map<number, ViewPurchaseInfo>;
  private mdurations: Map<number, DurationPurchaseInfo>;  
  // #endregion
}

class ViewPurchaseInfo {
  public constructor(mviews: number, mamount: number) {
    this.mviews = mviews;
    this.mamount = mamount;
  }

  public mviews: number;
  public mamount: number;  
}

class DurationPurchaseInfo {
  public constructor(mduration: number, mamount: number, mreward: number) {
    this.mduration = mduration;
    this.mamount = mamount;
    this.mreward = mreward;
  }

  public mduration: number;
  public mamount: number;
  public mreward: number;
}