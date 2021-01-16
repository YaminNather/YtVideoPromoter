import Firebase from "firebase";

export let app: Firebase.app.App | undefined = undefined;

export function gfinitFirebase(): void {
  if(Firebase.apps.length != 0)
    return;

  app = Firebase.initializeApp(
    {
      apiKey: "AIzaSyDPpUer1aBe9CAvgcBKmzuRYdO6PiRFwAo",
      authDomain: "fir-testproject-5eae3.firebaseapp.com",
      databaseURL: "https://fir-testproject-5eae3.firebaseio.com",
      projectId: "fir-testproject-5eae3",
      storageBucket: "fir-testproject-5eae3.appspot.com",
      messagingSenderId: "232945164239",
      appId: "1:232945164239:web:c8d62a2353b8ceabd9bcba",
      measurementId: "G-TSY4MWWV5J"
    }  
  );
}

export function gfsignInAnon(): void {
  if(Firebase.auth().currentUser != null) 
    return;
  
  Firebase.auth().signInAnonymously();  
}