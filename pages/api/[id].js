// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import fetch from "node-fetch";
import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDsFlwWnYKHZK_yH3EP-_9CXqGhQ6AZe8Q",
  authDomain: "daily-dose-798fb.firebaseapp.com",
  projectId: "daily-dose-798fb",
  storageBucket: "daily-dose-798fb.appspot.com",
  messagingSenderId: "559513035612",
  appId: "1:559513035612:web:81be48edb384beaf8fd799"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collections = ['business','community','entertainment','health','international','local','national','political','science','sports','technology','top-stories']
let result = {"result":[]}
async function handler(req, res) {
  try{
      collections.map((c,i)=>{
      let category = {"category":c,"articles":[]}
      const querySnapshot = await getDocs(collection(db, c));
      querySnapshot.forEach((doc)=>{
        category.articles.push(doc.data());
      })
      result.result.push(category)
    })
    await res.status(200).json(result);
  }
  catch{
    console.log("ERROR")
    res.status(500).send({ error: 'failed to fetch data' })
  }
}
export default handler;