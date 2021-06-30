import { DEBIT, CREDIT, BANK, CURRENT, CURRENT_ACCOUNTS_PAYABLE, CURRENT_ACCOUNTS_RECEIVABLE, SALES, REVENUE, EXPENSE, ASSETS, LIABILITY, } from '../constants/constants';
import { data } from '../data.json';
import { filteringAccounts, sum, convertToCurrency, convertToPercentage } from './helperFunctions'

/**
 * This should be calculated by adding up all the values under total_value where the account_category field is set to revenue
 */
const calculateRevenue = () => {
    //paramObject is an object for specifying the parameters for filtering
    const paramObject = {
        'account_category': [REVENUE]
    }
    const accounts = filteringAccounts(data, paramObject)

    return sum(accounts)
}

/**
 * This should be calculated by adding up all the values under total_value where the account_category field is set to expense
 */

const calculateExpenses = () => {
    const paramObject = {
        'account_category': [EXPENSE]
    }
    const accounts = filteringAccounts(data, paramObject)

    return sum(accounts)
}

/**
 * This is calculated in two steps: first by adding all the total_value fields where the account_type is set to sales and the value_type is set to debit; then dividing that by the revenue value calculated earlier to generate a percentage value.
 */
const calculateGrossProfitMargin = () => {
    const paramObject = {
        'account_type': [SALES],
        'value_type': [DEBIT],
    }
    const accounts = filteringAccounts(data, paramObject)

    return sum(accounts)
}

/**
 * This metric is calculated by subtracting the expenses value from the revenue value and dividing the remainder by revenue to calculate a percentage.
 */
const calculateNetProfitMargin = () => {
    const revenue = calculateRevenue()
    const expenses = calculateExpenses()
    return (revenue - expenses) / revenue
}
/**
 * calculating the assets debit value by adding the total_value from all records where the account_category is set to assets, the value_type is set to debit, and the account_type is one of current, bank, or current_accounts_receivable
 */
const calculateAssetsDebit = () => {
    const paramObject = {
        'account_category': [ASSETS],
        'value_type': [DEBIT],
        'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_RECEIVABLE],
    };
    const accounts = filteringAccounts(data, paramObject)

    return sum(accounts)
}

/**
 * calculating the assets credit value by adding the total_value from all records where the account_category is set to assets, the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable
 */
const calculateAssetsCredit = () => {
    const paramObject = {
        'account_category': [ASSETS],
        'value_type': [CREDIT],
        'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_RECEIVABLE],
    };
    const accounts = filteringAccounts(data, paramObject)

    return sum(accounts)
}

/**
 * calculating the assets by subtracting the return value of calculateAssetsCredit() from the return value of calculateAssetsDebit()
 */
const calculateAssets = () => {
    return calculateAssetsDebit() - calculateAssetsCredit()
}

/**
 * calculating the liability debit value by adding the total_value from all records where the account_category is set to liability, the value_type is set to credit, and the account_type is one of current or current_accounts_payable
 */
const calculateLiabilityDebit = () => {
    const paramObject = {
        'account_category': [LIABILITY],
        'value_type': [DEBIT],
        'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_PAYABLE],
    };
    const accounts = filteringAccounts(data, paramObject)

    return sum(accounts)
}

/**
 * calculating the liability credit value by adding the total_value from all records where the account_category is set to liability, the value_type is set to debit, and the account_type is one current or current_accounts_payable
 */
const calculateLiabilityCredit = () => {
    const paramObject = {
        'account_category': [LIABILITY],
        'value_type': [CREDIT],
        'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_PAYABLE],
    };
    const accounts = filteringAccounts(data, paramObject)

    return sum(accounts)
}

/**
 * calculating the liabilities by subtracting the return value ofcalculateLiabilitiesDebit() from the return value of calculateLiabilitiesCredit() 
 */
const calculateLiabilities = () => {
    return calculateLiabilityCredit() - calculateLiabilityDebit()
}

/**
 * calculating the Working Capital Ratio by dividing the assets by the liabilities creating a percentage value
 */
const calculateWorkingCapitalRatio = () => {
    return calculateAssets() / calculateLiabilities()
}


const metrics = [
    {
        id: 1,
        metric: 'Revenue',
        result: convertToCurrency(calculateRevenue())
    },
    {
        id: 2,
        metric: 'Expenses',
        result: convertToCurrency(calculateExpenses())
    },
    {
        id: 3,
        metric: 'Gross Profit Margin',
        result: convertToPercentage(calculateGrossProfitMargin())
    },
    {
        id: 4,
        metric: 'Net Profit Margin',
        result: convertToPercentage(calculateNetProfitMargin())
    },
    {
        id: 5,
        metric: 'Working Capital Ratio',
        result: convertToPercentage(calculateWorkingCapitalRatio())
    },
]

export default metrics