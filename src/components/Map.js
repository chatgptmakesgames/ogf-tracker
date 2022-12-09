import React, { useEffect } from "react";
import { useState } from "react";
// import ReactDOM from 'react-dom/client'


// const root = ReactDOM.createRoot(
//     document.getElementById('root')
//   );

  
export default function Map(){
    const [time, setTime] = useState();

    useEffect(() => {
        setInterval(() => {
            setTime(() => new Date().toUTCString().toString().split(" ")[4]);
        }, 1000);
    });

    return(
        <div className="Map">
            <p>this is another test</p>
            <p>{time}</p>
            <p>test time works in UTC</p>
        </div>
    );
}

// export default Map;
