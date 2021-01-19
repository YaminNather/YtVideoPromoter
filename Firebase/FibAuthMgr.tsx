import Firebase from "firebase";
import "firebase/auth";
import User from "../Models/User";

type UserCredential = Firebase.auth.UserCredential;

export default class FibAuthMgr {
  public static async sfsignInAnon(): Promise<User | undefined> {
    if(Firebase.auth().currentUser != null) 
      return undefined;
      
    const userCred: UserCredential = await Firebase.auth().signInAnonymously();
    
    if(userCred.user != null)
      return User.sfbuildFromFibUser(userCred.user);
    else
      return undefined;
  }  
}