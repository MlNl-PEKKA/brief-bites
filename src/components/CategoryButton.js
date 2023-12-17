export default function CategoryButton({id, categ, title, setCateg}){
    function handleClick(){
        setCateg(id)
    }
    if(id===categ)
        return <button style={{backgroundColor:'white',color:'black'}}>{title}</button>
    return <button onClick={handleClick}>{title}</button>
}