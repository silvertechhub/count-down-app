import {React, useState, useEffect} from 'react';

export default function CountdownPage() {
    //handle the input data using useState
  const [handleDate, setHandleDate] = useState("")
  const [blank, setBlank] = useState(true)
  
  let thisYear = handleDate;

  //write the function that calculates the time remaining
 const calcTimeLeft = () =>{

   const difference = +new Date(thisYear) - +new Date();

   let timeLeft = {};

   if(difference > 0){
      timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60 )) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds:Math.floor((difference / 1000) % 60)

      };
   }
   return timeLeft;
 }
 const [timeLeft, setTimeLeft] = useState(calcTimeLeft)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calcTimeLeft)
    }, 1000);
    return () => clearTimeout(timer);
  })


  const timerComponent = [];
  Object.keys(timeLeft).forEach((interval) => {
    if(!timeLeft[interval]){
      return;
    }
    timerComponent.push(
      <span>{timeLeft[interval]}{interval} {""}</span>
    );
    }
    
     );
  


  return <div>
       <input className='setDate' type="date"  min="2022-01-29" 
       required onChange={(e) => setHandleDate(e.target.value) }/>
       <input className='setbutton' type="button" value="Set countdown" onClick={() => setBlank((s) => !s)}/>
       <input className='reset' type="button" value="Reset" onClick={() => setBlank(true)}/>
       <div style={{display: blank? "none" : "block"}} className='countdown'>
       {timerComponent.length ? timerComponent : <span>Time's up!</span>}
       </div>
  </div>;
}
