import Article from "@/components/Article";
import Navbar from "@/components/Navbar";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
export default function Home() {
  const [data, setData] = useState(null);
  const router = useRouter();
  async function fetcher(){
    let docRef = doc(db, router.query.category, router.query.id)
    let docSnap = await getDoc(docRef);
    setData(docSnap.data())
  }
  useEffect(()=>{
    if(router.query.id!==undefined)
      fetcher()
  },[router.query.id])
  // const [data, setData] = useState(null);
  //   useEffect(()=>{
  //     fetch('/api/').then(response=>response.json()).then(result=>setData(result.results[0].articles[0]))
  //   },[]);
  //   
  console.log(data)
  return(data?
    <>
      <Navbar />
      <Article data={data}/>
    </>:
    <>
      <h1>Loading...</h1>
    </>
  );
}
const sum = ['bart','chatGPT','pegasus','klsum','lex','lsa','luhn']
export function Ews({data}){
    const [summ, setSumm] = useState(0)
    return(
      <div>
        <h1>{data.title}</h1>
        <img src={data.imgUrl} alt="" /><br />
        <a href="">Source: {data.source}</a>
        <h2>{(sum[summ].charAt(0).toUpperCase())+(sum[summ].slice(1))} -  {((data[sum[summ]].final_score)*10).toFixed(1)}/10</h2>
        <p>{data[sum[summ]].summary}</p>
      </div>
    );
}