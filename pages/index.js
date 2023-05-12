import Navbar from "@/components/Navbar";
import News from "@/components/News";
import TopNews from "@/components/TopNews";
import { useEffect, useState } from "react";
// import useSWR from 'swr';
// const categories = ['business','entertainment','','health','international','local','national','politics','science','sports','technology','top-stories'];
export default function Home() {
  // const { data, error, isLoading } = useSWR(`/api/${''}`, (url)=>fetch(url).then(res=>res.json()));
  // categories.includes(category)?category:
  // if(categories.includes(category)!==true)
  //       return<h1>{`Page "${category}" does not exist`}</h1>
    // else{
    const [data, setData] = useState(null);
    useEffect(()=>{
      fetch('/api/').then(response=>response.json()).then(result=>setData(result))
    },[]);
    console.log(data);
        // if(isLoading)
        //     return <h1>LOADING...</h1>
        // if(error)
        //     return <h1>ERROR</h1> 
        if(!data)
          return <h1>LOADING...</h1>
        return (
        <>
          <Navbar />
          <TopNews />
          <News data={data}/>
        </>
        );
    // }
}
