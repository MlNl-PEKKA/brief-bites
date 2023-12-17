import Loading from '@/components/loading';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styles from './Article.module.css';
export default function Summarization(){
    const [loading, setLoading] = useState(false);
    const urlRef = useRef(null);
    const router = useRouter();
    async function submitHandler(e){
        setLoading(true);
        e.preventDefault();
        let txt = (urlRef.current.value).trim();
        if(txt!==''){
            urlRef.current.value=''
            const data = await fetch('http://localhost:8000/community',{
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({'url':txt}),
              cache: 'default'
          }).then(response=>response.json()).then((result)=>{setLoading(false);router.replace(result.redirect)});
        }
    }
    return (
        loading?<Loading />:
        <div className={styles.newsContainer2}>
            <h1>Have a link already?</h1>
            <br />
            <h2>Drop it here and sit back. 👇</h2>
            <br />
            <form style={{display:'flex',height:'150px',width:'700px',alignItems:'center',justifyContent:'space-evenly',flexDirection:'column'}} action="POST" onSubmit={submitHandler}>
                <input className={styles.form} type="url" placeholder='www.cluttered-news-website.com/this-article-is-too-long' ref={urlRef}/>
                <br />
                <button type='submit'>Summarize 🔥</button>
            </form>
        </div>
    );
}