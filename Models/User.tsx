import Firebase from "firebase";
import "firebase/auth";

export default class User {
  constructor(muserId: string) {
    this.muId = muserId;
  }
  
  static sfbuildFromFibUser(FibUser: Firebase.User): User {
    const r: User = new User(FibUser.uid);
    return r;
  }

  public toString(): string {
    return(`User{muid=${this.muId}, memail=${this.memail}, mphoneNo=${this.mphoneNo}}`);
  }

  //#region Variables
  private muId: string;
  private memail?: string = undefined;
  private mphoneNo?: string = undefined;
  //#endregion
}