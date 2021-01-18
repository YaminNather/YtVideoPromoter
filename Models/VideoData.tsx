import Firebase from "firebase";
import "firebase/firestore";

//#region Variables
type Firestore = Firebase.firestore.Firestore;
type QueryDocumentSnapshot = Firebase.firestore.QueryDocumentSnapshot;
type DocumentData = Firebase.firestore.DocumentData;
//#endregion

export default class VideoData {
  private constructor(mid: string, muserId: string, mvideoId: string, mviews: number, mduration: number) {
    this.mid = mid;
    this.muserId = muserId;
    this.mvideoId = mvideoId;
    this.mviews = mviews;
    this.mduration = mduration;
  }

  static async sfbuildWithData(id: string, userId: string, videoId: string, views: number, duration: number): Promise<VideoData> {
    const r: VideoData = new VideoData(id, userId, videoId, views, duration);
    await r.fgetDataFromVideoId();    
    
    return(r);
  }

  static async sfbuildFromDocumentSnapshot(documentSnapshot: QueryDocumentSnapshot): Promise<VideoData> {
    const r: VideoData = new VideoData(
      documentSnapshot.id, documentSnapshot.get("User_Id"), documentSnapshot.get("Video_Id"),
      documentSnapshot.get("Views"), documentSnapshot.get("Duration")
    );
    await r.fgetDataFromVideoId();
    
    return(r);
  }  

  public async fgetDataFromVideoId(): Promise<void> {
    this.mtitle = await this.fgetVideoTitle();
    this.mthumbnailURL = this.fgetVideoThumbnailURL();
  }

  private async fgetVideoTitle(): Promise<string> {
    // const url: string = `https://youtube.googleapis.com/youtube/v3/videos?
    //   part=snippet
    //   &key=AIzaSyDPpUer1aBe9CAvgcBKmzuRYdO6PiRFwAo
    //   &id=${videoId}`;
    // const url: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyDPpUer1aBe9CAvgcBKmzuRYdO6PiRFwAo&id=Ks-_Mh1QhMc`;
    const url: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyDPpUer1aBe9CAvgcBKmzuRYdO6PiRFwAo&id=${this.mvideoId}`;
    const response: Response = await fetch(
      url,
      {method: "GET"}
    );

    const json: any = await response.json();

    // console.log(`Response for url ${url}:`);
    // console.log(`\t${Object.getOwnPropertyNames(json.items[0])}`);
    // console.log(`\t${json.items[0].snippet.title}`);

    return json.items[0].snippet.title;
  }

  private fgetVideoThumbnailURL(): string {
    return(`https://img.youtube.com/vi/${this.mvideoId}/0.jpg`);
  }

  public toString(): string {
    return(
      `VideoData{mid=${this.mid},muserId=${this.muserId},mvideoId=${this.mvideoId},` + 
      `mviews=${this.mviews},mduration=${this.mduration},mtitle=${this.mtitle},mthumbnailURL=${this.mthumbnailURL}}`
    );
  }

  public fclone(): VideoData {
    const r: VideoData = new VideoData(this.mid, this.muserId, this.mvideoId, this.mviews, this.mduration);
    r.mtitle = this.mtitle;
    r.mduration = this.mduration;
    return(r);
  }
  //#region Variables
  public mid: string;
  public muserId: string;
  public mvideoId: string;
  public mtitle: string = "";
  public mthumbnailURL: string = "";
  public mviews: number;
  public mduration: number;
  //#endregion
}