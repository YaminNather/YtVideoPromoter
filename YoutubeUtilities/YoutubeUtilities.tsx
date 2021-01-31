export default class YoutubeUtilities {
  public static sfextractVideoIdFromURL(url: string): string | undefined {
    if(url == "" || !url.includes("youtube.com"))
      return undefined;    

    let r: string = "";

    const videoIdStartIndex: number = url.search("v=") + 1;
    for(let i: number = videoIdStartIndex + 1; i < url.length; i++) {
      const ch: string = url.charAt(i);            
      if(ch.search(/[a-z|0-9|_]/i) == -1)
        break;
      
      r += ch;
    }

    return r;
  }

  public static async sfgetVideoTitle(videoId: string): Promise<string> {
    console.log(`CustomLog:Getting VideoTitle for videoId = ${videoId}`);

    const url: string = `https://youtube.googleapis.com/youtube/v3/` + 
    `videos?part=snippet&key=AIzaSyDPpUer1aBe9CAvgcBKmzuRYdO6PiRFwAo&id=${videoId}`;
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

  public static sfgetVideoThumbnailURL(videoId: string): string {
    return(`https://img.youtube.com/vi/${videoId}/0.jpg`);
  }
}