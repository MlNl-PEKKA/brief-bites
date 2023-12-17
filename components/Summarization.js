import Loading from '@/components/loading';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styles from './Article.module.css';
export default function Summarization(){
    const [loading, setLoading] = useState(false);
    const urlRef = useRef(null);
    const router = useRouter();
    return (
        loading?<Loading />:
        <div className={styles.newsContainer2}>
            <h1>Have a link already?</h1>
            <br />
            <h2>Drop it here and sit back. 👇</h2>
            <br />
            <form style={{display:'flex',height:'150px',width:'700px',alignItems:'center',justifyContent:'space-evenly',flexDirection:'column'}}>
                <input className={styles.form} type="url" placeholder='www.cluttered-news-website.com/this-article-is-too-long' ref={urlRef}/>
                <br />
                <button type='button'>Summarize 🔥</button>
            </form>
        </div>
    );
}