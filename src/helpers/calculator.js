import { DEBIT, CREDIT, BANK, CURRENT, CURRENT_ACCOUNTS_PAYABLE, CURRENT_ACCOUNTS_RECEIVABLE, SALES, REVENUE, EXPENSE, ASSETS, LIABILITY, } from '../constants/constants';
import { data } from '../data.json';
import { filteringAccounts, sum, convertToCurrency, convertToPercentage } from './helperFunctions'

/**
 * This should be calculated by adding up all the values under total_value where the account_category field is set to revenue
 */
export const calculateRevenue = (rawData) => {
    //paramObject is an object for specifying the parameters for filtering
    const paramObject = {
        'account_category': [REVENUE]
    }
    const accounts = filteringAccounts(rawData, paramObject)

    return sum(accounts)
}

/**
 * This should be calculated by adding up all the values under total_value where the account_category field is set to expense
 */

export const calculateExpenses = (rawData) => {
    const paramObject = {
        'account_category': [EXPENSE]
    }
    const accounts = filteringAccounts(rawData, paramObject)

    return sum(accounts)
}

/**
 * This is calculated in two steps: first by adding all the total_value fields where the account_type is set to sales and the value_type is set to debit; then dividing that by the revenue value calculated earlier to generate a percentage value.
 */
export const calculateGrossProfitMargin = (rawData) => {
    const paramObject = {
        'account_type': [SALES],
        'value_type': [DEBIT],
    }
    const accounts = filteringAccounts(rawData, paramObject)

    return sum(accounts) / calculateRevenue(rawData)
}

/**
 * This metric is calculated by subtracting the expenses value from the revenue value and dividing the remainder by revenue to calculate a percentage.
 */
export const calculateNetProfitMargin = (rawData) => {
    const revenue = calculateRevenue(rawData)
    const expenses = calculateExpenses(rawData)
    return (revenue - expenses) / revenue
}
/**
 * calculating the assets debit value by adding the total_value from all records where the account_category is set to assets, the value_type is set to debit, and the account_type is one of current, bank, or current_accounts_receivable
 */
const calculateAssetsDebit = (rawData) => {
    const paramObject = {
        'account_category': [ASSETS],
        'value_type': [DEBIT],
        'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_RECEIVABLE],
    };
    const accounts = filteringAccounts(rawData, paramObject)

    return sum(accounts)
}

/**
 * calculating the assets credit value by adding the total_value from all records where the account_category is set to assets, the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable
 */
const calculateAssetsCredit = (rawData) => {
    const paramObject = {
        'account_category': [ASSETS],
        'value_type': [CREDIT],
        'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_RECEIVABLE],
    };
    const accounts = filteringAccounts(rawData, paramObject)

    return sum(accounts)
}

/**
 * calculating the assets by subtracting the return value of calculateAssetsCredit() from the return value of calculateAssetsDebit()
 */
const calculateAssets = (rawData) => {
    return calculateAssetsDebit(rawData) - calculateAssetsCredit(rawData)
}

/**
 * calculating the liability debit value by adding the total_value from all records where the account_category is set to liability, the value_type is set to credit, and the account_type is one of current or current_accounts_payable
 */
const calculateLiabilityDebit = (rawData) => {
    const paramObject = {
        'account_category': [LIABILITY],
        'value_type': [DEBIT],
        'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_PAYABLE],
    };
    const accounts = filteringAccounts(rawData, paramObject)

    return sum(accounts)
}

/**
 * calculating the liability credit value by adding the total_value from all records where the account_category is set to liability, the value_type is set to debit, and the account_type is one current or current_accounts_payable
 */
const calculateLiabilityCredit = (rawData) => {
    const paramObject = {
        'account_category': [LIABILITY],
        'value_type': [CREDIT],
        'account_type': [CURRENT, BANK, CURRENT_ACCOUNTS_PAYABLE],
    };
    const accounts = filteringAccounts(rawData, paramObject)

    return sum(accounts)
}

/**
 * calculating the liabilities by subtracting the return value ofcalculateLiabilitiesDebit() from the return value of calculateLiabilitiesCredit() 
 */
const calculateLiabilities = (rawData) => {
    return calculateLiabilityCredit(rawData) - calculateLiabilityDebit(rawData)
}

/**
 * calculating the Working Capital Ratio by dividing the assets by the liabilities creating a percentage value
 */
export const calculateWorkingCapitalRatio = (rawData) => {
    return calculateAssets(rawData) / calculateLiabilities(rawData)
}


export const metrics = [
    {
        id: 1,
        metric: 'Revenue',
        result: convertToCurrency(calculateRevenue(data))
    },
    {
        id: 2,
        metric: 'Expenses',
        result: convertToCurrency(calculateExpenses(data))
    },
    {
        id: 3,
        metric: 'Gross Profit Margin',
        result: convertToPercentage(calculateGrossProfitMargin(data))
    },
    {
        id: 4,
        metric: 'Net Profit Margin',
        result: convertToPercentage(calculateNetProfitMargin(data))
    },
    {
        id: 5,
        metric: 'Working Capital Ratio',
        result: convertToPercentage(calculateWorkingCapitalRatio(data))
    },
]

