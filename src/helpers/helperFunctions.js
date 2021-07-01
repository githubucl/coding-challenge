
/**
 * help filtering out the accounts of interest 
 * @param {Array} accounts accepting raw data 
 * @param {*} paramObject an object containing filter criteria 
 * @returns array of filtered accounts
 */
export const filteringAccounts = (accounts, paramObject) => {
    const parameters = Object.keys(paramObject)
    return accounts.filter((account) => {
        //set up a switch
        let flag = true
        //looping over the filter criteria 
        parameters.forEach((param) => {
            if (!paramObject[param].includes(account[param])) {
                flag = false
                return
            }
        })
        return flag
    })
}

/**
 * calculate the sum for filtered accounts
 * @param {*} filteredAccounts array resulted from filteringAccounts function
 * @returns number
 */
export const sum = (filteredAccounts) => {
    return filteredAccounts.reduce((acc, cur) => {
        return acc += cur.total_value
    }, 0)
}


/**
 * converts calculated value to the correct format
 * @param {number} number 
 * @returns string
 */
export const convertToCurrency = (number) => {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    }).format(number);
}

/**
 * converts calculated value to the correct format
 * @param {number} number 
 * @returns string
 */
export const convertToPercentage = (number) => {
    return new Intl.NumberFormat("en-US", {
        style: 'percent',
        maximumFractionDigits: 1,
        minimumFractionDigits: 1
    }).format(number);
}