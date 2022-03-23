const assert = require('assert');
const program = require('./index');
it('validation_withValidInput_returnTrue', () => {
    let inputData = [3, 4, 0];
    let expectedResult = true;

    let actualResult = program.validateInputArray(inputData);

    assert.equal(actualResult, expectedResult);
})

it('validation_withInputIsNotArrayButString_returnValidException', () => {
    let inputData = "hello";
    let expectedResult = new program.ValidationError(program.ValidationError.notArrayErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withInputIsNotArrayButObject_returnValidException', () => {
    let inputData = { "0": 3, "1": 4, "2": 0 };
    let expectedResult = new program.ValidationError(program.ValidationError.notArrayErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withInputIsNotArrayButNumber_returnValidException', () => {
    let inputData = 324234234;
    let expectedResult = new program.ValidationError(program.ValidationError.notArrayErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withTooBigInputLength_returnValidException', () => {
    let inputData = [3, 0, 3, 1];
    let expectedResult = new program.ValidationError(program.ValidationError.invalidLengthErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withTooSmallInputLength_returnValidException', () => {
    let inputData = [3, 0];
    let expectedResult = new program.ValidationError(program.ValidationError.invalidLengthErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withStringElements_returnValidException', () => {
    let inputData = [3, 1, "hello"];
    let expectedResult = new program.ValidationError(program.ValidationError.elementIsNotIntegerErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withArrayElements_returnValidException', () => {
    let inputData = [3, 1, [2, 2]];
    let expectedResult = new program.ValidationError(program.ValidationError.elementIsNotIntegerErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withObjectElements_returnValidException', () => {
    let inputData = [3, 1, { fiel1: 1, filed2: 2 }];
    let expectedResult = new program.ValidationError(program.ValidationError.elementIsNotIntegerErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withDoubleElements_returnValidException', () => {
    let inputData = [3, 1, 2.212];
    let expectedResult = new program.ValidationError(program.ValidationError.elementIsNotIntegerErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('validation_withElementIsLessThanZero_returnValidException', () => {
    let inputData = [3, 1, -22];
    let expectedResult = new program.ValidationError(program.ValidationError.elementIsLessZeroErrorText);

    let actualResult = program.validateInputArray(inputData);

    assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
})

it('findIndexWithMinValue_withDifferentNumbers_returnCorrectIndex', () => {
    let inputData = [3, 1, 22];
    let expectedResult = 1;

    let actualResult = program.findIndexWithMinValue(inputData);

    assert.equal(actualResult, expectedResult);
})

it('findIndexWithMinValue_withTwoSameNumbers_returnFirstCorrectIndex', () => {
    let inputData = [5, 3, 3];
    let expectedResult = 1;

    let actualResult = program.findIndexWithMinValue(inputData);

    assert.equal(actualResult, expectedResult);
})

it('findIndexWithMinValue_withAllSameNumbers_returnFirstIndex', () => {
    let inputData = [22, 22, 22];
    let expectedResult = 0;

    let actualResult = program.findIndexWithMinValue(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withSomeSmallData1_returnCorrectValue', () => {
    let inputData = [1, 2, 2];
    let expectedResult = 2;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withSomeSmallData2_returnCorrectValue', () => {
    let inputData = [1, 7, 4];
    let expectedResult = 5;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withSomeBigData1_returnCorrectValue', () => {
    let inputData = [12312,549903,2220];
    let expectedResult = 14532;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withSomeBigData2_returnCorrectValue', () => {
    let inputData = [399092,5277943,822023];
    let expectedResult = 1221115;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withTwoZeros_returnCorrectValue', () => {
    let inputData = [0, 0, 2];
    let expectedResult = 0;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withThreeZeros_returnCorrectValue', () => {
    let inputData = [0, 0, 0];
    let expectedResult = 0;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withElementBiggerThanOthers_returnCorrectValue', () => {
    let inputData = [21, 1, 4];
    let expectedResult = 5;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withAllSameOddNumbers_returnCorrectValue', () => {
    let inputData = [21, 21, 21];
    let expectedResult = 31;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})

it('solve_withAllSameEvenNumbers_returnCorrectValue', () => {
    let inputData = [22, 22, 22];
    let expectedResult = 33;

    let actualResult = program.solve(inputData);

    assert.equal(actualResult, expectedResult);
})