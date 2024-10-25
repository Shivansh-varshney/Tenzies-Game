import { useState, useEffect } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'

export default function App() {

  const [die, setDie] = useState(DieArray())
  const [tenzies, setTenzies] = useState(false)

  useEffect(function(){
    
    const allDiceHeld = die.every(dice => dice.isHeld)
    const value = die[0].value
    const allValuesAreSame = die.every(dice => dice.value === value)
    
    if(allDiceHeld && allValuesAreSame){
      setTenzies(true)
      wonGame()
    }
  }, [die])

  function wonGame(){
    document.getElementById('result').innerText = "YOU WON!!"
  }

  function resetGame(){
    document.getElementById('result').innerText = ""
    setDie(DieArray())
    setTenzies(false)
  }

  function DieArray(){

    let dieArray = []
    for(let i=1; i<=10; i++){
      dieArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
    }

    return dieArray
  }

  function newDie(){
    setDie(oldDie => oldDie.map(dice => {
      return !dice.isHeld ? {...dice, value: Math.floor(Math.random() * 6) + 1}: dice
    }))
  }

  function hold(id) {
    setDie(oldDie => oldDie.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld}: dice
    }))
  }

  const DieElements = die.map(dice => {
    return <Die digit={dice.value} key={dice.id} isHeld={dice.isHeld} diceID={dice.id} hold={hold}/>
  })
  
  return (
    <>
    <main>
    {tenzies && <Confetti />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
        {DieElements}
      </div>
      <h3 id='result'></h3>
      <button id='rollButton' onClick={ tenzies ? resetGame : newDie}>{tenzies ? "New Game ":"Roll"}</button>
    </main>
    </>
  )
}