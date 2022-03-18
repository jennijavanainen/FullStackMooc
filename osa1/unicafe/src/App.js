import { useState } from 'react'

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [sum, setSum] = useState(0)
    const [positive, setPositive] = useState(0);

    const goodPlus = () => {
        setGood(good + 1)
        setTotal(total + 1)
        setSum(sum + 1)
        setPositive(positive + 1)
    }
    const neutralPlus = () => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
    }
    const badPlus = () => {
        setBad(bad + 1)
        setTotal(total + 1)
        setSum(sum -1)
    }


  return (
      <div>
          <h2>Give feedback</h2>
          <Button onClick={goodPlus} text={"good"} />
          <Button onClick={neutralPlus} text={"neutral"} />
          <Button onClick={badPlus} text={"bad"} />
          <h2>Statistics</h2>
          <Statistics good={good} neutral={neutral} bad={bad} total={total} sum={sum} positive={positive} />
      </div>
  )
}

const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <StatisticLine text="Good" value={props.good} />
            <StatisticLine text="Neutral" value={props.neutral} />
            <StatisticLine text="Bad" value={props.bad} />
            <StatisticLine text="All" value={props.total} />
            <StatisticLine text="Average" value={props.sum / props.total} />
            <StatisticLine text="Positive" value={props.positive / props.total * 100 + " %"} />
        </div>
    )


}

const StatisticLine = (props) => {
    return (
        <p>{props.text} {props.value} </p>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}


export default App
