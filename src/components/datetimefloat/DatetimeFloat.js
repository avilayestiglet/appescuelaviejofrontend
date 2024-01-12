import React, { useEffect, useState } from "react";  
import "./datetimefloat.css";

const Datetimefloat = () => {  
    const [date, setDate] = useState({ dateString: null });

    

    const formatAMPM = (date) => {
        const year = date.getFullYear().toLocaleString();
        const day = date.getDay().toLocaleString().padStart(2, '0');
        const month = date.getMonth().toLocaleString().padStart(2, '0');
        var hours = date.getHours().toLocaleString();
        var minutes = date.getMinutes().toLocaleString();
        var seconds = date.getSeconds().toLocaleString().padStart(2, '0');
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;

        var strTime = `
        ${day}/${month}/${year}\n\n 
        ${hours}:${minutes}:${seconds}:${ampm}`;
        return strTime;
    }

    useEffect(() =>{
        setInterval(()  => {
            const date = new Date();
            const dateString = formatAMPM(date);

            setDate({
                dateString
            })
          }, 1000)
      
    });
    

    return (<div className="datetimefloat">
    {date.dateString}
  </div>)


};

export default Datetimefloat;