const categories = ['Bart', 'ChatGPT','Pegasus' , 'KLSum', 'LexRank', 'LSA', 'Luhn'];
const categ = ['bart', 'chatGPT','pegasus' , 'klsum', 'lexrank', 'lsa', 'luhn'];
const rouge = ['rouge1','rouge2','rougeL']
import styles from './Table.module.css';
export default function Table2({data, type}){
    function styler(v){
        if(v>=0.7)
            return styles.green
        else if(v>=0.4)
            return styles.yellow
        else
            return styles.red
    }
    return(
        <>
        <div style={{transform:'translateX(30px)',padding:'2rem 0',display:'flex',width:'100%',alignItems:'center',justifyContent:'space-around'}}>
            <h2>Method</h2>
            <h2>Summary score</h2>
            <h2>Length reduction</h2>
            <h2>Brief-bite score</h2>
        </div>
        {categ.map((r,i)=>{
            return(
            <div key={categ[i]} style={{padding:'1rem 0',display:'flex',width:'100%',alignItems:'center',justifyContent:'space-around',fontSize:'1.5rem',borderTop:'1px solid rgba(255, 255, 255, 0.19)'}}>
            <p>{categories[i]}</p>
            <p className={styler(data[r].final_score)} style={categories[i].length>4?{transform:`translateX(-${categories[i].length*4}px)`}:{}}>{(data[r].final_score*10).toFixed(1)}</p>
            <p className={styler((data.text.length-data[r].summary.length)/(data.text.length))} style={categories[i].length>4?{transform:`translateX(-${categories[i].length*2}px)`}:{}}>{((data.text.length-data[r].summary.length)/(data.text.length)*100).toFixed(1)}%</p>
            <p className={styler((((data.text.length-data[r].summary.length)/(data.text.length))/2+(data[r].final_score)/2))} style={categories[i].length>4?{transform:`translateX(-${categories[i].length*1}px)`}:{}}>{(((data.text.length-data[r].summary.length)/(data.text.length)*10)/2+(data[r].final_score*10)/2).toFixed(1)}</p>
        </div>
            );
        })}
        </>
    );
}