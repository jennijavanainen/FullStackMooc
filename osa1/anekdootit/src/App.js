import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(anecdotes.length + 1).join("0").split("").map(parseFloat))

    //const points = new Array(anecdotes.length + 1).join("0").split("").map(parseFloat)

    const nextAnecdote = () => {
        let random = Math.floor(Math.random() * anecdotes.length)
        console.log(random)
        setSelected(random)
    }

    const vote = () => {
        const copy = [...points]
        copy[selected] += 1
        console.log(copy)
        setPoints(copy)

    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
            <Button onClick={vote} text={"vote this anecdote"} />
            <Button onClick={nextAnecdote} text={"next anecdote"} />
            <h2>Anecdote with most votes</h2>
            <Results points={points} anecdotes={anecdotes}/>
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const Results = (props) => {
    let maxVote = Math.max(...props.points)
    console.log(maxVote)
    let maxIndex = props.points.indexOf(maxVote)

    if (maxVote === 0) {
        return (
            <p>No anecdotes have been voted yet</p>
        )
    }
    return (
        <div>
            <p>{props.anecdotes[maxIndex]}</p>
            <p>has {maxVote} votes</p>
        </div>
    )

}

export default App