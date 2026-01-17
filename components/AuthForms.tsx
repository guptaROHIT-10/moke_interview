"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp, signIn } from "@/lib/actions/auth.actions";

// import FormField from "./FormField"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import React from 'react'
import FormField from "./FormField"
import { useRouter } from "next/navigation"

const authFormSchema = (type: FormType) => {
   // Z comes from Zod, a schema validation library.
   return z.object({
      name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
      email: z.string().email(),
      password: z.string().min(3),
   })
}

const AuthForms = ({ type }: { type: FormType }) => {
   const router = useRouter();
   const formSchema = authFormSchema(type);
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
         if (type === 'sign-up') {
            const {name, email, password} = values;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            console.log("Firebase Auth success, uid:", userCredential.user.uid);

            const result = await signUp({
               uid: userCredential.user.uid,
               name: name!,
               email,
               password
            })

            if(!result?.success){
               console.error("SignUp failed:", result?.message);
               toast.error(result?.message || 'Failed to create an account');
               return;
            }

            toast.success('Account created successfully. Please sign in.');
            router.replace('/sign-in');
         } else {
            const {email, password} = values;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const idToken = await userCredential.user.getIdToken();
            if(!idToken){
               toast.error ('Signin failed');
               return;
            }

            await signIn({
               email, idToken
            })

            toast.success('Sign in successfully');
            router.replace("/");
         }

      } catch (error: any) {
         console.error("Submit error:", error);
         if (error.code === 'auth/email-already-in-use') {
            toast.error('This email is already registered. Please sign in.');
         } else if (error.code === 'auth/weak-password') {
            toast.error('Password should be at least 6 characters.');
         } else {
            toast.error('There was an error: ' + (error.message || 'Unknown error'));
         }
      }

   }

   const isSignIn = type === "sign-in";

   return (
      <div className="card-border lg:min-w-566px">
         <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
               <img src="./logo.svg" alt="logo" height={32} />
               <h2 className="text-primary-100">PrepWise</h2>
            </div>
            <h3>Practice job interview with AI</h3>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                  {!isSignIn && (
                     <FormField control={form.control} name="name" label="Name" placeholder="Enter Your Name" />
                  )}
                  <FormField control={form.control} name="email" label="Email" placeholder="Email" />

                  <FormField control={form.control} name="password" label="Password" placeholder="Password" type='password' />

                  {/* <FormField/> */}

                  <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
               </form>

               <p className="text-center">{isSignIn ? 'No account yet?' : 'Have an account already?'}
                  <Link href={isSignIn ? './sign-up' : './sign-in'} className="font-bold text-user-primary ml-1"> {isSignIn ? 'Sign up' : 'Sign in'}</Link>
               </p>


            </Form>
         </div>
      </div>
   )
}

export default AuthForms

