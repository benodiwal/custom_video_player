"use client";

import React, { useCallback, useState, useEffect } from 'react'
import Input from '../../components/Input'
import axios from 'axios';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

type Varaint = "LOGIN" | "REGISTER";

const Auth = () => {

  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [ varaint, setVariant] = useState<Varaint>("LOGIN");

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log('Authenticated');
      router.push("/browse")     
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (varaint === "LOGIN") {
      setVariant("REGISTER")
    } else if (varaint === "REGISTER") {
      setVariant("LOGIN")
    }
  }, [varaint]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: "/"
      })
      .then((callback) => {
        if (callback?.error) {
          console.log(callback?.error);
        }else if (callback?.ok && !callback?.error) {
          console.log("Logged in"); 
        }
      })
  
    } catch (error) {
      console.log("Login error: ", error);
      
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password
      })

      login();
    } catch (error) {
      console.log("Registration error: ", error);
      
    }
  }, [email, name, password, login()]);
  
  return (
    <div className="relative h-full w-full bg-[url('/hero.jpg')]">
      <div className='bg-gradient-to-b from-black/20 to-black/60 w-full h-full'>
        <nav className='lg:px-16 lg:py-8 px-6 py-4 flex items-center justify-between'>
          <img src="/logo.png" alt="logo" className='lg:h-12 md:h-10 h-8'/>
        </nav>

        <div className='flex justify-center'>
          <div className='bg-black/70 self-center mt-4 px-16 py-8'>
            <h1 className='text-white mb-3 text-4xl font-bold'>
              {
                varaint === "LOGIN" ? "Sign in" : "Register"
              }
             
              </h1>
              <div className='flex flex-col'>
               <form>
                {
                  varaint === "REGISTER" && (
                    <Input 
                    label="UserName"
                    onChange={(e : any) => setName(e.target.value)}
                    value={name}
                    type='name'
                    id='name'
                    />
                  )
                }
               <Input 
               label="Email"
               onChange={(e: any) => setEmail(e.target.value)}
               value={email}
               type='email'
               id='email'
               />
               <Input 
               label='Password'
               onChange={(e: any) => setPassword(e.target.value)}
               value={password}
               type='password'
               id='password'
               />
               <button
               onClick={() => {varaint === "LOGIN" ? login() : register()} }
                type='submit'
                className='bg-red-600 hover:bg-red-700 rounded-md mt-10 py-3 w-full text-white'>
                {
                  varaint === "LOGIN" ? "LOGIN" : "REGISTER"
                }
               </button>
               {
                varaint === "LOGIN" && (
                  <p className='text-neutral-500 mt-12 max-w-[300px]'>
                First time using Netflix?
                <span
                onClick={() => toggleVariant()} 
                className='text-white font-bold ml-1 cursor-pointer hover:underline'>
                  Create an account
                </span>
               </p>
                )
               }
               {
                varaint === "REGISTER" && (
                  <p className='text-neutral-500 mt-12 max-w-[300px] '>
                Already have an account?
                <span
                onClick={() => toggleVariant()} 
                className='text-white font-bold ml-1 cursor-pointer hover:underline'>
                  Sign in
                </span>
               </p>
                )
               }
              
                <div>
 
                </div>
               </form>
              </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default Auth
