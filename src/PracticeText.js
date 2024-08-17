import React, { useState } from "react";





export default function PracticeText() {

    return (
        <div>
            <ExpenderText>
                this is a text for practicing al we learned
                in this section and we should try to avoid mistakes and do out best for geting our goals so lets
                in this section and we should try to avoid mistakes and do out best for geting our goals so lets
                learn more and more

            </ExpenderText>

            <ExpenderText collapsedNumberWords={20}
                expandButtonText='show text'
                collapseButtonText='collape text'
                buttonColor='#ff6622'
            >
                this is a text for practicing al we learned
                in this section and we should try to avoid mistakes and do out best for geting our goals so lets
                in this section and we should try to avoid mistakes and do out best for geting our goals so lets
                learn more and more
            </ExpenderText>

            <ExpenderText expended={true} className='last'>
                this is a text for practicing al we learned
                in this section and we should try to avoid mistakes and do out best for geting our goals so lets
                learn

                in this section and we should try to avoid mistakes and do out best for geting our goals so lets
                learn more and more
            </ExpenderText>
        </div>
    )
}


function ExpenderText({ children, collapsedNumberWords = 10, buttonColor = 'blue', expandButtonText = 'show More', collapseButtonText = 'show Less', className, expended = false }) {
    const [isExpended, setIsExpende] = useState(expended)

    const displaytext = isExpended ? children : children.split(' ').slice(0, collapsedNumberWords).join(' ') + '...'
    const buttonStyle = {
        color: buttonColor,
        marginLeft: '5px',
        backgroundColor: 'white',
        border: 'none'
    }

    return (
        <div className={className}><span>{displaytext}</span>
            <button style={buttonStyle} onClick={() => setIsExpende(expend => !expend)}>{ isExpended ? collapseButtonText : expandButtonText } </button>
        </div>
    )
}