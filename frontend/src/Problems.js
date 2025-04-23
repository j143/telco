import React from 'react';
import { Link } from 'react-router-dom';

function Problems() {
  const [problems, setProblems] = React.useState([]);

  React.useEffect(() => {
    fetch('/problems')
      .then(response => response.json())
      .then(data => setProblems(data));
  }, []);

  return (
    <div>
      <h2>Problems</h2>
      <ul>
        {problems.map(problem => (
          <li key={problem.id}>
            <h3>{problem.title} - {problem.difficulty}</h3>
            <p>{problem.description}</p>
            <Link to={`/problems/${problem.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Problems;