/* GENERIC JAVASCRIPT FUNCTIONS LIBRARY */

/* VERSION 0.0.20 | DATE 17-10-2018 */

const csvToArray = (csvEntry, csvDelimiter = ",") => csvEntry.split(csvDelimiter);

const arrayNoDups = (mySet = []) => Array.from(new Set(mySet));

const changeParsers = (myArray = [], delim = ";") => myArray.toString().replace(/,/g, ";");

function doubleCSVtoMatrix(csvInputId, delim1, delim2) {
    let array1 = csvToArray(document.getElementById(csvInputId).innerHTML, delim1);
    let matrix = [];
    for (let i = array1.length; i--;matrix[i] = csvToArray(array1[i], delim2)){}
    return matrix;
}
function returnFieldifMatch(matrix, wantedField, conditionField, conditionValue) {
    let matchedArray = [];
    for (let i = matrix.length; i--;)(matrix[i][conditionField] === conditionValue) ? matchedArray.push(matrix[i][wantedField]) : false
    return matchedArray;
}

function removeFromArray(myArray, element) {
    for (let i = myArray.length; i--;)(myArray[i] === element) ? myArray.splice(i, 1) : false
}

function arrayIntersec(array1, array2) {
    let intersecArray = [];
    let len2 = array2.length;
    for (let i = array1.length; i--;) {
        for (let j = len2; j--;) {
            (array1[i] == array2[j]) ? intersecArray.push(array1[i]): false
        }
    }
    return intersecArray;
}

function clearInnerHTML(targetBlockId) {
    const element = document.getElementById(targetBlockId);
    if (element) {
        while (element.firstChild) element.removeChild(element.firstChild);
    }
}

// TEMPORARY MOVE
