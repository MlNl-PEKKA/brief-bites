import { useRef } from 'react';
import styles from './Article.module.css';
export default function Summarization(){
    const urlRef = useRef(null);
    async function fetcher(txt){
      const data = await fetch('http://localhost:8000/community',{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({'url':txt}),
              cache: 'default'
          }).then(response=>response.json()).then((result)=>{return result});
    }
    async function submitHandler(e){
        e.preventDefault();
        let txt = (urlRef.current.value).trim();
        if(txt!==''){
            urlRef.current.value=''
            console.log(txt)
            await fetcher(txt).then((data)=>{console.log('lol2',data)})
        }
    }
    return (
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