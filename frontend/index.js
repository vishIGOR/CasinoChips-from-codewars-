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

function findIndexWithMinValue(arr) {
    let minIndex = 0;

    if (arr[1] < arr[minIndex])
        minIndex = 1;
    if (arr[2] < arr[minIndex])
        minIndex = 2;

    return minIndex;
}

async function postRequest(url, data) {
    return await fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        }),
    })
}

async function putResult(data) {
    postRequest("http://localhost:8000/putResult", data)
        .then((response) => {
            return response.json();
        })
        .catch(error => console.error(error))
}

async function checkResult(data) {
    postRequest("http://localhost:8000/isResultExists", data)
        .then((response) => {
            return response.json();
        })
        .catch(error => console.error(error))
}

async function checkConnection() {
    return fetch("http://localhost:8000/ping", {
        headers: new Headers({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        }),
    })
        .then((response) => {
            return response.json();
        })
        .catch(error => console.error(error))
}

document.getElementById("sendBtn").onclick = async () => {
    console.log(await checkConnection())
    let elements = new Array(3)
    elements[0] = Number(document.getElementById("digit1").value);
    elements[1] = Number(document.getElementById("digit2").value);
    elements[2] = Number(document.getElementById("digit3").value);

    let answer = solve(elements)
    document.getElementById("anwser").innerHTML = answer

    let data = {
        "first": elements[0],
        "second": elements[1],
        "third": elements[2],
        "result": answer
    }
    response = await putResult(data)
    console.log(response)
}

document.getElementById("checkBtn").onclick = async () => {
    console.log(await checkConnection())
    let elements = new Array(3)
    elements[0] = Number(document.getElementById("digit1").value);
    elements[1] = Number(document.getElementById("digit2").value);
    elements[2] = Number(document.getElementById("digit3").value);

    let data = {
        "first": elements[0],
        "second": elements[1],
        "third": elements[2],
        "result": Number(document.getElementById("anwser").innerHTML)
    }

    response = await checkResult(data)

    document.getElementById("anwser2").innerHTML = response
}

module.exports = { ValidationError, solve, findIndexWithMinValue, validateInputArray };