const Header = (props) => <h1>{props.text}</h1>

const Content = (props) => (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </div>
)

const Part = (props) => {
  console.log('Part Props: ', props)
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
)
}

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = (props) => {
  const course = props.course // Acquire course from props

  const parts = course.parts // Acquire parts from course

  return (
    <div>
      <Header text={course.name} />
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
