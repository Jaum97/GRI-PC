/* JAVASCRIPT FUNCTIONS LIBRARY FOR PREFERENCE CENTER */

/* VERSION 0.0.18 | DATE 14-10-2018 */

/*---- ------------------------------ DOUBLE CSV TO MATRIX ------------------------------ ----*/
function doubleCSVtoMatrix(csvInputId, delim1, delim2) {
    let array1 = csvToArray(document.getElementById(csvInputId).innerHTML, delim1);
    let matrix = [];
    for (let i = array1.length; i--;) matrix[i] = csvToArray(array1[i], delim2);
    return matrix;
}

function returnFieldifMatch(matrix, wantedField, conditionField, conditionValue) {
    let matchedArray = [];
    for (let i = matrix.length; i--;)(matrix[i][conditionField] === conditionValue) ? matchedArray.push(matrix[i][wantedField]) : false
    return matchedArray;
}

function createProductBlocky(matrix, wantedArray, fieldToCheck, fieldValue, targetLocationId) {
    let j, dynamicTD, dynamicLABEL, dynamicDIV, dynamicDIV2, dynamicINPUT, dynamicSPAN, dynamicSPAN2, dynamicIMAGE, toggleButtonFunction;
    let blockArray = [];
    let i = wantedArray.length;
    let count = 0;
    let currentName;
    let checkboxClass = "";
    let classz = "subscribedOn";
    let subscribedProds = initialize.subscribedProducts;
    let subsLen = subscribedProds.length;
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

            dynamicDIV.setAttribute("class", 'bouncyClass');
            dynamicDIV.setAttribute("id", 'divId' + currentName);

            dynamicDIV2.setAttribute("style", "display:block;border-style:solid;");
            dynamicDIV2.setAttribute("height", '40');

            dynamicLABEL.setAttribute('class', 'switch');

            dynamicINPUT.setAttribute('id', 'checkbox' + currentName);
            dynamicINPUT.setAttribute('type', 'checkbox');

            for (j = subsLen; j--;)(subscribedProds[j] == currentName) ? (dynamicINPUT.setAttribute('checked', 'true'), (dynamicINPUT.setAttribute('class', classz))) : false

            toggleButtonFunction = "subscribedClass('" + currentName + "','" + classz + "','" + dynamicINPUT.id + "')";

            //dynamicINPUT.setAttribute('onclick', toggleButtonFunction);
            dynamicINPUT.addEventListener('onclick', toggleButtonFunction);
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
    let j, FilterOption, filterClass, activeFilters, thisOptionId;
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
        FilterOptionDefault.setAttribute("onclick", myFunction());
        document.getElementById(targetPosition).appendChild(FilterOptionDefault);
        //document.getElementById(targetPosition).setAttribute("onchange",filterSelect(targetPosition));
        for (i; i--;) returnStuffy("OPTION", targetPosition, filterType, filterOptionClassOn, filterOptionClassOff, filterArray[i]);
    }

}
function myFunction(){
  console.log('henlo');
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

    returnFieldifMatchArray(initialize.neo, 2, filterType, classesValueArray,initialize);
    console.log(classesValueArray);
    createActiveButtons(filterType, classesValueArray);
    validateFilters(filterType, classesValueArray, initialize);
    return classesValueArray;
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ RETURN FIELD IF MATCH ARRAY ------------------------------ ----*/
function returnFieldifMatchArray(matrix, wantedField, filterType, classesValueArray,myObject) {
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
    createBlockys(filterType,initialize);
    return matchedArray1;
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function convertNametoNumber(filterType, updateValue) {
    let filterNumber;
    if (filterType == "Sector") {
        initialize.filterSectorOn = updateValue;
        filterNumber = "3";
    } else if (filterType == "Region") {
        initialize.filterRegionOn = updateValue;
        filterNumber = "4";
    } else if (filterType == "Country") {
        initialize.filterCountryOn = updateValue;
        filterNumber = "6";
    } else if (filterType == "Segment") {
        initialize.filterSegmentOn = updateValue;
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
        initialize.productsSectorOn = updateValue;
    } else if (filterType == "Region") {
        initialize.productsRegionOn = updateValue;
    } else if (filterType == "Country") {
        initialize.productsCountryOn = updateValue;
    } else if (filterType == "Segment") {
        initialize.productsSegmentOn = updateValue;
    }
}

function createBlockys(filterType,myObject) {
    let common1 = arrayNoDups(arrayIntersec(myObject.productsSectorOn, myObject.productsRegionOn));
    let common2 = arrayNoDups(arrayIntersec(common1, myObject.productsCountryOn));
    let common3 = arrayNoDups(arrayIntersec(common2, myObject.productsSegmentOn));

    console.log({common1,common2,common3});
    clearInnerHTML("debugPrints0");

    if ((common3.length) && (myObject.filterSegmentOn != "")) {
        createProductBlocky(myObject.neo, common3, '', '', 'debugPrints0');
    } else if ((common2.length) && (myObject.filterCountryOn != "")) {
        createProductBlocky(myObject.neo, common2, '', '', 'debugPrints0');
    } else if (common1.length) {
        createProductBlocky(myObject.neo, common1, '', '', 'debugPrints0');
    } else if (myObject.productsRegionOn.length) {
        createProductBlocky(myObject.neo, myObject.productsRegionOn, '', '', 'debugPrints0');
    } else if (myObject.productsSectorOn.length) {
        createProductBlocky(myObject.neo, myObject.productsSectorOn, '', '', 'debugPrints0');
    } else {
        createProductBlocky(myObject.neo, myObject.trinity, '', '', 'debugPrints0');
    }
    if (((filterType != "Country") && (filterType != "Segment")) && ((myObject.filterRegionOn != "") || (myObject.filterSectorOn != ""))) {
        createCountriesFilter(myObject.neo, common1, 6);
    }
    if (filterType != "Segment") {
        createSegmentFilter(myObject.neo, common2, 8);
    }
    if (filterType == "Region") {
        createSectorFilter(myObject.neo, myObject.productsRegionOn, 3, "yes");
    }
    if (filterType == "Sector") {
        createRegionFilter(myObject.neo, myObject.productsSectorOn, 4, "yes");
    }
}

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
    createFilterOption(matrix, 'testCountryFilterLocation', countriesBoy, 'Country', 'buttonCountryOff', 'buttonCountryOn');
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
    createFilterOption(matrix, 'testSegmentFilterLocation', segmentsBoy, 'Segment', 'buttonSegmentOff', 'buttonSegmentOn');
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
        sectorMatchArray = arrayNoDups(returnFieldifMatch(matrix, '3', '12', 'active'));
    }
    let sectorBoy = arrayNoDups(sectorMatchArray);
    createFilterOption(matrix, 'testSectorFilterLocation', sectorBoy, 'Sector', 'buttonSectorOff', 'buttonSectorOn');
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
        regionMatchArray = arrayNoDups(returnFieldifMatch(matrix, '4', '12', 'active'));
    }
    let regionBoy = arrayNoDups(regionMatchArray);
    createFilterOption(matrix, 'testRegionFilterLocation', regionBoy, 'Region', 'buttonRegionOff', 'buttonRegionOn');
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function subscribedClass(productId, productClassOn, checkboxId) {

    let target = document.getElementById(checkboxId).classList;
    (target.contains(productClassOn)) ? (target.remove(productClassOn), removeFromArray(initialize.subscribedProducts, productId)) : (target.add(productClassOn), initialize.subscribedProducts.push(productId));
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function readyInterests() {
    let aux, i;
    let allInput = document.getElementById('interestsAll');
    let latamInput = document.getElementById('interestsLatam');
    let europeInput = document.getElementById('interestsEurope');
    let asiaInput = document.getElementById('interestsAsia');
    let subProdLen = initialize.subscribedProducts.length;

    for (i = subProdLen; i--;) {
        aux = returnFieldifMatch(neo, 4, 2, initialize.subscribedProducts[i]);

        if ((aux == "Latin America") && (initialize.productInterestLatinAmerica)) {
            productInterestLatinAmerica.push(initialize.subscribedProducts[i]);
        } else if ((aux == "Europe") && (initialize.productInterestEurope)) {
            productInterestEurope.push(initialize.subscribedProducts[i]);
        } else if ((aux == "Asia") && (initialize.productInterestAsia)) {
            productInterestAsia.push(initialize.subscribedProducts[i]);
        }
        if (initialize.subscribedProducts[i] === "") {
            removeFromArray(initialize.subscribedProducts, initialize.subscribedProducts[i]);
        }
    }

    allInput.value = arrayNoDups(initialize.subscribedProducts);
    latamInput.value = changeParsers(arrayNoDups(initialize.productInterestLatinAmerica));
    europeInput.value = changeParsers(arrayNoDups(initialize.productInterestEurope));
    asiaInput.value = changeParsers(arrayNoDups(initialize.productInterestAsia));
}

function sortBy(param) {
    let notsubs = [];
    let array = initialize.subscribedProducts;
    let matrix = initialize.neo;
    let matrixLen = matrix.length;
    let arrayLen = initialize.subscribedProducts.length;
    (initialize.subscribedProducts[0] == "") ? array.shift(): false
    clearInnerHTML("debugPrints0");
    notsubs = initialize.trinity.filter(x => !array.includes(x));
    if (param === "subscribed") {
        createProductBlocky(matrix, array, '', '', 'debugPrints0');
    } else if (param === "notsubscribed") {
        createProductBlocky(matrix, notsubs, '', '', 'debugPrints0');
    } else if (param === "all") {
        createProductBlocky(matrix, initialize.trinity, '', '', 'debugPrints0');
    } else {
        createProductBlocky(matrix, initialize.trinity, '', '', 'debugPrints0');
    }
}

function returnStuffy(type, targetPosition, filterType, filterOptionClassOn, filterOptionClassOff, filterArray) {
    console.log(document.getElementById(targetPosition));
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
    //document.getElementById(targetPosition).setAttribute("onchange",(this.options)?this.options[this.selectedIndex].onclick():false);
}

function createActiveButtons(filterType, activeArray) {
    let array = activeArray;
    let filter = filterType;
    let i = array.length;
    let filterButton,filterSpan, classOn, classOff, thisOptionId, functionOnClickString, currentId;
    let targetFilter = "active" + filterType + "ButtonFiltersHere";
    clearInnerHTML(targetFilter);
    for (i; i--;) {
        thisOptionId = "OPTION" + filterType + array[i];
        classOn = "button" + filterType + "On";
        classOff = "button" + filterType + "Off";
        currentId = "activeButton" + array[i];
        filterButton = document.createElement("BUTTON");
        filterSpan = document.createElement("span");
        filterSpan.setAttribute('id', "span"+currentId);
        filterSpan.setAttribute('class', "spanActive");
        filterButton.setAttribute('id', currentId);
        filterButton.setAttribute('class', "buttonActive");
        functionOnClickString = "filtersClass('" + thisOptionId + "','" + classOn + "','" + classOff + "','" + currentId + "'),getFilters('" + filterType + "','" + classOn + "','" + classOff + "')";
        filterButton.innerHTML = array[i];
        filterSpan.innerHTML = "x";

        document.getElementById(targetFilter).removeAttribute("onclick");
        document.getElementById(targetFilter).setAttribute("onclick",functionOnClickString);
        filterButton.appendChild(filterSpan);
        document.getElementById(targetFilter).appendChild(filterButton);
    }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/

function validateFilters(filterType, classesValueArray, myObject) {
    console.log("validate filters");
    console.log(filterType);
    console.log(classesValueArray);

    let blank = "";
    let i, len, currentList, currentName, FilterOptionDefault;

    if (filterType == "Sector") {
        if ((classesValueArray == blank) || (initialize.productsCommonSecRegCon == blank)) {
            clearInnerHTML("activeCountryFiltersHere");
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeCountryButtonFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        } else if ((initialize.productsCommonSecRegConSeg == blank) || (initialize.filterSegmentOn != blank)) {
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        } else if (initialize.productsCommonSecReg == blank) {
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
        if ((classesValueArray == blank) || (initialize.productsCommonSecRegConSeg == blank) || (document.getElementById("testSegmentFilterLocation").innerHTML == "")) {
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        }
    }
    if (filterType === 'all') {
        console.time("clear all");
        arrayBlank = [];
        myObject = initialize;
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
        createProductBlocky(myObject.neo, myObject.trinity, '', '', 'debugPrints0');
        createFilterOption(myObject.neo, 'testRegionFilterLocation', arrayNoDups(returnFieldifMatch(myObject.neo, '4', '12', 'active')), 'Region', 'buttonRegionOff', 'buttonRegionOn', 'no');
        createFilterOption(myObject.neo, 'testSectorFilterLocation', arrayNoDups(returnFieldifMatch(myObject.neo, '3', '12', 'active')), 'Sector', 'buttonSectorOff', 'buttonSectorOn', 'no');
        createFilterOption(myObject.neo, 'testCountryFilterLocation', arrayBlank, 'Country', 'buttonCountryOff', 'buttonCountryOn', 'no');
        createFilterOption(myObject.neo, 'testSegmentFilterLocation', arrayBlank, 'Segment', 'buttonSegmentOff', 'buttonSegmentOn', 'no');
        console.timeEnd("clear all");
        }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/

function refreshArrays() {
    initialize.productsSectorOn = [];
    initialize.productsRegionOn = [];
    initialize.productsCountryOn = [];
    initialize.productsSegmentOn = [];
}

function searchBox(input) {
    const targetPosition = document.getElementById("debugPrints0");
    let toMatch = input.toUpperCase();
    let matchedArray = [];
    for (let i = initialize.trinity.length; i--;)(initialize.trinity[i].toUpperCase().indexOf(toMatch) > -1) ? matchedArray.push(initialize.trinity[i]) : false
    clearInnerHTML("debugPrints0");
    (matchedArray.length) ? createProductBlocky(initialize.neo, matchedArray, '', '', 'debugPrints0'): targetPosition.innerHTML = "SORRY NO PRODUCTS FOUND";
}

function filterSelect(target){
  console.log(document.getElementById(target));
  document.getElementById(target).setAttribute("onchange",this.options[this.selectedIndex].onclick());
}
