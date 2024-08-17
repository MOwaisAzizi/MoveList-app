import { paste } from "@testing-library/user-event/dist/paste"
import { useState } from "react"
import PropType from 'prop-types'

const containerStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '50px',
    width: '100%',
    color: 'black',
}
const startCountaierStyle = {
    display: 'flex',
    gap:'10px'
}

////check validating
StarRating.propType = {
    maxStar : PropType.number,
    size : PropType.number,
    color : PropType.string,
    class : PropType.string,
    default : PropType.number,
    onSetsetMovieRating : PropType.number,
    messages : PropType.array,
}

export default function StarRating({ maxStar = 7, color = 'red', size = 100,
 clasName = '',messages = [], defaultRating = 0, onSetsetMovieRating }) {
    const paStyle = {
        margin: '0',
        lineHight: '1',
        color,
        size:`${size}px`
    }

    const [rating, setRating] = useState(defaultRating)
    const [tempRating,setTempRatin] = useState(0)

    function handleRating(rating) {
        setRating(rating)
        // onSetsetMovieRating(rating)
    }

    return (
        <div style={containerStyle} className={clasName}>
            <div style={startCountaierStyle}>{
                Array.from({ length: maxStar }, (_, i) => {
                    return <Star onRateClick={() => handleRating(i + 1)}
                     mouseOver = {() => setTempRatin(i+1)} mouseOut={()=>setTempRatin(0)}
                     full = {tempRating ? tempRating >= i+1 : rating >= i+1 } color={color} size = {size}/>
                })
            }</div>
            <p style = {paStyle}>{messages.length === maxStar ? messages[tempRating ? tempRating-1 : rating-1] : tempRating || rating || ''}</p>
        </div>
    )
}

//useble component if you wana to make it availible as a library
function Star({ onRateClick, full,mouseOver,mouseOut,color,size }) {
    const startStyle = {
        display: 'block',
        color,
        size : `${size}px`,
        cursor: 'pointer',
    }
    return (
        <div>
                <span style={startStyle} role="button" onClick={onRateClick} onMouseEnter={mouseOver} onMouseLeave={mouseOut}
                > {full ? '⭐' : '✡'}</span>
        </div>

    )
}


{/* <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg> */}


// EMPTY STAR

{/* <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg> */}