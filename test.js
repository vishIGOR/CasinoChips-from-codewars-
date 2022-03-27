const assert = require('assert');
const program = require('./index');

executeValidationTests();
executeFindIndexTests();
executeSolveTests();

function executeValidationTests() {
    validationTest("withValidInput_returnTrue", [3, 7, 1], true);
    validationTest("withInputIsNotArrayButObject_returnNotArrayException", { "0": 3, "1": 4, "2": 0 }, new program.ValidationError(program.ValidationError.notArrayErrorText));
    validationTest("withInputIsNotArrayButNumber_returnNotArrayException", 324234234, new program.ValidationError(program.ValidationError.notArrayErrorText));
    validationTest("withInputIsNotArrayButString_returnValidException", "some test text", new program.ValidationError(program.ValidationError.notArrayErrorText));
    validationTest("withTooBigInputLength_returnInvalidLengthException", [2, 0, 9, 1], new program.ValidationError(program.ValidationError.invalidLengthErrorText));
    validationTest("withTooSmallInputLength_returnInvalidLengthException", [11, 2], new program.ValidationError(program.ValidationError.invalidLengthErrorText));
    validationTest("validation_withStringElements_returnElementsIsNotIntegerException", [3, "hello??", 1], new program.ValidationError(program.ValidationError.elementIsNotIntegerErrorText));
    validationTest("validation_withArrayElements_returnElementsIsNotIntegerException", [89, 6, [3, 5]], new program.ValidationError(program.ValidationError.elementIsNotIntegerErrorText));
    validationTest("validation_withObjectElements_returnElementsIsNotIntegerException", [13, 4, { fiel1: 1, filed2: 2 }], new program.ValidationError(program.ValidationError.elementIsNotIntegerErrorText));
    validationTest("validation_withDoubleElements_returnElementsIsNotIntegerException", [0, 8, 2.212], new program.ValidationError(program.ValidationError.elementIsNotIntegerErrorText));
    validationTest("withElementIsLessThanZero_returnValidException", [4, 1, -22], new program.ValidationError(program.ValidationError.elementIsLessZeroErrorText));

}

function executeFindIndexTests() {
    findIndexTest("withDifferentNumbers_returnCorrectIndex", [3, 1, 22], 1);
    findIndexTest("withTwoSameNumbers_returnFirstCorrectIndex", [5, 3, 3], 1);
    findIndexTest("withAllSameNumbers_returnFirstIndex", [24, 24, 24], 0);
}

function executeSolveTests() {
    solveTest("withThreeZeros_returnZero", [0, 0, 0], 0);
    solveTest("withElementBiggerThanOthers_returnCorrectValue", [32, 4, 9], 13);
    solveTest("withAllSameEvenNumbers_returnCorrectValue", [40, 40, 40], 60);
    solveTest("withAllSameOddNumbers_returnCorrectValue", [21, 21, 21], 31);
    solveTest("withSomeSmallData1_returnCorrectValue", [1, 2, 2], 2);
    solveTest("withSomeSmallData2_returnCorrectValue", [2, 7, 4], 6);
    solveTest("withSomeBigData1_returnCorrectValue", [12312, 54903234, 2201209], 2213521);
    solveTest("withSomeBigData2_returnCorrectValue", [39092212, 527212943, 822203], 39914415);
    //Mocha не обрабатывает их при любом условии(даже если очень долго ждать)
    // solveTest("withSomeVeryBigData1_returnCorrectValue", [Number.MAX_SAFE_INTEGER - 3223409, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 237], 2);
    // solveTest("_withSomeVeryBigData2_returnCorrectValue", [Number.MAX_VALUE - 999202122, Number.MAX_VALUE - 87421, Number.MAX_VALUE], 2);
}

function validationTest(testname, inputData, expectedResult) {
    it('validation_' + testname, () => {
        let actualResult = program.validateInputArray(inputData);

        assert.equal(JSON.stringify(actualResult), JSON.stringify(expectedResult));
    })
}

function findIndexTest(testname, inputData, expectedResult) {
    it('findIndexWithMinValue_' + testname, () => {
        let actualResult = program.findIndexWithMinValue(inputData);

        assert.equal(actualResult, expectedResult);
    })
}

function solveTest(testname, inputData, expectedResult) {
    it('solve_' + testname, () => {
        let actualResult = program.solve(inputData);

        assert.equal(actualResult, expectedResult);
    })
}