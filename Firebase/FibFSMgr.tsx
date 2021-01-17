import Firebase from "firebase";
import "firebase/firestore";

type Firestore = Firebase.firestore.Firestore;
type DocumentData = Firebase.firestore.DocumentData;
type CollectionReference = Firebase.firestore.CollectionReference<DocumentData>;
type QuerySnapshot = Firebase.firestore.QuerySnapshot<DocumentData>;
type Query = Firebase.firestore.Query<DocumentData>;

export default class FibFSMgr {
  public static sfgetFS(): Firestore | undefined {
    if(Firebase.auth() == undefined)
      return undefined;

    const r: Firestore | undefined = Firebase.firestore();    

    console.log(`app?.firestore = ${r}`);
    return r;
  }

  public static async sfgetAllVideoIds(userId: string = "", excludeUserId: string = ""): Promise<string[]> {
    const r: string[] = [];

    let query: Query | undefined = 
      FibFSMgr.sfgetFS()?.collection("Video_Ids");  
      
    console.log(`Video_Ids collection ref = ${query}`);          

    if(userId != "")
      query = query?.where("User_Id", "==", userId);
    else if(excludeUserId != "") {
      query = query?.where("User_Id", "!=", excludeUserId);
    }    

    const querySnapshot: QuerySnapshot | undefined = await query?.get();

    console.log(`QuerySnapshot = ${querySnapshot}`);

    querySnapshot?.forEach(
      (documentData) => {
        const videoId: string = documentData.get("Video_Id");
        console.log(`Video_Id = ${videoId}`);
        r.push(videoId);      
      }
    );

    return r;
  }
}