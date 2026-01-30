import { useState } from 'react'

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Display = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

function App() {
  const [feedbackCount, setFeedbackCount] = useState({
    good: 0, neutral: 0, bad: 0
  })
  
  const increaseGood = () => {
    setFeedbackCount({...feedbackCount, good: feedbackCount.good + 1})
  }

  const increaseNeutral = () => {
    setFeedbackCount({...feedbackCount, neutral: feedbackCount.neutral + 1})
  }

  const increaseBad = () => {
    setFeedbackCount({...feedbackCount, bad: feedbackCount.bad + 1})
  }

  return (
    <>
      {/* DO SHIT HERE */}
      <div className="feedback">
        <Header text="Give feedback"/>
        <Button onClick={increaseGood}text="Good"/>
        <Button onClick={increaseNeutral} text="Neutral"/>
        <Button onClick={increaseBad} text="Bad"/>
      </div>

      <div className="statistics">
        <Header text="Statistics"/>
        <Display text="good" value={feedbackCount.good}/> 
        <Display text="neutral" value={feedbackCount.neutral}/> 
        <Display text="bad" value={feedbackCount.bad}/> 
      </div>
    </>
  )
}

export default App
