import { useState } from 'react';
import styles from './Collage.module.css';
export default function Collage({articles}){
    const [big,setBig] = useState(styles.bigInactive);
    const [small,setSmall] = useState(styles.smallInactive);
    function handleMover(){
        big==styles.bigInactive?setBig(styles.big):null;
        small==styles.smallInactive?setSmall(styles.small):null;
    }
    function handleMover2(){
        big==styles.big?setBig(styles.bigInactive):null;
        small==styles.small?setSmall(styles.smallInactive):null;
    }
    return(
        <div className={styles.collageContainer}>
            {articles.map((article,i)=>{
                if(i<5){
                    return(
                        <div key={i} className={big}  style={{backgroundImage:`url(${article.image})`}}></div>
                    );}
                else{
                    return(
                        <div key={i} className={small} style={{backgroundImage:`url(${article.image})`}}></div>
                    );}
            })}
            <div className={styles.hoverBox} onMouseOver={handleMover} onMouseOut={handleMover2}></div>
        </div>
    );
}