const categories = ['Text','Bart', 'ChatGPT','Pegasus' , 'KLSum', 'LexRank', 'LSA', 'Luhn'];
const categ = ['vtext','vbart', 'vchatGPT','vpegasus' , 'vklsum', 'vlexrank', 'vlsa', 'vluhn'];
const rouge = ['rouge1','rouge2','rougeL']
import styles from './Table.module.css';
export default function Table({data, type}){
    function styler(v){
        if(v>=0.7)
            return styles.green
        else if(v>=0.4)
            return styles.yellow
    }
    return(
        <>
        <div style={{padding:'2rem 0',display:'flex',width:'100%',alignItems:'center',justifyContent:'space-around'}}>
            <h2>Method</h2>
            <h2 style={{transform:'translateX(-10px)'}}>Recall</h2>
            <h2>Precision</h2>
            <h2>F-1 score</h2>
        </div>
        {categ.map((r,i)=>{
            return((data.rouge[categ[i]][rouge[type]][2])!==1&&
            <div key={categ[i]} style={{padding:'1rem 0',display:'flex',width:'100%',alignItems:'center',justifyContent:'space-around',fontSize:'1.5rem',borderTop:'1px solid rgba(255, 255, 255, 0.19)'}}>
            <p>{categories[i]}</p>
            <p className={styler(data.rouge[categ[i]][rouge[type]][0])} style={categories[i].length>4?{transform:`translateX(-${categories[i].length*4}px)`}:{}}>{(data.rouge[categ[i]][rouge[type]][0]*100).toFixed(1)}%</p>
            <p className={styler(data.rouge[categ[i]][rouge[type]][1])} style={categories[i].length>4?{transform:`translateX(-${categories[i].length*2}px)`}:{}}>{(data.rouge[categ[i]][rouge[type]][1]*100).toFixed(1)}%</p>
            <p className={styler(data.rouge[categ[i]][rouge[type]][2])}>{(data.rouge[categ[i]][rouge[type]][2]).toFixed(1)} {i==1||i==3?'(x6)':null}{i==0||i==2?'(x8)':null}{i>3?'(x2)':null}</p>
        </div>
            );
        })}
        </>
    );
}