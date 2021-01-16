import Firebase from "firebase";
import "firebase/firestore";

type Firestore = Firebase.firestore.Firestore;
type DocumentData = Firebase.firestore.DocumentData;
type CollectionReference = Firebase.firestore.CollectionReference<DocumentData>;
type QuerySnapshot = Firebase.firestore.QuerySnapshot<DocumentData>;

export default class FibFSMgr {
  public static sfgetFS(): Firestore | undefined {
    if(Firebase.auth() == undefined)
      return undefined;

    const r: Firestore | undefined = Firebase.firestore();    

    console.log(`app?.firestore = ${r}`);
    return r;
  }

  public static async sfgetAllVideoIds(excludeUserIds: string[] = []): Promise<string[]> {
    const r: string[] = [];

    const videoIdCollectionRef: CollectionReference | undefined = 
      FibFSMgr.sfgetFS()?.collection("Video_Ids");  
      
    console.log(`Video_Ids collection ref = ${videoIdCollectionRef}`);    
    
    const querySnapshot: QuerySnapshot | undefined = await videoIdCollectionRef?.get();

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