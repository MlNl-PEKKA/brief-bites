// import { useContext, useEffect } from 'react';
// import { NewsContext } from '@/context/newsContext';
// import { useRouter } from 'next/router';
// useEffect(()=>{
    //     fetch(`/api/${category}`).then(response=>response.json()).then(res=>setSummaries(res.result));
    // },[summaries]);
//const { summaries, setSummaries } = useContext(NewsContext);
import styles from './News.module.css';
import Card from './Card';
import { useContext, useState } from 'react';
import { NewsContext } from '@/context/newsContext';
import CategoryButton from './CategoryButton';
const categories = ['Top stories','Local','National','International','Business','Politics','Technology','Health','Sports','Science','Entertainment','Community'];
export default function News({data}){ 
    const { sticky } = useContext(NewsContext);
    const [ categ, setCateg] = useState(0);
    return (
        <div className={styles.newsContainer}>
            <h1 style={{fontSize:'20rem'}}>News</h1>
            <div className={styles.newsCategories} style={{top:sticky,backgroundColor:'black'}}>
                {categories.map((category,i)=>{return <CategoryButton key={i} id={i} categ={categ} title={category} setCateg={setCateg}/>})}
            </div>
            <div className={styles.newsCardContainer}>
                {data.results[categ].articles.map((article)=>{
                    return <Card key={article.id} id={article.id} article={article} c={data.results[categ].category}/>
                })}
            </div>
        </div>
    );
}
//<Card key={i} image={n.articles[0].image} source={n.articles[0].source} time={n.articles[0].time} title={n.articles[0].title} url={n.articles[0].url}/>