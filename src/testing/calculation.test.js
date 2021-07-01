import { calculateRevenue, calculateExpenses, calculateGrossProfitMargin, calculateNetProfitMargin, calculateWorkingCapitalRatio } from '../helpers/calculator'
import { convertToCurrency, convertToPercentage } from '../helpers/helperFunctions'
import { data } from './testData.json'


test('testing calculateRevenue function by using know data and known result', () => {
    const revenue = convertToCurrency(calculateRevenue(data));
    const expected = '$20,000';
    expect(revenue).toBe(expected);
});

test('testing calculateExpenses function by using know data and known result', () => {
    const expenses = convertToCurrency(calculateExpenses(data))
    const expected = '$10,000';
    expect(expenses).toBe(expected);
});


test('testing calculateGrossProfitMargin function by using know data and known result', () => {
    const grossProfitMargin = convertToPercentage(calculateGrossProfitMargin(data))
    const expected = '5.0%'
    expect(grossProfitMargin).toBe(expected);
});

test('testing calculateNetProfitMargin function by using know data and known result', () => {
    const netProfitMargin = convertToPercentage(calculateNetProfitMargin(data))
    const expected = '50.0%';
    expect(netProfitMargin).toBe(expected);
});

test('testing calculateWorkingCapitalRatio function by using know data and known result', () => {
    const workingCaptialRatio = convertToPercentage(calculateWorkingCapitalRatio(data))
    const expected = '-32.5%'
    expect(workingCaptialRatio).toBe(expected);
});
