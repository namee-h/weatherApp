import React, {useState,useEffect} from 'react'
import { format } from 'date-fns'

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(format(new Date(),"HH:mm:ss"));
    useEffect(()=>{
        const intervalId = setInterval(() => {
            setCurrentTime(format(new Date(),"HH:mm:ss"));
        }, 1000);

        return () =>clearInterval(intervalId);
    },[])
  return (
    <span>{currentTime}</span>  
  )
}

export default Clock
