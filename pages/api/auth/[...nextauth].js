import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
// import { Provider } from "next-auth/providers";
import NextAuth from "next-auth"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../lib/mongodb"
// import { initializeApp, getApp, getApps } from "firebase/app";
// import {getFirestore, collection, query, getDocs, where, limit, doc, getDoc, addDoc, updateDoc, deleteDoc, runTransaction} from "firebase/firestore"

// const firebaseConfig = {
//     apiKey: "AIzaSyAtWklwtrk8GCBk6Q_-uXCF0L73gnEUJIk",
//     authDomain: "next-auth-tuts-e81d5.firebaseapp.com",
//     projectId: "next-auth-tuts-e81d5",
//     storageBucket: "next-auth-tuts-e81d5.appspot.com",
//     messagingSenderId: "216745192140",
//     appId: "1:216745192140:web:8fae986f1386dd3a69f069"
//   };
//   const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//   const db = getFirestore();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
    // adapter: FirebaseAdapter({
    //     db,
    //     getFirestore, collection, query, getDocs, where, limit, doc, getDoc, addDoc, updateDoc, deleteDoc, runTransaction
    // }),
    session: {
      strategy: 'database'
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          async authorize(credentials) {
            console.log('user credentials', credentials);
            return {credentials}
          }
        }),
        EmailProvider({
          server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD
            }
          },
          from: process.env.EMAIL_FROM
        }),
        GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        TwitterProvider({
          clientId: process.env.TWITTER_CLIENT_ID,
          clientSecret: process.env.TWITTER_CLIENT_SECRET
        }),
        Auth0Provider({
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          issuer: process.env.AUTH0_ISSUER
        })
      ]
})