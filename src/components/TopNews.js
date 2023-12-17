import Redirect from '@/images/Redirect';
import Loading from '@/components/loading';
import useSWR from 'swr';
import Collage from './Collage';
import styles from './TopNews.module.css';
export default function TopNews(){ 
    const { data, error, isLoading } = useSWR(`/api/top-stories`, (url)=>fetch(url).then(res=>res.json()));
        if(isLoading)
            return <Loading />
        if(error)
            return <h1>ERROR</h1>
        return(
            <div className={styles.topNewsBody}>
                {data&&data['result'][0].news.map((n,i)=>{
                    return(
                        <div className={styles.topNewsCard} key={i}>
                        <div className={styles.topNewsImage} style={{backgroundImage:`url(${n.articles[0].image})`}}></div>
                        <div className={styles.topNewsInfo}>
                            <Collage id={i} articles={n.articles}/>
                            <div className={styles.topNewsHeadline} >{n.title}</div>
                            <div className={styles.topNewsButtons} >
                                <button className={styles.topNewsButton}>Read More</button>
                                <a className={styles.topNewsLink} href={n.articles[0].url}>Source: {n.articles[0].source} <Redirect color={'#fff'}/></a>
                            </div>
                        </div>
                        </div>
                    );
                })}
            </div>
        );
}
