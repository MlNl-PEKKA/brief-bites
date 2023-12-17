import Navbar from "@/components/Navbar";
import News from "@/components/News";
import TopNews from "@/components/TopNews";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
export default function Home() {
    const [data, setData] = useState(null);
    useEffect(()=>{
      fetch('/api/').then(response=>response.json()).then(result=>setData(result))
      console.log('Recieved');
    },[]);
        if(!data)
          return <Loading />
        return (
        <>
          <Navbar />
          <TopNews />
          <News data={data}/>
        </>
        );
    // }
}
