import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = React.useState(null);
  const [solutionCode, setSolutionCode] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);

  React.useEffect(() => {
    fetch(`/problems/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch problem details');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched problem:', data);
        setProblem({ ...data, testCases: data.testCases || [] });
      })
      .catch(error => {
        console.error('Error fetching problem details:', error);
        setProblem({}); // Set an empty object to avoid breaking the UI
      });
  }, [id]);

  const handleSubmit = () => {
    console.log('Submitting solution:', { problemId: parseInt(id, 10), solutionCode });
    fetch(`/solutions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemId: parseInt(id, 10), solutionCode }),
    })
      .then(response => response.json())
      .then(data => setEvaluationResult(data));
  };

  if (!problem || !problem.testCases) {
    return <p>Loading or no test cases available...</p>;
  }

  const testCases = problem.testCases || [];

  return (
    <div>
      <h2>{problem.title}</h2>
      <p><strong>Difficulty:</strong> {problem.difficulty}</p>
      <p>{problem.description}</p>
      <h3>Test Cases</h3>
      <ul>
        {testCases.map((testCase, index) => (
          <li key={index}>
            <strong>Input:</strong> {JSON.stringify(testCase.input)}<br />
            <strong>Expected Output:</strong> {JSON.stringify(testCase.expected)}
          </li>
        ))}
      </ul>

      <h3>Submit Your Solution</h3>
      <textarea
        placeholder="Write your solution code here..."
        value={solutionCode}
        onChange={(e) => setSolutionCode(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit Solution</button>

      {evaluationResult && (
        <div>
          <h3>Evaluation Result</h3>
          {evaluationResult.results.map((result, index) => (
            <div key={index}>
              <p><strong>Test Case {index + 1}:</strong></p>
              <p>Input: {JSON.stringify(result.input)}</p>
              <p>Expected: {JSON.stringify(result.expected)}</p>
              <p>Output: {JSON.stringify(result.output)}</p>
              <p>Passed: {result.passed ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProblemDetails;