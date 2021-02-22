import Firebase from "firebase";
import "firebase/auth";
import { Observable } from "rxjs";
import User from "../Models/User";
import FibFSMgr from "./FibFSMgr/FibFSMgr";

type UserCredential = Firebase.auth.UserCredential;

export default class FibAuthMgr {
  public static async sfregisterWithEAP(email: string, password: string): Promise<User> {
    const userCred: UserCredential = 
      await Firebase.auth().createUserWithEmailAndPassword(email, password);

      return User.sfbuildFromFibUser(userCred.user as Firebase.User);
  }

  public static async sfsignInAnon(): Promise<User | undefined> {
    if(Firebase.auth().currentUser != null) 
      return undefined;
      
    const userCred: UserCredential = await Firebase.auth().signInAnonymously();
    
    if(userCred.user != null)
      return User.sfbuildFromFibUser(userCred.user);
    else
      return undefined;
  }
  
  public static async sfsignInWithEAP(email: string, password: string): Promise<User | undefined> {
    if(FibAuthMgr.sfgetCurUser() != undefined)
      return undefined;

    const userCred: UserCredential = await Firebase.auth().signInWithEmailAndPassword(email, password);    
    if(userCred.user == null)
      return undefined;

    return User.sfbuildFromFibUser(userCred.user);
  }

  public static async sfsignOut(): Promise<void> {
    FibFSMgr.sfunsubscribeAllListeners();

    console.log("CustomLog:Started signout");
    await Firebase.auth().signOut();
    console.log("CustomLog:Done waiting for signout");
  }

  public static sfgetCurUser(): User | undefined {
    const fibCurUser: Firebase.User | null = Firebase.auth().currentUser;
    if(fibCurUser == null)
      return undefined;    
    
      return User.sfbuildFromFibUser(fibCurUser);
  }

  public static sfonAuthChanged(func: (user: User | undefined)=>void): ()=>void {
    return Firebase.auth().onAuthStateChanged(
      (fibUser) => {
        if(fibUser == null){
          func(undefined);
          return;
        }
        
          const user: User = User.sfbuildFromFibUser(fibUser as Firebase.User);
          func(user);
      }
    );
  }

  public static sfgetUserObservable(): Observable<User | undefined> {
    const r: Observable<User | undefined> = new Observable(
      (subscriber) => {
        const unsubber: Firebase.Unsubscribe = Firebase.auth().onAuthStateChanged(
          (user) => {
            if(user == undefined) {
              subscriber.next(undefined);
              return;
            }

            subscriber.next(User.sfbuildFromFibUser(user));
          }
        );

        return(() => unsubber());
      }      
    );    
    
    return(r);
  }
}