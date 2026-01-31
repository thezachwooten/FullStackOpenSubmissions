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

const StatisticLine = (props) => {
  return (
    <div>
      <Display text={props.text} value={props.value}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const calcAvg = (props) => {
    const values = Object.values(props) // acqurie values from feedbackCount obj
    const sum = values.reduce((acc, num) => acc + num, 0)
    if (sum === 0) return 0;
    const score = (props.good * 1) + (props.neutral * 0) + (props.bad * -1)
    return score / sum
  }

  const percentPositive = (props) => {

    const values = Object.values(props)
    const sum = values.reduce((acc, num) => acc + num, 0)
    return sum ? (props.good / sum) * 100 : 0 
  }

  if (good == 0 && neutral == 0 && bad == 0){
    return (
      <div>
        <Header text="Statistics"/>
        <p> No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <Header text="Statistics"/>
        <StatisticLine text="Good:" value={good}/> 
        <StatisticLine text="Neutral:" value={neutral}/> 
        <StatisticLine text="Bad:" value={bad}/> 
        <StatisticLine text="All:" value={good + bad + neutral} />
        <StatisticLine text="Average:" value={calcAvg({good, neutral, bad})}/>
        <StatisticLine text="Percent positive:" value={percentPositive({good, neutral, bad})}/>
      </div>
    )
  }
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
        <Button onClick={increaseGood} text="Good"/>
        <Button onClick={increaseNeutral} text="Neutral"/>
        <Button onClick={increaseBad} text="Bad"/>
      </div>

      <div className="statistics">
        <Statistics good={feedbackCount.good} neutral={feedbackCount.neutral} bad={feedbackCount.bad}/>        
      </div>
    </>
  )
}

export default App
