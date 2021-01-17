import Firebase from "firebase";
import "firebase/firestore";

type Firestore = Firebase.firestore.Firestore;
type QueryDocumentSnapshot = Firebase.firestore.QueryDocumentSnapshot;
type DocumentData = Firebase.firestore.DocumentData;

export default class VideoData {
  private constructor(mvideoId: string) {
    this.mvideoId = mvideoId;
  }

  static async sfbuildFromVideoId(videoId: string): Promise<VideoData> {
    const r: VideoData = new VideoData(videoId);
    await r.fgetDataFromVideoId();    
    
    return(r);
  }

  static async sfbuildFromDocumentSnapshot(documentSnapshot: QueryDocumentSnapshot): Promise<VideoData> {
    const r: VideoData = new VideoData(documentSnapshot.get("Video_Id"));    
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
    return(`VideoData{mvideoId=${this.mvideoId},mtitle=${this.mtitle},mthumbnailURL=${this.mthumbnailURL}}`);
  }

  //#region Variables
  public mvideoId: string;
  public mtitle: string = "";
  public mthumbnailURL: string = "";
  public mviews: number = 0;
  public mduration: number = 0;
  //#endregion
}