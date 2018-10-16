/* JAVASCRIPT FUNCTIONS LIBRARY FOR PREFERENCE CENTER */

/* VERSION 0.0.18 | DATE 14-10-2018 */



function initObj() {
    var initialize = {
        filterSectorOn: [],
        filterRegionOn: [],
        filterCountryOn: [],
        filterSegmentOn: [],
        productsSectorOn: [],
        productsRegionOn: [],
        productsCountryOn: [],
        productsSegmentOn: [],
        productsCommonSecReg: [],
        productsCommonSecRegCon: [],
        productsCommonSecRegConSeg: [],
        productInterestLatinAmerica: [],
        productInterestEurope: [],
        productInterestAsia: [],
        neo: [],
        trinity: [],
        subscribedProducts: []
    };
    return initialize;
  }
  function init(){
  //let preferenceCenterObject = init();
  console.log(preferenceCenterObject);
    preferenceCenterObject.neo = doubleCSVtoMatrix('allDEFields', ';', '$');
    preferenceCenterObject.trinity = returnFieldifMatch(preferenceCenterObject.neo, '2');
    preferenceCenterObject.subscribedProducts = csvToArray(document.getElementById('testInterests').innerHTML, ';');

    console.log('%c Important Variables', 'color: #31e2d4;font-weight:bold;');
    //console.log({
      //  initialize
    //});
    createProductBlocky(preferenceCenterObject.neo, preferenceCenterObject.trinity, '', '', 'debugPrints0');
    createFilterOption(preferenceCenterObject.neo, 'testSectorFilterLocation', arrayNoDups(returnFieldifMatch(preferenceCenterObject.neo, '3', '12', 'active')), 'Sector', 'buttonSectorOff', 'buttonSectorOn', 'no');
    createFilterOption(preferenceCenterObject.neo, 'testRegionFilterLocation', arrayNoDups(returnFieldifMatch(preferenceCenterObject.neo, '4', '12', 'active')), 'Region', 'buttonRegionOff', 'buttonRegionOn', 'no');
}
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
    let subscribedProds = preferenceCenterObject.subscribedProducts;
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
        //FilterOptionDefault.setAttribute("onclick", myFunction());
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

    returnFieldifMatchArray(preferenceCenterObject.neo, 2, filterType, classesValueArray,preferenceCenterObject);
    console.log(classesValueArray);
    createActiveButtons(filterType, classesValueArray);
    validateFilters(filterType, classesValueArray, preferenceCenterObject);
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
    createBlockys(filterType,preferenceCenterObject);
    return matchedArray1;
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function convertNametoNumber(filterType, updateValue) {
    let filterNumber;
    if (filterType == "Sector") {
        preferenceCenterObject.filterSectorOn = updateValue;
        filterNumber = "3";
    } else if (filterType == "Region") {
        preferenceCenterObject.filterRegionOn = updateValue;
        filterNumber = "4";
    } else if (filterType == "Country") {
        preferenceCenterObject.filterCountryOn = updateValue;
        filterNumber = "6";
    } else if (filterType == "Segment") {
        preferenceCenterObject.filterSegmentOn = updateValue;
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
        preferenceCenterObject.productsSectorOn = updateValue;
    } else if (filterType == "Region") {
        preferenceCenterObject.productsRegionOn = updateValue;
    } else if (filterType == "Country") {
        preferenceCenterObject.productsCountryOn = updateValue;
    } else if (filterType == "Segment") {
        preferenceCenterObject.productsSegmentOn = updateValue;
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
        createFiltersFunction(myObject.neo, common1, 6,"Country");
    }
    if (filterType != "Segment") {
        createFiltersFunction(myObject.neo, common2, 8,"Segment");
    }
    if (filterType == "Region") {
        createFiltersFunction(myObject.neo, myObject.productsRegionOn, 3, "Sector");
    }
    if (filterType == "Sector") {
        createFiltersFunction(myObject.neo, myObject.productsSectorOn, 4, "Region");
    }
}

function createFiltersFunction(matrix, array, fieldToMatch,filterType) {
    console.log(matrix, array, fieldToMatch,filterType);
    let type = filterType;
    let classOn = "button"+type+"On";
    let classOff = "button"+type+"Off";
    let target = "test"+type+"FilterLocation";
    let countryMatchArray = [];
    let arrayLen = array.length;
    let matrixLen = matrix.length;
    if (arrayLen) {
        for (let i = arrayLen; i--;) {
            for (let j = matrixLen; j--;)((matrix[j][2] == array[i]) && (matrix[j][fieldToMatch] != 'All')) ? countryMatchArray.push(matrix[j][fieldToMatch]) : false
        }
    }
    let countriesBoy = arrayNoDups(countryMatchArray);
    createFilterOption(matrix, target , countriesBoy, type, classOn, classOff);
}

function subscribedClass(productId, productClassOn, checkboxId) {

    let target = document.getElementById(checkboxId).classList;
    (target.contains(productClassOn)) ? (target.remove(productClassOn), removeFromArray(preferenceCenterObject.subscribedProducts, productId)) : (target.add(productClassOn), preferenceCenterObject.subscribedProducts.push(productId));
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/



/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function readyInterests() {
    let aux, i;
    let allInput = document.getElementById('interestsAll');
    let latamInput = document.getElementById('interestsLatam');
    let europeInput = document.getElementById('interestsEurope');
    let asiaInput = document.getElementById('interestsAsia');
    let subProdLen = preferenceCenterObject.subscribedProducts.length;

    for (i = subProdLen; i--;) {
        aux = returnFieldifMatch(neo, 4, 2, preferenceCenterObject.subscribedProducts[i]);

        if ((aux == "Latin America") && (preferenceCenterObject.productInterestLatinAmerica)) {
            productInterestLatinAmerica.push(preferenceCenterObject.subscribedProducts[i]);
        } else if ((aux == "Europe") && (preferenceCenterObject.productInterestEurope)) {
            productInterestEurope.push(preferenceCenterObject.subscribedProducts[i]);
        } else if ((aux == "Asia") && (preferenceCenterObject.productInterestAsia)) {
            productInterestAsia.push(preferenceCenterObject.subscribedProducts[i]);
        }
        if (preferenceCenterObject.subscribedProducts[i] === "") {
            removeFromArray(preferenceCenterObject.subscribedProducts, preferenceCenterObject.subscribedProducts[i]);
        }
    }

    allInput.value = arrayNoDups(preferenceCenterObject.subscribedProducts);
    latamInput.value = changeParsers(arrayNoDups(preferenceCenterObject.productInterestLatinAmerica));
    europeInput.value = changeParsers(arrayNoDups(preferenceCenterObject.productInterestEurope));
    asiaInput.value = changeParsers(arrayNoDups(preferenceCenterObject.productInterestAsia));
}

function sortBy(param) {
    let notsubs = [];
    let array = preferenceCenterObject.subscribedProducts;
    let matrix = preferenceCenterObject.neo;
    let matrixLen = matrix.length;
    let arrayLen = preferenceCenterObject.subscribedProducts.length;
    (preferenceCenterObject.subscribedProducts[0] == "") ? array.shift(): false
    clearInnerHTML("debugPrints0");
    notsubs = preferenceCenterObject.trinity.filter(x => !array.includes(x));
    if (param === "subscribed") {
        createProductBlocky(matrix, array, '', '', 'debugPrints0');
    } else if (param === "notsubscribed") {
        createProductBlocky(matrix, notsubs, '', '', 'debugPrints0');
    } else if (param === "all") {
        createProductBlocky(matrix, preferenceCenterObject.trinity, '', '', 'debugPrints0');
    } else {
        createProductBlocky(matrix, preferenceCenterObject.trinity, '', '', 'debugPrints0');
    }
}

function returnStuffy(type, targetPosition, filterType, filterOptionClassOn, filterOptionClassOff, filterArray) {
    //console.log(document.getElementById(targetPosition));
    thisOptionId = "OPTION" + filterType + filterArray;
    thisButtonId = type + filterType + filterArray;
    FilterOption = document.createElement("BUTTON");
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
        if ((classesValueArray == blank) || (preferenceCenterObject.productsCommonSecRegCon == blank)) {
            clearInnerHTML("activeCountryFiltersHere");
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeCountryButtonFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        } else if ((preferenceCenterObject.productsCommonSecRegConSeg == blank) || (preferenceCenterObject.filterSegmentOn != blank)) {
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        } else if (preferenceCenterObject.productsCommonSecReg == blank) {
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
        if ((classesValueArray == blank) || (preferenceCenterObject.productsCommonSecRegConSeg == blank) || (document.getElementById("testSegmentFilterLocation").innerHTML == "")) {
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        }
    }
    if (filterType === 'all') {
        console.time("clear all");
        arrayBlank = [];
        myObject = preferenceCenterObject;
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
    preferenceCenterObject.productsSectorOn = [];
    preferenceCenterObject.productsRegionOn = [];
    preferenceCenterObject.productsCountryOn = [];
    preferenceCenterObject.productsSegmentOn = [];
}
function searchBox(input) {
    const targetPosition = document.getElementById("debugPrints0");
    let toMatch = input.toUpperCase();
    let matchedArray = [];
    for (let i = preferenceCenterObject.trinity.length; i--;)(preferenceCenterObject.trinity[i].toUpperCase().indexOf(toMatch) > -1) ? matchedArray.push(preferenceCenterObject.trinity[i]) : false
    clearInnerHTML("debugPrints0");
    (matchedArray.length) ? createProductBlocky(preferenceCenterObject.neo, matchedArray, '', '', 'debugPrints0'): targetPosition.innerHTML = "SORRY NO PRODUCTS FOUND";
}
function filterSelect(target){
  console.log(document.getElementById(target));
  document.getElementById(target).setAttribute("onchange",this.options[this.selectedIndex].onclick());
}
