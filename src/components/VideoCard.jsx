import { AdvancedVideo } from '@cloudinary/react';
import { useEffect, useState,useRef } from 'react';
import { saveAs } from "file-saver";
import VideoPlayerWidget from "./VideoPlayerWidget";
import { auto,fill } from '@cloudinary/url-gen/actions/resize';
const VideoCard = ({asset}) => {
 const{public_id,display_name,version}=asset
  const[retries,setRetries]=useState(0)
  const[errorOccured,setErrorOccured]=useState(false)
  const [isLoading,setIsLoading]=useState(false)

  const downloadOGVideo=()=>{
    const vidSrc=`https://res.cloudinary.com/${import.meta.env.VITE_CLOUD_NAME}/video/upload/v${version}/${public_id}.mp4`
    saveAs(vidSrc,public_id)
  }

  useEffect(()=>{
    if(errorOccured)
    {
      const intervalId = setInterval(()=>{
        setRetries(prev=> prev+1)
      },5000)
      return ()=> clearInterval(intervalId)
    }
  },[errorOccured])
  useEffect(()=>{
    if(retries>0 && !isLoading){
      setIsLoading(false)
    }
  },[retries])
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleMetadataLoad = () => {
      setIsLoading(false)
      setErrorOccured(false)
      console.log("Metadata cargada:", videoElement.duration);
    };

    const handleVideoError = error=>{
      if(error?.player?.videojs?.error_?.statusCode === 423)
        if(!errorOccured){
          setErrorOccured(true)
          setIsLoading(true)
          setRetries(prev=>prev+1)
          console.log('retry video load...')
        }
    }

    videoElement.addEventListener("loadedmetadata", handleMetadataLoad);
    videoElement.addEventListener("error", handleVideoError);

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleMetadataLoad);
      videoElement.removeEventListener("error", handleVideoError);
    };
  }, []);


  return (<>
    <article className='card'>
      <div className="title-container">
        <h4><span className='emoji'>▶</span>{public_id||'noname'}</h4>
        <h4>⫶</h4>
      </div>
      {isLoading && <p>Loading...</p>}
      <div className='video-container' style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
      <VideoPlayerWidget
      src={public_id}
      id={public_id}
      data-cld-public-id={public_id}
      playerConfig={
        {
          height:'300',
          width:'300',
          muted:true,
          controls:true,
          loop:true,
          sourceTypes:["hls", "webm/vp9", "mp4/h265"],
          posterOptions:{
            transformation: { width: 300,height:300, crop: 'fill' }
          }
        }
      }
      sourceConfig={{info:{title: public_id||'notitle'}}}

      // crop={fill}
      // gravity={auto}
      // alt={display_name}
      // transformation={{width:300,height:300}}
      // onError={handleVideoError}
      // onMetadataLoad={handleMetaDataLoad}
      />
      </div>
      <div className="controls-container">
        <div className="control-container"><button onClick={downloadOGVideo}>⤓ download original</button></div>
      </div>
    </article>
  </>)
}
export default VideoCard