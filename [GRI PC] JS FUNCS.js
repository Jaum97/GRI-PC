/* JAVASCRIPT FUNCTIONS LIBRARY FOR PREFERENCE CENTER */

/* VERSION 0.0.17 | DATE 14-10-2018 */

/*---- ------------------------------ DOUBLE CSV TO MATRIX ------------------------------ ----*/
function doubleCSVtoMatrix(csvInputId, outputDivId, delim1, delim2) {

    let array1 = csvToArray(document.getElementById(csvInputId).innerHTML, delim1);
    let array2 = [],
        matrix = [];
    let len2 = 0;
    for (let i = array1.length; i--;) {
        matrix[i] = [];
        array2[i] = csvToArray(array1[i], delim2);
        len2 = array2[i].length;
        for (let j = len2; j--;) matrix[i][j] = array2[i][j]
    }
    return matrix;
}
/*---- ------------------------------  ----------------------  ------------------------------ ----*/



/*---- ------------------------------  RETURN FIELD IF MATCH ------------------------------  ----*/
function returnFieldifMatch(matrix, wantedField, conditionField, conditionValue, conditionField2, conditionValue2, conditionField3, conditionValue3, conditionField4, conditionValue4, conditionField5, conditionValue5) {
    let matchedArray = [];
    let matrixLen = matrix.length;
    let i = matrixLen;
    for (i; i--;) {
        ((matrix[i][conditionField] === conditionValue) && (matrix[i][conditionField2] === conditionValue2) && (matrix[i][conditionField3] === conditionValue3) && (matrix[i][conditionField4] === conditionValue4) && (matrix[i][conditionField5] === conditionValue5)) ? matchedArray.push(matrix[i][wantedField]): false
    }
    return matchedArray;
}
/*----  ------------------------------ ----------------------  ------------------------------ ----*/



/*---- ------------------------------ CREATE PRODUCT BLOCK ------------------------------ ----*/
function createProductBlocky(matrix, wantedArray, fieldToCheck, fieldValue, targetLocationId) {
    let j, dynamicTD, dynamicLABEL, dynamicDIV, dynamicDIV2, dynamicINPUT, dynamicSPAN, dynamicSPAN2, dynamicIMAGE, toggleButtonFunction;
    let blockArray = [];
    let i = wantedArray.length;
    let count = 0;
    let currentName;
    let checkboxClass = "";
    let classz = "subscribedOn";
    let subsLen = subscribedProducts.length;
    for (i; i--;) {
        currentName = String(returnFieldifMatch(matrix, '2', '2', wantedArray[i]));
        if (currentName) {
            let dynamicBR = document.createElement("BR");
            dynamicTD = document.createElement("TD");
            dynamicDIV = document.createElement("DIV");
            dynamicDIV2 = document.createElement("DIV");
            dynamicLABEL = document.createElement("LABEL");
            dynamicINPUT = document.createElement("INPUT");
            dynamicSPAN2 = document.createElement("SPAN");
            dynamicSPAN = document.createElement("H4");
            dynamicIMAGE = document.createElement("IMG");

            dynamicDIV.setAttribute("class", 'spanf');
            dynamicDIV.setAttribute("id", 'divId' + currentName);

            dynamicDIV2.setAttribute("style", "display:block;border-style:solid;");
            dynamicDIV2.setAttribute("height", '40');

            dynamicLABEL.setAttribute('class', 'switch');

            dynamicINPUT.setAttribute('id', 'checkbox' + currentName);
            dynamicINPUT.setAttribute('type', 'checkbox');

            for (j = subsLen; j--;)(subscribedProducts[j] == currentName) ? (dynamicINPUT.setAttribute('checked', 'true'), (dynamicINPUT.setAttribute('class', classz))) : false

            toggleButtonFunction = "subscribedClass('" + currentName + "','" + classz + "','" + dynamicINPUT.id + "')";

            dynamicINPUT.setAttribute('onclick', toggleButtonFunction);
            dynamicSPAN2.setAttribute('class', 'slider round');
            dynamicSPAN.setAttribute("id", 'testSPANId' + currentName);
            dynamicSPAN.innerHTML = currentName;
            dynamicSPAN.setAttribute("height", '40');
            dynamicIMAGE.setAttribute("src", returnFieldifMatch(matrix, '21', '2', wantedArray[i]));
            dynamicIMAGE.setAttribute("class", 'testImageClass');
            dynamicIMAGE.setAttribute("id", 'testIMGId' + currentName);
            dynamicIMAGE.setAttribute("width", '180');
            dynamicIMAGE.setAttribute("height", '180');

            dynamicLABEL.appendChild(dynamicINPUT);
            dynamicLABEL.appendChild(dynamicSPAN2);
            dynamicTD.appendChild(dynamicDIV);
            dynamicDIV.appendChild(dynamicDIV2);
            dynamicDIV2.appendChild(dynamicSPAN);
            dynamicDIV2.appendChild(dynamicLABEL);
            dynamicDIV.appendChild(dynamicIMAGE);
            (count === 8) ? (count = 0, document.getElementById(targetLocationId).appendChild(dynamicBR)) : false
            document.getElementById(targetLocationId).appendChild(dynamicTD);

            count++;
        }
    }
}
/*----  ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------  CREATE FILTER OPTION ------------------------------ ----*/
function createFilterOption(matrix, targetPosition, arrayFieldToLook, filterType, filterOptionClassOff, filterOptionClassOn) {
    let filterArray = [];
    let j, FilterOption, filterClass, activeFilters, thisOptionId, functionOnClickString;
    document.getElementById(targetPosition).innerHTML = "";
    filterArray = arrayFieldToLook;
    let i = filterArray.length;
    if (i) {
        FilterOptionDefault = document.createElement("OPTION");
        FilterOptionDefault.innerHTML = filterType;
        FilterOptionDefault.setAttribute("id", "defaultOPTION" + filterType);
        FilterOptionDefault.setAttribute("selected", "selected");
        FilterOptionDefault.setAttribute("disabled", "true");
        FilterOptionDefault.setAttribute("hidden", "true");
        document.getElementById(targetPosition).appendChild(FilterOptionDefault);
        for (i; i--;) returnStuffy("OPTION", targetPosition, filterType, filterOptionClassOn, filterOptionClassOff, filterArray[i]);
    }

}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ CHANGE FILTERS CLASS ------------------------------ ----*/
function filtersClass(filterId, filterClassOn, filterClassOff, buttId) {
    let targetPointer = document.getElementById(filterId);
    if (targetPointer) {
        let target = targetPointer.classList;
        (target.contains(filterClassOff)) ? (target.add(filterClassOn), target.remove(filterClassOff)) : (target.add(filterClassOff), target.remove(filterClassOn))
    } else {
        let element = document.getElementById(buttId);
        element.parentNode.removeChild(element);
    }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ GET FILTERS ------------------------------ ----*/
function getFilters(filterType) {

    let filterClass = 'button' + filterType + 'On';
    let classesArray = document.getElementsByClassName(filterClass);
    let classesValueArray = [];
    let i = classesArray.length
    targetid = "active" + filterType + "FiltersHere";

    for (i; i--;) classesValueArray[i] = classesArray[i].value

    document.getElementById(targetid).innerHTML = classesValueArray;

    returnFieldifMatchArray(neo, 2, filterType, classesValueArray);
    console.log(classesValueArray);
    createActiveButtons(filterType, classesValueArray);
    validateFilters(filterType, classesValueArray);
    return classesValueArray;
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ RETURN FIELD IF MATCH ARRAY ------------------------------ ----*/
function returnFieldifMatchArray(matrix, wantedField, filterType, classesValueArray) {

    let matchedArray1 = [];
    let conditionValues1 = csvToArray(document.getElementById('active' + filterType + 'FiltersHere').innerHTML, ',');
    let condVal1Len = conditionValues1.length;
    let conditionField = convertNametoNumber(filterType, conditionValues1)
    let matrixLen = matrix.length;
    let i,
        j;
    if (conditionValues1) {
        for (i = condVal1Len; i--;) {
            for (j = matrixLen; j--;) {
                if ((matrix[j][conditionField] === conditionValues1[i]) && (matrix[j][12] === "active")) {
                    matchedArray1.push(matrix[j][wantedField]);
                } else if ((filterType === "Country") && (matrix[j][6] === "Regional") && (matrix[j][12] === "active")) {
                    matchedArray1.push(matrix[j][wantedField]);
                } else if ((filterType === "Segment") && (matrix[j][8] === "All") && (matrix[j][12] === "active")) {
                    matchedArray1.push(matrix[j][wantedField]);
                }
            }
        }
    }
    updateProducts(filterType, matchedArray1);
    createBlockys(filterType);
    return matchedArray1;
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function convertNametoNumber(filterType, updateValue) {
    let filterNumber;
    if (filterType == "Sector") {
        filterSectorOn = updateValue;
        filterNumber = "3";
    } else if (filterType == "Region") {
        filterRegionOn = updateValue;
        filterNumber = "4";
    } else if (filterType == "Country") {
        filterCountryOn = updateValue;
        filterNumber = "6";
    } else if (filterType == "Segment") {
        filterSegmentOn = updateValue;
        filterNumber = "8";
    } else {
        filterNumber = "13";
    }
    return filterNumber;
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function updateProducts(filterType, updateValue) {
    if (filterType == "Sector") {
        productsSectorOn = updateValue;
    } else if (filterType == "Region") {
        productsRegionOn = updateValue;
    } else if (filterType == "Country") {
        productsCountryOn = updateValue;
    } else if (filterType == "Segment") {
        productsSegmentOn = updateValue;
    }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/


function setMatches(wanted) {
    console.log("setMatches");
    productsCommonSecReg = arrayNoDups(arrayIntersec(productsSectorOn, productsRegionOn));
    productsCommonSecRegCon = arrayNoDups(arrayIntersec(productsCommonSecReg, productsCountryOn));
    productsCommonSecRegConSeg = arrayNoDups(arrayIntersec(productsCommonSecRegCon, productsSegmentOn));
    if (wanted === 1) {
        return productsCommonSecReg;
    } else if (wanted === 2) {
        return productsCommonSecRegCon;
    } else if (wanted === 3) {
        return productsCommonSecRegConSeg;
    } else {
        return false;
    }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function createBlockys(filterType) {
    let common1 = setMatches(1);
    let common2 = setMatches(2);
    let common3 = setMatches(3);
    let test;

    clearInnerHTML("debugPrints0");

    if ((common3.length) && (filterSegmentOn != "")) {
        createProductBlocky(neo, common3, '', '', 'debugPrints0');
    } else if ((common2.length) && (filterCountryOn != "")) {
        createProductBlocky(neo, common2, '', '', 'debugPrints0');
    } else if (common1.length) {
        createProductBlocky(neo, common1, '', '', 'debugPrints0');
    } else if (productsRegionOn.length) {
        createProductBlocky(neo, productsRegionOn, '', '', 'debugPrints0');
    } else if (productsSectorOn.length) {
        createProductBlocky(neo, productsSectorOn, '', '', 'debugPrints0');
    } else {
        createProductBlocky(neo, trinity, '', '', 'debugPrints0');
    }
    if (((filterType != "Country") && (filterType != "Segment")) && ((filterRegionOn != "") || (filterSectorOn != ""))) {
        createCountriesFilter(neo, common1, 6);
    }
    if (filterType != "Segment"){
        createSegmentFilter(neo, common2, 8);
    }
    if (filterType == "Region") {
        createSectorFilter(neo, productsRegionOn, 3, "yes");
    }
    if (filterType == "Sector") {
        createRegionFilter(neo, productsSectorOn, 4, "yes");
    }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function createCountriesFilter(matrix, array, fieldToMatch) {

    let countryMatchArray = [];
    let arrayLen = array.length;
    let matrixLen = matrix.length;
    if (arrayLen) {
        for (let i = arrayLen; i--;) {
            for (let j = matrixLen; j--;)((matrix[j][2] == array[i]) && (matrix[j][fieldToMatch] != 'All')) ? countryMatchArray.push(matrix[j][fieldToMatch]) : false
        }
    }
    let countriesBoy = arrayNoDups(countryMatchArray);
    createFilterOption(neo, 'testCountryFilterLocation', countriesBoy, 'Country', 'buttonCountryOff', 'buttonCountryOn');
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function createSegmentFilter(matrix, array, fieldToMatch) {
    let type = "Segment";
    let segmentMatchArray = [];
    let arrayLen = array.length;
    let matrixLen = matrix.length;
    if (arrayLen) {
        for (let i = arrayLen; i--;) {
            for (let j = matrixLen; j--;)((matrix[j][2] == array[i]) && (matrix[j][fieldToMatch] != 'All')) ? segmentMatchArray.push(matrix[j][fieldToMatch]) : false
        }
    }
    let segmentsBoy = arrayNoDups(segmentMatchArray);
    createFilterOption(neo, 'testSegmentFilterLocation', segmentsBoy, 'Segment', 'buttonSegmentOff', 'buttonSegmentOn');
}

/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function createSectorFilter(matrix, array, fieldToMatch) {

    let type = "Sector";
    let sectorMatchArray = [];
    let arrayLen = array.length;
    let matrixLen = matrix.length;
    if (arrayLen) {
        for (let i = arrayLen; i--;) {
            for (let j = matrixLen; j--;)((matrix[j][2] == array[i]) && (matrix[j][fieldToMatch] != 'All')) ? sectorMatchArray.push(matrix[j][fieldToMatch]) : false
        }
    } else {
        sectorMatchArray = arrayNoDups(returnFieldifMatch(neo, '3', '12', 'active'));
    }
    let sectorBoy = arrayNoDups(sectorMatchArray);
    createFilterOption(neo, 'testSectorFilterLocation', sectorBoy, 'Sector', 'buttonSectorOff', 'buttonSectorOn');
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function createRegionFilter(matrix, array, fieldToMatch) {
    let type = "Region";
    let regionMatchArray = [];
    let arrayLen = array.length;
    let matrixLen = matrix.length;
    if (arrayLen) {
        for (let i = arrayLen; i--;) {
            for (let j = matrixLen; j--;)((matrix[j][2] == array[i]) && (matrix[j][fieldToMatch] != 'All')) ? regionMatchArray.push(matrix[j][fieldToMatch]) : false
        }
    } else {
        regionMatchArray = arrayNoDups(returnFieldifMatch(neo, '4', '12', 'active'));
    }
    let regionBoy = arrayNoDups(regionMatchArray);
    createFilterOption(neo, 'testRegionFilterLocation', regionBoy, 'Region', 'buttonRegionOff', 'buttonRegionOn');
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function subscribedClass(productId, productClassOn, checkboxId) {
    let target = document.getElementById(checkboxId).classList;
    (target.contains(productClassOn)) ? (target.remove(productClassOn), removeFromArray(subscribedProducts, productId)) : (target.add(productClassOn), subscribedProducts.push(productId));
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function readyInterests() {
    let aux, i;
    let allInput = document.getElementById('interestsAll');
    let latamInput = document.getElementById('interestsLatam');
    let europeInput = document.getElementById('interestsEurope');
    let asiaInput = document.getElementById('interestsAsia');
    let subProdLen = subscribedProducts.length;

    for (i = subProdLen; i--;) {
        aux = returnFieldifMatch(neo, 4, 2, subscribedProducts[i]);

        if ((aux == "Latin America") && (productInterestLatinAmerica)) {
            productInterestLatinAmerica.push(subscribedProducts[i]);
        } else if ((aux == "Europe") && (productInterestEurope)) {
            productInterestEurope.push(subscribedProducts[i]);
        } else if ((aux == "Asia") && (productInterestAsia)) {
            productInterestAsia.push(subscribedProducts[i]);
        }
        if (subscribedProducts[i] === "") {
            removeFromArray(subscribedProducts, subscribedProducts[i]);
        }
    }

    allInput.value = arrayNoDups(subscribedProducts);
    latamInput.value = changeParsers(arrayNoDups(productInterestLatinAmerica));
    europeInput.value = changeParsers(arrayNoDups(productInterestEurope));
    asiaInput.value = changeParsers(arrayNoDups(productInterestAsia));
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function sortBy(param) {
    let notsubs = [];
    array = subscribedProducts;
    matrix = neo;
    matrixLen = neo.length;
    arrayLen = subscribedProducts.length;
    (subscribedProducts[0] == "") ? subscribedProducts.shift(): false
    for (let i = 14; i--;) clearInnerHTML("debugPrints0" + i)
    notsubs = trinity.filter(x => !subscribedProducts.includes(x));
    if (param === "subscribed") {
        createProductBlocky(neo, subscribedProducts, '', '', 'debugPrints0');
    } else if (param === "notsubscribed") {
        createProductBlocky(neo, notsubs, '', '', 'debugPrints0');
    } else if (param === "all") {
        createProductBlocky(neo, trinity, '', '', 'debugPrints0');
    } else {
        createProductBlocky(neo, trinity, '', '', 'debugPrints0');
    }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/


const changeParsers = (myArray = [],delim = ";") => myArray.toString().replace(/,/g, ";");
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------  CREATE FILTER BUTTON ------------------------------ ----*/
function printGlobals() {
    //console.log("---PRINT---");
    //console.log('filterSectorOn');
    //console.log(filterSectorOn);
    //console.log('filterRegionOn');
    //console.log(filterRegionOn);
    //console.log('filterCountryOn');
    //console.log(filterCountryOn);
    //console.log('filterSegmentOn');
    //console.log(filterSegmentOn);
    //console.log('productsSectorOn');
    //console.log(productsSectorOn);
    //console.log('productsRegionOn');
    //console.log(productsRegionOn);
    //console.log('productsCountryOn');
    //console.log(productsCountryOn);
    //console.log('productsSegmentOn');
    //console.log(productsSegmentOn);
    //console.log('productsCommonSecReg');
    //console.log(productsCommonSecReg);
    //console.log('productsCommonSecRegCon');
    //console.log(productsCommonSecRegCon);
    //console.log('productsCommonSecRegConSeg');
    //console.log(productsCommonSecRegConSeg);
    //console.log(productInterestLatinAmerica);
    //console.log(productInterestEurope);
    //console.log(productInterestAsia);
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function returnStuffy(type, targetPosition, filterType, filterOptionClassOn, filterOptionClassOff, filterArray) {
    thisOptionId = "OPTION" + filterType + filterArray;
    thisButtonId = type + filterType + filterArray;
    FilterOption = document.createElement(type);
    FilterOption.setAttribute('id', thisButtonId);
    functionOnClickString = "filtersClass('" + thisOptionId + "','" + filterOptionClassOn + "','" + filterOptionClassOff + "'),getFilters('" + filterType + "','" + filterOptionClassOn + "','" + filterOptionClassOff + "')";
    activeFilters = "active" + filterType + "FiltersHere";
    activeFiltersArray = csvToArray(document.getElementById(activeFilters).innerHTML, ',');
    activeFilterLen = activeFiltersArray.length;
    filterClass = filterOptionClassOff;
    for (j = activeFilterLen; j--;)(activeFiltersArray[j] == filterArray) ? filterClass = filterOptionClassOn : false
    FilterOption.setAttribute('class', filterClass);
    FilterOption.innerHTML = filterArray;
    FilterOption.setAttribute('value', filterArray);
    FilterOption.setAttribute('onclick', functionOnClickString);

    /*(type == "BUTTON") ? (filterClass == filterOptionClassOn) ? (clearInnerHTML(targetPosition), document.getElementById(targetPosition).appendChild(FilterOption)) : false:*/

    document.getElementById(targetPosition).appendChild(FilterOption);
}

function createActiveButtons(filterType, activeArray) {
    let array = activeArray;
    let filter = filterType;
    let i = array.length;
    let filterButton, classOn, classOff, thisOptionId, functionOnClickString, currentId;
    let targetFilter = "active" + filterType + "ButtonFiltersHere";
    clearInnerHTML(targetFilter);
    for (i; i--;) {
        thisOptionId = "OPTION" + filterType + array[i];
        classOn = "button" + filterType + "On";
        classOff = "button" + filterType + "Off";
        currentId = "activeButton" + array[i];
        FilterButton = document.createElement("BUTTON");
        FilterButton.setAttribute('id', currentId);
        FilterButton.setAttribute('class', "buttonActive buttonActive1")
        functionOnClickString = "filtersClass('" + thisOptionId + "','" + classOn + "','" + classOff + "','" + currentId + "'),getFilters('" + filterType + "','" + classOn + "','" + classOff + "')";
        FilterButton.setAttribute('onclick', functionOnClickString);
        FilterButton.innerHTML = array[i];
        document.getElementById(targetFilter).appendChild(FilterButton);
    }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/

function validateFilters(filterType, classesValueArray) {
    console.log("validate filters");
    console.log(filterType);
    console.log(classesValueArray);
    let common1 = setMatches(1);
    let common2 = setMatches(2);
    let common3 = setMatches(3);
    let blank = "";
    let i, len, currentList, currentName, FilterOptionDefault;

    if (filterType == "Sector") {
        if ((classesValueArray == blank) || (productsCommonSecRegCon == blank)) {
            clearInnerHTML("activeCountryFiltersHere");
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeCountryButtonFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        } else if ((productsCommonSecRegConSeg == blank) || (filterSegmentOn != blank)) {
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        } else if (productsCommonSecReg == blank) {
            clearInnerHTML("activeRegionFiltersHere");
            clearInnerHTML("activeRegionButtonFiltersHere");
        }
    }
    if ((filterType == "Region") && (classesValueArray == blank)) {
        clearInnerHTML("activeCountryFiltersHere");
        clearInnerHTML("activeSegmentFiltersHere");
        clearInnerHTML("activeCountryButtonFiltersHere");
        clearInnerHTML("activeSegmentButtonFiltersHere");
    }
    if (filterType == "Country") {
        if ((classesValueArray == blank) || (productsCommonSecRegConSeg == blank) || (document.getElementById("testSegmentFilterLocation").innerHTML == "")) {
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        }
    }
    if (filterType === 'all') {
        console.log("clear all");
        arrayBlank = [];
        refreshArrays();
        clearInnerHTML("activeSegmentButtonFiltersHere");
        clearInnerHTML("activeCountryButtonFiltersHere");
        clearInnerHTML("activeRegionButtonFiltersHere");
        clearInnerHTML("activeSectorButtonFiltersHere");
        clearInnerHTML("activeSegmentFiltersHere");
        clearInnerHTML("activeCountryFiltersHere");
        clearInnerHTML("activeRegionFiltersHere");
        clearInnerHTML("activeSectorFiltersHere");
        clearInnerHTML("debugPrints0")
        createProductBlocky(neo, trinity, '', '', 'debugPrints0');
        createFilterOption(neo, 'testRegionFilterLocation', arrayNoDups(returnFieldifMatch(neo, '4', '12', 'active')), 'Region', 'buttonRegionOff', 'buttonRegionOn', 'no');
        createFilterOption(neo, 'testSectorFilterLocation', arrayNoDups(returnFieldifMatch(neo, '3', '12', 'active')), 'Sector', 'buttonSectorOff', 'buttonSectorOn', 'no');
        createFilterOption(neo, 'testCountryFilterLocation', arrayBlank, 'Country', 'buttonCountryOff', 'buttonCountryOn', 'no');
        createFilterOption(neo, 'testSegmentFilterLocation', arrayBlank, 'Segment', 'buttonSegmentOff', 'buttonSegmentOn', 'no');
    }
    let count = 0;
    (document.getElementById("debugPrints0").innerHTML == "") ? false : count++
    console.log('count');
    console.log(count);
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/

function refreshArrays() {
    console.log("refresh");
    while (productsSectorOn.length) productsSectorOn.pop()
    while (productsRegionOn.length) productsRegionOn.pop()
    while (productsCountryOn.length) productsCountryOn.pop()
    while (productsSegmentOn.length) productsSegmentOn.pop()
}

function searchBox(input) {
    console.log(input);
    let toMatch = input.toUpperCase();
    let matchedArray = [];
    for (let i = trinity.length; i--;)(trinity[i].toUpperCase().indexOf(toMatch) > -1) ? matchedArray.push(trinity[i]) : false
    clearInnerHTML("debugPrints0")
    (matchedArray.length) ? createProductBlocky(neo, matchedArray, '', '', 'debugPrints0'): document.getElementById("debugPrints0").innerHTML = "SORRY NO PRODUCTS FOUND";
}
