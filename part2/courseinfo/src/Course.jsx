const Header = (props) => <h2>{props.text}</h2>

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
)
}

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = (props) => {
  const courses = props.courses // Acquire course from props

  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
            
          <Header text={course.name} />

          {course.parts.map(part => (
            <Part key={part.id} part={part} />
          ))}
       
          <strong>
            Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
          </strong>
        </div>
      ))}       
    </div>
  )
}

export default Course
