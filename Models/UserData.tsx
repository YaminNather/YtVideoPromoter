import Firebase from "firebase";
import "firebase/firestore";

type DocumentSnapshot = Firebase.firestore.DocumentSnapshot;

export default class UserData {

    public constructor(mcoins: number) {
        this.mcoins = mcoins;
    }

    public static fbuildFromDocumentSnapshot(docSnapshot: DocumentSnapshot): UserData {
        return( new UserData(docSnapshot.get("Coins")) );
    }

    
    public mcoins: number = 0;
}