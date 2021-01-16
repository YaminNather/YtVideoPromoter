import Firebase from "firebase";

export default class FibDbMgr {
  public static sfgetDbRef(): Firebase.database.Reference {
    if(FibDbMgr.smdbRef == undefined) {
      FibDbMgr.smdbRef = Firebase.database()
        .refFromURL("https://fir-testproject-5eae3.firebaseio.com/");
    }

    return(FibDbMgr.smdbRef);
  }

  public static async sfgetAllVideoIds(): Promise<string[]> {
    let r: string[] = [];
    const videoIdsRef: Firebase.database.Reference = FibDbMgr.sfgetDbRef().child("Video_Ids");
    console.log(`CustomLog:VideoIdsRefPath = ${videoIdsRef.toString()}`);
    const ds: Firebase.database.DataSnapshot = await videoIdsRef.once("value");
    console.log(`CustomLog:dataSnapshot.val() = ${ds.val()}`);
    // (dataSnapshot.val() as Map<any, any>).forEach(
    //   (value, key,) => {
    //     r.push(value["Video_Id"]);
    //   }
    // );
    ds.forEach(
      (childDS) => {
        const videoId: string = childDS.child("Video_Id").val() as string;
        console.log(`CustomLog:Loaded Video Id = ${videoId}`);
        r.push(videoId);
      }
    );    
        
    return(r);
  }

  private static smdbRef: Firebase.database.Reference;
}