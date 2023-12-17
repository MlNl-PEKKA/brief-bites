// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from "node-fetch";
import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
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
//const category = ['top-stories','local','national','international','business','politics','technology','health','sports','science','entertainment','community']
async function handler(req, res) {
    // const result = {"results":[]}
    // if(result.results.length!==12){
    //   category.map((c)=>{
    //     let categ = {"category":c,"articles":[]}
    //     result.results.push(categ);
    //   })
    //   let dbres = []
    //   dbres[0] = await getDocs(collection(db, category[0]));
    //   dbres[1] = await getDocs(collection(db, category[1]));
    //   dbres[2] = await getDocs(collection(db, category[2]));
    //   dbres[3] = await getDocs(collection(db, category[3]));
    //   dbres[4] = await getDocs(collection(db, category[4]));
    //   dbres[5] = await getDocs(collection(db, category[5]));
    //   dbres[6] = await getDocs(collection(db, category[6]));
    //   dbres[7] = await getDocs(collection(db, category[7]));
    //   dbres[8] = await getDocs(collection(db, category[8]));
    //   dbres[9] = await getDocs(collection(db, category[9]));
    //   dbres[10] = await getDocs(collection(db, category[10]));
    //   dbres[11] = await getDocs(collection(db, category[11]));
    //   dbres.map((snap,i)=>{
    //     snap.forEach((doc)=>{
    //       result.results[i].articles.push(doc.data());
    //     })
    //   })
    const file = await readFile(join(cwd(),'database','firebase_data.json'),'utf-8');
    const result = (JSON.parse(file));
    const community = await getDocs(collection(db, "community"));
    let categ = {"category":"community","articles":[]}
    community.forEach((doc)=>{
      categ.articles.push(doc.data());
    })
    result.results.push(categ)
    console.log(result)
    await res.status(200).json(result);
}
export default handler;