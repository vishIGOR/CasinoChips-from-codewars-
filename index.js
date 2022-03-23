function solve(arr) {
    let validationCheck = validateInputArray(arr);
    if (!(validationCheck === true))
        throw validationCheck;

    let daysCounter = 0;
    let exitCounter = 0;
    while (true) {
        exitCounter = 0;
        if (!arr[0])
            exitCounter++;
        if (!arr[1])
            exitCounter++;
        if (!arr[2])
            exitCounter++;
        if (exitCounter > 1)
            return daysCounter;

        let minIndex = findIndexWithMinValue(arr);

        for (let i = 0; i < 3; i++) {
            if (i != minIndex)
                arr[i]--;
        }
        daysCounter++;
    }
}

function validateInputArray(arr) {
    if (!Array.isArray(arr)) {
        return new ValidationError(ValidationError.notArrayErrorText);
    }
    if (arr.length != 3) {
        return new ValidationError(ValidationError.invalidLengthErrorText);
    }

    let response = true;
    arr.forEach(element => {
        if (!Number.isInteger(element)) {
            response = new ValidationError(ValidationError.elementIsNotIntegerErrorText);
        }

        if (element < 0) {
            response = new ValidationError(ValidationError.elementIsLessZeroErrorText);
        }
    });

    return response;
}

function findIndexWithMinValue(arr) {
    let minIndex = 0;

    if (arr[1] < arr[minIndex])
        minIndex = 1;
    if (arr[2] < arr[minIndex])
        minIndex = 2;

    return minIndex;
}

// class UnitTestsContainer{
//     findIndexWithMinValue_usingTestArray_returnsTestResult = (testArr, testResult)=>{

//     let result = findIndexWithMinValue(testArr);

//     return (result === testArr);
//     }
// }

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.errorText = message;
    }

    static notArrayErrorText = "Input data isn't array";
    static invalidLengthErrorText = "Input data'length isn't 3";
    static elementIsNotIntegerErrorText = "Some element of data isn't integer";
    static elementIsLessZeroErrorText = "Some element of data is less than zero";
}

module.exports = { ValidationError, solve, findIndexWithMinValue, validateInputArray };