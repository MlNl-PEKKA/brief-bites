import Cookie from "@/images/cookie";

export default function Logo(){
    return(
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Cookie/>
            <span style={{fontWeight:800,fontSize:'1.5rem'}}>Brief-Bites</span>
            </div>
    );
}