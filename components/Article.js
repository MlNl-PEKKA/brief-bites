import { useContext, useState, useEffect } from 'react';
import { NewsContext } from '@/context/newsContext';
import Arrow from '@/images/arrow';
import styles from './Article.module.css';
import Redirect from '@/images/Redirect';
import Table from './Table';
import Table2 from './Table2';
const categories = ['Bart', 'Pegasus', 'ChatGPT', 'KLSum', 'LexRank', 'LSA', 'Luhn'];
const rouges = ['Rouge-1','Rouge-2','Rouge-L'];
export default function Article({data}){ 
    const [vote, setVote] = useState(0);
    const [col, setCol] = useState('#fff');
    const [ type, setType] = useState(0);
    const [rouge, setRouge] = useState(0);
    const { sticky } = useContext(NewsContext);
    const [time, setTime] = useState(null);
    const [typing, setTyping] = useState(true);
    const [reveal, setReveal] = useState(false);
    function voting(v){
        if(v===0)
            setCol('#fff')
        else if(v===1)
            setCol('#ff4500')
        else
            setCol('#7193ff')
        setVote(v);
    }
    function mapper(x){
        switch(x){
            case 0: return 'bart';
            case 2: return 'chatGPT';
            case 3: return 'klsum';
            case 4: return 'lexrank';
            case 5: return 'lsa';
            case 6: return 'luhn';
            case 1: return 'pegasus';
        }
    }
    function getCol(x){
        if(x>=0.7) return 'green'
        else if(x>=0.4) return 'goldenrod'
        else return 'red'
    }
    return (
        <div className={styles.newsContainer}>
            <div className={styles.mainCard}>
            <img className={styles.mainCardImage} src={data.imgUrl} alt='BRIEF-BITES'/>
            <div className={styles.mainCardInfo}>
                <h1>{data.title}</h1>
                <a href={data.link}><h2>Source: {data.source} <Redirect color={'#fff'}/></h2></a>
                <h2>{typeof data.time === "string"?data.time:'Tue, 05 May 2023 02:30:00 GMT'}</h2>
                <div className={styles.votes} style={{color:col}}>
                <div onClick={()=>{voting(vote===1?0:1);}}><Arrow color={vote===1?col:'#fff'} orientation={'0deg'} /> </div>
                 {vote===0?'Vote':data.votes+vote}
                 <div onClick={()=>{voting(vote===-1?0:-1)}}><Arrow color={vote===-1?col:'#fff'} orientation={'180deg'}  /> </div>
                </div>
            </div>
            </div>
            <div className={styles.newsCategories} style={{top:sticky,backgroundColor:'black'}}>
                {categories.map((category,i)=>{return <ArticleButton key={i} id={i} type={type} title={category} setType={setType} time={time} setTime={setTime} setReveal={setReveal}/> })}
            </div>
            <ChatAnim text={data[mapper(type)].summary} time={time} setTime={setTime} typing={typing} setTyping={setTyping} setReveal={setReveal}/>
            {reveal&&<h1 style={typing?{transition:'2s',fontSize:'0',opacity:0,marginBottom:'50px'}:{transition:'2s',fontSize:'5rem',opacity:1,marginBottom:'50px'}}>Brief-bite score : <span style={{color:getCol((data[mapper(type)].final_score/2+(((data.text.length-data[mapper(type)].summary.length)/(data.text.length)))/2).toFixed(1))}}>{((data[mapper(type)].final_score/2+(((data.text.length-data[mapper(type)].summary.length)/(data.text.length)))/2)*10).toFixed(1)}</span>/10</h1>}
            {reveal&&<h1 style={typing?{transition:'2s',fontSize:'0',opacity:0,display:'flex',width:'90%',alignItems:'center',justifyContent:'space-evenly'}:{transition:'2s',fontSize:'2.5rem',opacity:1, display:'flex',width:'90%',alignItems:'center',justifyContent:'space-evenly'}}>
            <span>Summary score : <span style={{color:getCol((data[mapper(type)].final_score).toFixed(1))}}>{(data[mapper(type)].final_score*10).toFixed(1)}</span>/10</span>
            <span>Length reduction : <span style={{color:getCol((data.text.length-data[mapper(type)].summary.length)/(data.text.length))}}>{(((data.text.length-data[mapper(type)].summary.length)/(data.text.length))*100).toFixed(1)}</span>%</span>
            </h1>}
            <div className={styles.mainCard} style={{flexDirection:'column'}}>
                <h1 style={{marginBottom:'25px'}}>Rouge scores</h1>
                <div className={styles.newsButton} style={{borderTop:'1px solid rgba(255, 255, 255, 0.19)',borderBottom:'1px solid rgba(255, 255, 255, 0.19)'}}>
                {rouges.map((r,i)=>{return <CategButton key={i} id={i} type={rouge} title={r} setRouge={setRouge}/> })}
                 </div>
                <Table data={data[mapper(type)]} type={rouge}/>
            </div>
            <div className={styles.mainCard} style={{flexDirection:'column'}}>
                <h1 style={{marginBottom:'25px'}}>Final scores</h1>
                <Table2 data={data} type={rouge}/>
            </div>
        </div>
    );
}
export function CategButton({id, type, title, setRouge }){
    function handleClick(){
        setRouge(id)
    }
    if(id===type)
        return <button style={{backgroundColor:'white',color:'black'}}>{title}</button>
    return <button onClick={handleClick}>{title}</button>
}
export function ArticleButton({id, type, title, setType, time, setTime, setReveal}){
    function handleClick(){
        setType(id)
        clearTimeout(time);setTime(null); setReveal(false);
    }
    if(id===type)
        return <button style={{backgroundColor:'white',color:'black'}}>{title}</button>
    return <button onClick={handleClick}>{title}</button>
}

export function ChatAnim({text, time, setTime, typing, setTyping, setReveal }){
                const [innerText, setInnerText] = useState('')
                useEffect(()=>{
                    setTime(setTimeout(function(){
                        setInnerText(text.slice(0,innerText.length+1));
                        setTyping(true);
                        setReveal(true);
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
                return <div style={{margin:'5rem'}}>
                     <h2 style={{display:'inline'}}>{innerText}</h2>
                     {typing&&<span style={{backgroundColor:'white',}}>&nbsp;&nbsp;</span>}
                </div>
            }