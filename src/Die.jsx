import React from 'react'

export default function Die(props){
    const style = {
        backgroundColor: props.isHeld ? '#59E391': ""
    }
    return (
        <h1 className="dice" style={style} onClick={() => props.hold(props.diceID)}>{props.digit}</h1>
    )
}