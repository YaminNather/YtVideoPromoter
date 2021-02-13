import FibFSMgr from "../FibFSMgr";
import Firebase from "firebase";
import "firebase/firestore";
import UserData from "../../../Models/UserData";

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
}