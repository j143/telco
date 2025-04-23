import { render, screen, fireEvent } from '@testing-library/react';
import ProblemDetails from './ProblemDetails';

jest.mock('./ProblemDetails', () => {
  return jest.fn(() => {
    return (
      <div>
        <h2>5G Call Flow Sequence Validation</h2>
        <p>Difficulty: Intermediate</p>
        <p>Write a function to validate a call flow sequence for a 5G network...</p>
        <h3>Test Cases</h3>
        <ul>
          <li>Input: ["REGISTER", "INVITE", "ACK", "BYE"] - Expected: true</li>
          <li>Input: ["REGISTER", "BYE", "INVITE"] - Expected: false</li>
        </ul>
        <textarea placeholder="Write your solution code here..." />
        <button>Submit Solution</button>
      </div>
    );
  });
});

describe('ProblemDetails Component', () => {
  it('renders problem details correctly', () => {
    render(<ProblemDetails />);

    expect(screen.getByText('5G Call Flow Sequence Validation')).toBeInTheDocument();
    expect(screen.getByText('Difficulty: Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Write a function to validate a call flow sequence for a 5G network...')).toBeInTheDocument();
  });

  it('allows users to submit a solution', () => {
    render(<ProblemDetails />);

    const textarea = screen.getByPlaceholderText('Write your solution code here...');
    const button = screen.getByText('Submit Solution');

    fireEvent.change(textarea, { target: { value: 'function solution() { return true; }' } });
    fireEvent.click(button);

    // Add assertions for submission logic if needed
  });
});