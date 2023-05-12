import { React, createContext,  useState } from "react";

export const NewsContext = createContext();

export default function NewsContextProvider({children}){

    const [summaries, setSummaries] = useState(null);
    const [sticky, setSticky] = useState('6rem');
    
    const value = {
        summaries,setSummaries,sticky,setSticky
    }

    return(<NewsContext.Provider value={value}>
        {children}
    </NewsContext.Provider>);
}