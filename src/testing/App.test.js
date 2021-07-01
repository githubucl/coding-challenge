import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from '../App';
import Question from '../components/Question'

test('renders correct financial metrics', () => {
  render(<App />);
  const revenueElement = screen.getByText(/Revenue/i);
  expect(revenueElement).toBeInTheDocument();
  const expenseElement = screen.getByText(/Expenses/i);
  expect(expenseElement).toBeInTheDocument();
  const grossProfitMarginElement = screen.getByText(/Gross Profit Margin/i);
  expect(grossProfitMarginElement).toBeInTheDocument();
  const netProfitMarginElement = screen.getByText(/Net Profit Margin/i);
  expect(netProfitMarginElement).toBeInTheDocument();
  const workingCaptialRatioElement = screen.getByText(/Working Capital Ratio/i);
  expect(workingCaptialRatioElement).toBeInTheDocument();
});

test('can open accordion items to see the contents', () => {
  const metrics = { metric: 'P/E', result: '30', };
  const { getByText, queryByText, getByTestId } = render(
    <Question {...metrics} />
  );
  const btn = getByTestId('btn')
  expect(queryByText(metrics.result)).toBeNull();
  fireEvent.click(btn);
  expect(getByText(metrics.result)).toBeInTheDocument();
});

