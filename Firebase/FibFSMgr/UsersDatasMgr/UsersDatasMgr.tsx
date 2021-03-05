import FibFSMgr from "../FibFSMgr";
import Firebase from "firebase";
import "firebase/firestore";
import UserData from "../../../Models/UserData";
import { MapperStream, ReadableStream, Stream, StreamUpdater } from "../../../Stream/Stream";
import { Observable } from "rxjs";

type CollectionReference = Firebase.firestore.CollectionReference;
type Query = Firebase.firestore.Query;
type QuerySnapshot = Firebase.firestore.QuerySnapshot;
type DocumentReference = Firebase.firestore.DocumentReference;
type DocumentSnapshot = Firebase.firestore.DocumentSnapshot;

export default class UsersDatasMgr {
  public static sflistenToUserData(userId: string, processor: (userData: UserData)=>void): (()=>void) | undefined {
    const query: Query | undefined = FibFSMgr.sfgetFS()?.collection("Users_Datas").where("User_Id", "==", userId);
    
    const unsubscriber: (()=>void) | undefined = query?.onSnapshot(
      {
        next: (querySnapshot) => {
          const userData: UserData = UserData.fbuildFromDocumentSnapshot(querySnapshot.docs[0]);
          processor(userData);
        }         
      }
    );

    return unsubscriber;
  }

  public static async sfaddUserData(userId: string): Promise<void> {
    const value: {User_Id: string, Coins: number} = {User_Id: userId, Coins: 100}; 
    
    await UsersDatasMgr.sfgetColtnRef().doc(userId).set(value);
  }

  public static async sfupdateUserData(userId: string, coins: number | undefined): Promise<void> {
    const docRef: DocumentReference = UsersDatasMgr.sfgetColtnRef().doc(userId);
    const docSnapshot: DocumentSnapshot = await docRef.get();

    if(!docSnapshot.exists)
      return;

    const prevData: any = docSnapshot.data();

    if(coins != undefined)
      prevData.Coins = coins;
      
    await docRef.update(prevData);
  }

  public static async sfgetUserData(uId: string): Promise<UserData | undefined> {
    const snapshot: DocumentSnapshot = await UsersDatasMgr.sfgetColtnRef().doc(uId).get();

    return(UserData.fbuildFromDocumentSnapshot(snapshot));
  }

  public static sfgetUserDataObservable(userId: string): Observable<UserData | undefined> {
    const query: Query | undefined = UsersDatasMgr.sfgetColtnRef().where("User_Id", "==", userId);

    const r: Observable<UserData | undefined> = new Observable<UserData | undefined>(
      (subscriber) => {
        const unsubber: (()=>void) | undefined = query?.onSnapshot(
          {
            next: (snapshot) => subscriber.next(UserData.fbuildFromDocumentSnapshot(snapshot.docs[0])),
            error: (err) => {}, complete: () => {}
          }
        );
        return(() => unsubber?.());
      }
    );

    return(r);
  }

  private static sfgetColtnRef(): CollectionReference {
    return FibFSMgr.sfgetFS()?.collection("Users_Datas") as CollectionReference;
  }
}