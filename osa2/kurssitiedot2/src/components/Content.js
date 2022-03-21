import Part from './Part'

const Content =({content}) => {
    const total = content.reduce((sum, part) =>
    sum + part.exercises, 0)
    return (
        <div>
            {content.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
            <p><strong>total of {total} exercises</strong></p>
        </div>
    )
}
export default Content