import Article from "@/components/Article";
import Navbar from "@/components/Navbar";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { db } from "../components/utils";
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
  return(data?
    <>
      <Navbar />
      <Article data={data}/>
    </>:
    <>
      <Loading />
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