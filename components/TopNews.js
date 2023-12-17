// import { useContext, useEffect } from 'react';
// import { NewsContext } from '@/context/newsContext';
// import { useRouter } from 'next/router';
// useEffect(()=>{
    //     fetch(`/api/${category}`).then(response=>response.json()).then(res=>setSummaries(res.result));
    // },[summaries]);
//const { summaries, setSummaries } = useContext(NewsContext);
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
/*
        {data&&data['result'].map((res,i)=>{
            return(
              <div key={i}>
                <h1>{res.category}</h1>
                  <div>
                    {res.news.map((news,j)=>{
                      return(
                        <div key={i+'.'+j}>
                          <h2>{news.title}</h2>
                          {news.articles.map((article,k)=>{
                            return(
                              <div key={i+'.'+j+'.'+k}>
                                <h3>{article.title}</h3>
                                <img src={article.image} alt="" />
                                <p>{article.summary}</p>
                                <a href={article.url}>{article.source}</a>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
              </div>
            );
          })}
*/