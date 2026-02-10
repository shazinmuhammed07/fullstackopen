import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, veryBad }) => {
  const total = good + neutral + bad + veryBad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  const score =
    good * 1 +
    neutral * 0 +
    bad * -1 +
    veryBad * -2

  const average = score / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="very bad" value={veryBad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={`${positive.toFixed(2)} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [veryBad, setVeryBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Button text="very bad" onClick={() => setVeryBad(veryBad + 1)} />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        veryBad={veryBad}
      />
    </div>
  )
}

export default App
