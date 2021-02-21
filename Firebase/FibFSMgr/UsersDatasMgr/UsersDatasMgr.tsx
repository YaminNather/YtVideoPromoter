import FibFSMgr from "../FibFSMgr";
import Firebase from "firebase";
import "firebase/firestore";
import UserData from "../../../Models/UserData";
import { MapperStream, ReadableStream, Stream, StreamUpdater } from "../../../Stream/Stream";

type Query = Firebase.firestore.Query;
type QuerySnapshot = Firebase.firestore.QuerySnapshot;

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

  public static sfgetUserDataStream(userId: string): Stream<UserData | undefined> {
    const query: Query | undefined = FibFSMgr.sfgetFS()?.collection("Users_Datas").where("User_Id", "==", userId);
    
    const streamUpdater: StreamUpdater<QuerySnapshot> = new StreamUpdater<QuerySnapshot>();
    const querySnapshotStream: ReadableStream<QuerySnapshot> = new ReadableStream<QuerySnapshot>(
      streamUpdater, () => unsubscriber()
    );
    
    const r: MapperStream<UserData | undefined, QuerySnapshot> = 
    new MapperStream<UserData | undefined, QuerySnapshot>(
      querySnapshotStream, (value) => UserData.fbuildFromDocumentSnapshot(value.docs[0]), 
      () => querySnapshotStream.fdispose() 
    );

    const unsubscriber: ()=>void = query?.onSnapshot({ next: (value) => streamUpdater.fpush(value) }) as ()=>void;

    return(r);
  }
}