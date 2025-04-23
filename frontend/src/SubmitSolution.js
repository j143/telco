import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function SubmitSolution() {
  const { id } = useParams();
  const [solutionCode, setSolutionCode] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleSubmit = () => {
    fetch(`/solutions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemId: parseInt(id, 10), solutionCode }),
    })
      .then(response => response.json())
      .then(data => setEvaluationResult(data));
  };

  return (
    <div>
      <h2>Submit Solution for Problem {id}</h2>
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

export default SubmitSolution;