import Firebase from "firebase";
import "firebase/auth";

export default class User {
  constructor(muserId: string, memail?: string, mphoneNo?: string) {
    this.muId = muserId;
  }
  
  static sfbuildFromFibUser(fibUser: Firebase.User): User {
    const r: User = new User(fibUser.uid);
    if(fibUser.email != null)
      r.memail = fibUser.email;
      
    return r;
  }

  public toString(): string {
    return(`User{muid=${this.muId}, memail=${this.memail}, mphoneNo=${this.mphoneNo}}`);
  }

  public fgetUId(): string {return this.muId;} 

  public fgetEmail(): string | undefined {return this.memail;}

  public fgetPhone(): string | undefined {return this.mphoneNo;}

  //#region Variables
  private muId: string;
  private memail?: string = undefined;
  private mphoneNo?: string = undefined;
  //#endregion
}