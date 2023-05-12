export default function Clock({color}){
    return(
        <svg style={{aspectRatio:1,width:'1.5rem'}}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8V12L15 15" stroke={color} strokeWidth="2" strokeLinecap="round"></path> <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"></circle> </g></svg>
    );
}