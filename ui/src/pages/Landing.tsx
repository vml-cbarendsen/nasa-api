import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {getResponse} from '../services/index';

export interface IServiceDataProps {
  data: any;
}

export interface ILandingProps {}

const Landing: React.FC<ILandingProps> = () => {
  const [serviceData, setServiceData] = useState<IServiceDataProps>({data:{}});
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

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
      <button onClick={()=>getNewItem()}>
        new image
      </button>
      <header className="App-header">
        {isLoaded && serviceData && (<img src={serviceData.data[0].url} />)} 
      </header>
      <button onClick={()=>navigate('/enhanced')}>
        View Enhanced Earth Images
      </button>
    </div>
  );
};

export default Landing;
