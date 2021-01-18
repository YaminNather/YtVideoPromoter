import Firebase from "firebase";
import "firebase/firestore";
import VideoData from "../Models/VideoData";

//#region Type Aliases
type Firestore = Firebase.firestore.Firestore;
type DocumentData = Firebase.firestore.DocumentData;
type CollectionReference = Firebase.firestore.CollectionReference<DocumentData>;
type DocumentReference = Firebase.firestore.DocumentReference;
type QuerySnapshot = Firebase.firestore.QuerySnapshot<DocumentData>;
type Query = Firebase.firestore.Query<DocumentData>;
type QueryDocumentSnapshot = Firebase.firestore.QueryDocumentSnapshot;
//#endregion

export default class FibFSMgr {
  public static sfgetFS(): Firestore | undefined {
    if(Firebase.auth() == undefined)
      return undefined;

    const r: Firestore | undefined = Firebase.firestore();    

    // console.log(`app?.firestore = ${r}`);
    return r;
  }

  public static async sfgetAllVideoIds(userId: string = "", excludeUserId: string = ""): Promise<string[]> {
    const r: string[] = [];

    let query: Query | undefined = 
      FibFSMgr.sfgetFS()?.collection(FibFSMgr.smvideoDatasCollectionName);
      
    // console.log(`Video_Ids collection ref = ${query}`);          

    if(userId != "")
      query = query?.where("User_Id", "==", userId);
    else if(excludeUserId != "") {
      query = query?.where("User_Id", "!=", excludeUserId);
    }    

    const querySnapshot: QuerySnapshot | undefined = await query?.get();

    console.log(`QuerySnapshot = ${querySnapshot}`);

    querySnapshot?.forEach(
      (documentSnapshot) => {
        const videoId: string = documentSnapshot.get("Video_Id");
        console.log(`Video_Id = ${videoId}`);
        r.push(videoId);      
      }
    );

    return r;
  }

  public static async sfgetAllVideosDatas(userId: string = "", excludeUserId: string = ""): Promise<VideoData[]> {
    const r: VideoData[] = [];
    const collectionReference: CollectionReference | undefined = 
      FibFSMgr.sfgetFS()?.collection(FibFSMgr.smvideoDatasCollectionName);    

    let query: Query | undefined = collectionReference;
    if(userId != "")
      query = query?.where("User_Id", "==", userId);    
    else if(excludeUserId != "")
      query = query?.where("User_Id", "!=", excludeUserId);
      
    const querySnapshot: QuerySnapshot | undefined = await query?.get();

    const documentSnapshots: QueryDocumentSnapshot[] = [];
    querySnapshot?.forEach((documentSnapshot) => documentSnapshots.push(documentSnapshot));

    for(let i: number = 0; i < documentSnapshots.length; i++) {
      const documentSnapshot: QueryDocumentSnapshot = documentSnapshots[i];
      const videoData: VideoData = await VideoData.sfbuildFromDocumentSnapshot(documentSnapshot);
      console.log(`Current VideoData being pushed = ${videoData}`);
      r.push(videoData);
    }

    console.log("\nVideosDatas retrieved from Firestore:");
    for(let i: number = 0; i < r.length; i++) {
      console.log(`\tVideoData[${i}] = ${r}`);
    }

    return(r);
  }

  public static async sfduplicateCollection(curCollectionName: string, newCollectionName: string): Promise<boolean> {
    // function lfdocumentDataToObject(documentSnapshot: QueryDocumentSnapshot): any {
    //   let r: any;
    //   documentSnapshot.
    // }

    if(curCollectionName == newCollectionName || curCollectionName == "" || newCollectionName == "") {
      console.error("Theres something wrong with the names");
      return false;
    }
    try {
      const oldCollectionRef: CollectionReference | undefined = FibFSMgr.sfgetFS()?.collection(curCollectionName);
      const newCollectionRef: CollectionReference | undefined = FibFSMgr.sfgetFS()?.collection(newCollectionName);

      const querySnapshot: QuerySnapshot | undefined = await oldCollectionRef?.get();
      querySnapshot?.forEach(
        async (documentSnapshot) => {
          const curDocumentData: DocumentData = documentSnapshot.data(); 
          console.log(`DocumentData = ${Object.getOwnPropertyNames(curDocumentData)}`);         
          await newCollectionRef?.doc(documentSnapshot.id).set(curDocumentData);
        }
      );      
      console.log("Done Copying");
    }
    catch(error) {
      console.error("Error while trying to copy");
      return false;
    }

    return true;
  }

  public static sflistenToVideoDatasCollection(func: (videosDatas: VideoData[])=>void, 
    userId: string = "", excludeUserId: string = ""): ()=>void {
    let query: Query | undefined = 
      FibFSMgr.sfgetFS()?.collection(FibFSMgr.smvideoDatasCollectionName);

    if(userId != "")
      query = query?.where("User_Id", "==", userId);    
    else if(excludeUserId != "")
      query = query?.where("User_Id", "!=", excludeUserId);
    
    return (
      query?.onSnapshot(
        {
          next: async (querySnapshot) => {
            const videosDatas = await FibFSMgr.sfconvertVideosDatasCollectionToModel(querySnapshot);
            func(videosDatas);
          }
        }
      ) as ()=>void
    );
  }  

  private static async sfconvertVideosDatasCollectionToModel(querySnapshot: QuerySnapshot): Promise<VideoData[]> {
    const r: VideoData[] = [];
    for(const documentSnapshot of querySnapshot.docs) {      
      const videoData: VideoData = await VideoData.sfbuildFromDocumentSnapshot(documentSnapshot);
      r.push(videoData);
    }

    return(r);
  }

  public static async sfupdateVideoData(videoData: VideoData): Promise<void> {
    const collectionReference: CollectionReference | undefined = 
      FibFSMgr.sfgetFS()?.collection(FibFSMgr.smvideoDatasCollectionName);
    const documentReference: DocumentReference | undefined = collectionReference?.doc(videoData.mid);

    // console.log(`\nVideoData before saving = ${videoData.toString()}, mduration=${videoData.mduration}`);

    documentReference?.set(
      {
        Id: videoData.mid, User_Id: videoData.muserId, Video_Id: videoData.mvideoId, 
        Views: videoData.mviews, Duration: videoData.mduration
      }
    );    
  }  

  //#region Variables
  private static readonly smvideoDatasCollectionName: string = "VideosDatas";
  //#endregion
}