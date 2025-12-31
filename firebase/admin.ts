import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initialFirebseAdmin = () => {
   const apps = getApps();

   if(apps.length === 0) {
      initializeApp({
         credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),

//That \n is NOT a newline.
//It’s just two characters: backslash + n.
//But Firebase (and many libraries) expect real newlines. 
// so we use replace(/\\n/g, "\n"). 
//    \\ → represents a literal backslash (\)
//    n → the letter n
//    /g → global (replace all occurrences)

         })
      })
   }

   return{
      auth : getAuth(),
      db: getFirestore()
   }
}

export const {auth, db} = initialFirebseAdmin();

