import React from 'react';
import { useParams } from 'react-router-dom';

function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = React.useState(null);

  React.useEffect(() => {
    fetch(`/problems/${id}`)
      .then(response => response.json())
      .then(data => setProblem(data));
  }, [id]);

  if (!problem) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{problem.title}</h2>
      <p><strong>Difficulty:</strong> {problem.difficulty}</p>
      <p>{problem.description}</p>
      <h3>Test Cases</h3>
      <ul>
        {problem.testCases.map((testCase, index) => (
          <li key={index}>
            <strong>Input:</strong> {JSON.stringify(testCase.input)}<br />
            <strong>Expected Output:</strong> {JSON.stringify(testCase.expected)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemDetails;