/* GENERIC JAVASCRIPT FUNCTIONS LIBRARY */

/* VERSION 0.0.3 | DATE 14-10-2018 */
/*

*/

const csvToArray = (csvEntry, csvDelimiter = ",") => csvEntry.split(csvDelimiter);

const arrayNoDups = (mySet) => Array.from(new Set(mySet));

function removeFromArray(myArray, element) {
    for (let i = myArray.length; i--;) (myArray[i] === element) ? myArray.splice(i, 1) : false
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
 while (element.firstChild) element.removeChild(element.firstChild);
}
