import Lottie from 'lottie-react'
import animationData from "./../lotties/loading.json";
export default function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div style={{height:"100vh",width:"100vw",color:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <Lottie 
          animationData={defaultOptions.animationData}
          loop={defaultOptions.loop}
        />
        Loading...
      </div>
    );
  }