"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { success } from "zod";

const one_week = 60 * 60 * 24 * 7;

//1
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
      const userRecord = await db.collection('users').doc(uid).get();

      if(userRecord.exists){
         return{
            success: false,
            message: 'User already exists, please sign in.'
         }
      }

      await db.collection('users').doc(uid).set({
         name, 
         email,
         createdAt: new Date().toISOString()
      })

      return{
         success: true,
         message: 'Account Created Successfully, please Signin.'
      }

  } catch (e: any) {
    console.error("Creating an error", e);

    // Check for specific Firebase Auth errors
    if (e.code === 'auth/email-already-in-use' || e.message?.includes('email-already-exists')) {
      return {
        success: false,
        message: "This email already exists",
      };
    }
    
    // Check if it's a Firestore permission error
    if (e.code === 'permission-denied') {
      return {
        success: false,
        message: "Permission denied. Please check Firebase configuration.",
      };
    }
    
    return {
      success: false,
      message: "Failed to create an account: " + (e.message || "Unknown error"),
    };
  }
}


//2
export async function signIn(params: SignInParams) {
   const {email, idToken} = params;
   try {
      const userRecord = await auth.getUserByEmail(email);     //2 mistake

      if(!userRecord){
         return{
            success: false,
            message: 'user does not exit, please create an account.'
         }
      }

      await setSessionCookies(idToken);
      
   } catch (e) {
      console.log(e);
      return{
         success: false,
         message: 'failed to login in account.'
      }
   }
}



//3
export async function setSessionCookies(idToken: string) {
   //It takes a Firebase ID token, verifies it on the server, creates a secure session cookie, and stores it in the browser so the user stays logged in.

   const cookiesStore = await cookies();
   //cookies() is a Next.js server-only function

   const sessionCookies = await auth.createSessionCookie(idToken,{
      expiresIn: one_week * 1000,
   })

   cookiesStore.set('session', sessionCookies, {
      maxAge: one_week,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',     //Cookie is sent for all routes
      sameSite: 'lax'
   })
}


//4
export async function getCurrentuser(): Promise<null | User> {
   const cookieStore = await cookies();

   const sessionCookies = cookieStore.get('session')?.value;

   if(!sessionCookies) return null;

   try {
      const decodeClaims = await auth.verifySessionCookie(sessionCookies, true);

      const userecord = await db.collection('users').doc(decodeClaims.uid).get();

      if(!userecord) return null;
      return{
         ...userecord.data(),
         id: userecord.id,
      } as User;
   } catch (e) {
      console.log(e);
      return null;
   }
}

//5
export async function isAuthenticated() {
   const user = await getCurrentuser();

   return !!user;
}