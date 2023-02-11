import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {getResponse} from './services';


export interface IServiceDataProps {
  data: any;
}


function App() {
  const [serviceData, setServiceData] = useState<IServiceDataProps>({data:{}});
  const [isLoaded, setIsLoaded] = useState(false);

  const getNewItem = () => {
    getResponse('/apod').then((res)=>{
      console.log('res', res.data);
      setIsLoaded(true);
      setServiceData(res.data);  
    });
  }

  useEffect(()=>{
    getNewItem();
    // getResponse('/apod').then((res)=>{
    //   console.log('res', res.data);
    //   setIsLoaded(true);
    //   setServiceData(res.data);  
    // });
    console.log('serviceData', serviceData)
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {isLoaded && serviceData && (<img src={serviceData.data[0].url} />)} 
        <button onClick={()=>getNewItem()}>
          new image
        </button>
      </header>
    </div>
  );
}

export default App;
