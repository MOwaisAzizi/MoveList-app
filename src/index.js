import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./Star";
import StarRating from "./Star";
import { useState } from "react";
import PracticeText from './PracticeText'

// function Test(){
//   const [moveRaing,setMovieRating] = useState(0)
//   return(
// <div>
// <StarRating maxStar={8}  onSetsetMovieRating = {setMovieRating} />
// <p> the move was rated {moveRaing} </p>
// </div>  
// )
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />

    {/* <Test /> */}
    {/* <PracticeText /> */}
    {/* <StarRating maxStar ={5} size = {150} defaultRating = {3}/> */}
    {/* <StarRating maxStar ={5} size={150} color="blue" defaultRating = {3}/> */}

    {/* <StarRating maxStar={5} size={150} color="blue"
      className='container' messages={['Terrible', 'Bad', 'Good', 'Great', 'Amazing']} /> */}
  </React.StrictMode>
);
