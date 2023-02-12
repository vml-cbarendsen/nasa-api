import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {getResponse} from '../services/index';

export interface IServiceDataProps {
  hdurl: string;
  date: string;
  title: string;
  explanation: string;
}

export interface ILandingProps {}

const Landing: React.FC<ILandingProps> = () => {
  const [serviceData, setServiceData] = useState<IServiceDataProps>();
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  const getNewItem = (count:number = 0) => {
    const requestPath = count > 0 ? `/apod/${count}` : '/apod';

    getResponse(requestPath).then((res)=>{
      const resData = count > 0 ? res.data.data[0] : res.data.data;
      setServiceData(resData);  
    }).finally(()=>{
      setIsLoaded(true);
    });
  }

  useEffect(()=>{
    getNewItem();
  }, []);



  return (
    <div className="App">
      <button onClick={()=>getNewItem(1)}>
        new image
      </button>
      <h2>{serviceData?.title}</h2>
      <div>
        {isLoaded && serviceData && (<img src={serviceData?.hdurl} />)} 
      </div>
      <p>
        {serviceData?.explanation}
      </p>
      <p>{serviceData?.date}</p>
      <button onClick={()=>navigate('/enhanced')}>
        View Enhanced Earth Images
      </button>
    </div>
  );
};

export default Landing;
