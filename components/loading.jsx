import Lottie from 'react-lottie';
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
          options={defaultOptions}
          height={800}
          width={800}
        />
      </div>
    );
  }