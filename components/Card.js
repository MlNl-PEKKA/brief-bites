import styles from './Card.module.css';
import Link from 'next/link';
import Share from '@/images/share';
import Arrow from '@/images/arrow';
import Setting from '@/images/setting';
import { useEffect, useState } from 'react';
export default function Card({article, c}){
    const [vote, setVote] = useState(0);
    const [col, setCol] = useState('#fff');
    const [summarize, setSummarize] = useState(0);
    const [time, setTime] = useState(null)
    function voting(v){
        if(v===0)
            setCol('#fff')
        else if(v===1)
            setCol('#ff4500')
        else
            setCol('#7193ff')
        setVote(v);
    }
    return(
        <div className={styles.card}>
            {summarize!==0&&<button style={{position:'absolute',right:0, margin:'1rem',zIndex:2}} onClick={()=>{setSummarize(0);clearTimeout(time);setTime(null);}}>X</button>}
            {!summarize?
            <Link className={styles.cardContent} href={{ pathname: article.id, query: { category: c } }}><CardContent setSummarize={setSummarize} summarize={summarize} article={article} time={time} setTime={setTime}/></Link>:
            <div className={styles.cardContent} style={{backgroundColor:'transparent',cursor:'default'}}><CardContent setSummarize={setSummarize} summarize={summarize} article={article} time={time} setTime={setTime}/></div>
            }
            <div className={styles.cardUtils}>
                <div className={styles.time} onClick={()=>{setSummarize((summarize+1)%8);clearTimeout(time);setTime(null);}}><Setting color={'#fff'} />Summary</div>
                <Link className={styles.share} href={article.link}><Share color={'#fff'}/>Source</Link>
                <div className={styles.votes} style={{color:col}}>
                <div onClick={()=>{voting(vote===1?0:1);}}><Arrow color={vote===1?col:'#fff'} orientation={'0deg'} /> </div>
                 {vote===0?'Vote':article.votes+vote}
                 <div onClick={()=>{voting(vote===-1?0:-1)}}><Arrow color={vote===-1?col:'#fff'} orientation={'180deg'}  /> </div>
                </div>
            </div>
        </div>
    );
}
export function CardContent({setSummarize, summarize, article, time, setTime}){
    const models = ['bart','pegasus','chatGPT','klsum','lexrank','lsa','luhn']
    if(summarize&&article[models[summarize-1]].summary!==''){
        let innerText = article[models[summarize-1]].summary
        innerText = innerText.length>700?innerText.slice(0,700)+'...':innerText
        return(<>
            <h1>{models[summarize-1].charAt(0).toUpperCase()+models[summarize-1].slice(1)}</h1>
            <ChatAnim text={innerText} time={time} setTime={setTime}/>
        </>);}
    else{
        if(summarize)
            setSummarize(0)
    return(<>
                <img className={styles.cardImage} src={article.imgUrl} alt="BRIEF-BITES" />
                <h1>{article.title.slice(0,60)+'...'}</h1>
                <p>Source: {article.source}</p>
            </>);}
}
export function ChatAnim({text, time, setTime}){
    const [innerText, setInnerText] = useState('')
    const [typing, setTyping] = useState(true)
    useEffect(()=>{
        setTime(setTimeout(function(){
            setInnerText(text.slice(0,innerText.length+1));
            setTyping(true);
            if(innerText.length===text.length){
                clearTimeout(time);
                setTime(null);
                setTyping(false);
            }
        },30))
        return ()=>{
            clearTimeout(time);
            setTime(null);
        }
    },[innerText])
    useEffect(()=>{
        setInnerText('');
        clearTimeout(time);
        setTime(null);
    },[text])
    return <div>
         <span>{innerText}</span>
         {typing&&<span style={{backgroundColor:'white',}}>&nbsp;&nbsp;</span>}
    </div>
}