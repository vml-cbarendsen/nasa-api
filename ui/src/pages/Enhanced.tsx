import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";

import {getResponse} from '../services/index';

export interface IEnhancedProps {}

const Enhanced: React.FC<IEnhancedProps> = () => {
  const { date, imageName  } = useParams();
  const navigate = useNavigate();

  const [listOfDates, setListOfDates] = useState([]);
  const [listOfImages, setListOfImages] = useState([]);
  const [fullPathToImage,setFullPathToImage] = useState('');

  useEffect(()=>{
    getResponse('/enhanced').then((res)=>{
      console.log('list of dates res', res.data);
     
      setListOfDates(res.data.data);  
    });
  }, []);

  useEffect(()=>{
    getResponse(`/enhanced/${date}`).then((res)=>{
      setListOfImages(res.data.data);  
    });
  },[date]);

  useEffect(()=>{
    getResponse(`/enhanced/${date}/image/${imageName}`).then((res)=>{
      console.log('image response', res.data.path);
      setFullPathToImage(res.data.path);  
    });
  }, [imageName]);

  console.log('list of dates', listOfDates);
  console.log('image path', fullPathToImage);

  // ONLY DATE ROUTE
  if(date && !imageName) {
    // [TODO] make call to /enahnced/:date
    
    return (
      <>
        <button onClick={()=>navigate(-1)}>
          Go back
        </button>
        <h2>You will need to choose a date</h2>
        {listOfImages && (
          listOfImages?.map((d:{caption:string,image:string}, idx:number) =>
            <li key={idx}>
              <Link to={`/enhanced/${date}/image/${d.image}`}>{d.image}</Link>
              <p>{d.caption}</p>
            </li>
          )
        )}
        <button onClick={()=>navigate('/')}>
          Go back home
        </button>
      </>
    )
  }

  // DATE && IMAGE ROUTE 
  if(date && imageName) {
    // [TODO] make call to /enahnced/:date/image/:imageName
    return (
      <>
        <button onClick={()=>navigate(-1)}>
          Go back
        </button>
        <img width="100%" src={fullPathToImage} />
        <button onClick={()=>navigate('/')}>
          Go back home
        </button>
      </>
    )
  }

  // if(date && imageName)
  console.log(`${date} and ${imageName}`);
  return (
    <>
      <button onClick={()=>navigate(-1)}>
        Go back
      </button>
      <h2>You will need to choose a date</h2>
      {listOfDates && (
        listOfDates?.map((d:{date:string}, idx:number) =>
          <li key={idx}>
            <Link to={`/enhanced/${d.date}`}>{d.date}</Link>
          </li>
        )
      )}
      <button onClick={()=>navigate('/')}>
        Go back home
      </button>
    </>
  )
};

export default Enhanced;



// import React, { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom";

// // Video to reference for quick understanding react-router-dom
// // https://www.youtube.com/watch?v=2aumoR0-jmQ

// export interface ITemplatePageProps {}

// const TemplatePage: React.FC<ITemplatePageProps> = props => {
//   const [ message, setMessage ] = useState('No')
//   const { number } = useParams();

//   // example user of navigating with hook instead of <Link />
//   const navigate = useNavigate();

//   useEffect(()=>{
//     if( number )
//       setMessage(`The number is ${number}`);
//     else
//       setMessage(`No number was provided`);
//   },[])
//   return (
//     <div>
//       <p>This is a template page with a setup route and example
//         how to handle with parameters. Reference App.tsx how
//         route was setup.
//       </p>
//       <p>{message}</p>
//       <button onClick={()=>navigate('/')}>
//         Go back home
//       </button>
//     </div>
//   )
// };

// export default TemplatePage;