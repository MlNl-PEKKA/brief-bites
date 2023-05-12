import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import styles from './Navbar.module.css';
import { useDetectScroll } from "@smakss/react-scroll-direction";
import { useContext } from "react";
import { NewsContext } from "@/context/newsContext";
export default function Navbar(){
    const { setSticky } = useContext(NewsContext);
    const [navBgColor, setNavBgColor] = useState('transparent');
    const [nav, setNav] = useState(styles.navbarContainer);
    const [scrollDir] = useDetectScroll({});
    const handleScroll = () => {
        if(navBgColor==='transparent'&&window.pageYOffset>100)
            {setNavBgColor('black');}
        else
            {setNavBgColor('transparent');  }
    };
    useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    },[]);
    useEffect(()=>{
        if(scrollDir==='up')
            {setNav(styles.navbarContainer);setSticky('-1px');}
        else if(scrollDir==='down')
            {setNav(styles.navbarContainerFalse);setSticky('-81px');}
    },[scrollDir])
    return(
    <div className={nav} style={{backgroundColor:navBgColor}}>
        <Link style={{margin:'0 14rem 0 0'}} href="/"><Logo/></Link>
        <Link className={styles.navbarLink} style={{margin:'0 2.5rem'}} href="/">Home</Link>
        <a className={styles.navbarLink} style={{margin:'0 2.5rem'}} href="#news">News</a>
        <Link className={styles.navbarLink} style={{margin:'0 2.5rem'}} href="https://huggingface.co/">Resources</Link>
        <Link className={styles.navbarLink} style={{margin:'0 2.5rem'}} href="https://github.com/PunithG105/brief-bites">Site repository</Link>
        <Link className={styles.navbarLink} style={{margin:'0 2.5rem'}} href="https://github.com/PunithG105/brief-bites-api">API repository</Link>
        <Link className={styles.navbarLink} style={{margin:'0 2.5rem'}} href="/summarize"><button>Summarize</button></Link>
    </div>
    )
}