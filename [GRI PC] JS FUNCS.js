/* JAVASCRIPT FUNCTIONS LIBRARY FOR PREFERENCE CENTER */

/* VERSION 0.0.20 | DATE 17-10-2018 */

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
function init(obj) {
    console.log({obj});
    obj.neo = doubleCSVtoMatrix('allDEFields', ';', '$');
    obj.trinity = returnFieldifMatch(obj.neo, '2');
    obj.subscribedProducts = csvToArray(document.getElementById('testInterests').innerHTML, ';');
    console.log('%c Important Variables', 'color: #31e2d4;font-weight:bold;');
    createProductBlocky(obj.neo, obj.trinity, 'debugPrints0');
    createFilterOption(obj.neo, 'testSectorFilterLocation', arrayNoDups(returnFieldifMatch(obj.neo, '3', '12', 'active')), 'Sector', 'buttonSectorOff', 'buttonSectorOn', 'no');
    createFilterOption(obj.neo, 'testRegionFilterLocation', arrayNoDups(returnFieldifMatch(obj.neo, '4', '12', 'active')), 'Region', 'buttonRegionOff', 'buttonRegionOn', 'no');
}

function createProductBlocky(matrix, wantedArray, targetLocationId) {
    let j, dynamicTD, dynamicLABEL, dynamicDIV, dynamicDIV2, dynamicINPUT, dynamicSPAN, dynamicSPAN2, dynamicIMAGE, toggleButtonFunction,count=0;
    let currentName;
    let classz = "subscribedOn";
    let subscribedProds = preferenceCenterObject.subscribedProducts;
    let subsLen = subscribedProds.length;
    for (let i = wantedArray.length; i--;) {
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

            dynamicINPUT.setAttribute('onclick', toggleButtonFunction);
            //dynamicINPUT.addEventListener('onclick', toggleButtonFunction);
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
            (count === 5) ? (count = 0, document.getElementById(targetLocationId).appendChild(dynamicBR)) : false
            document.getElementById(targetLocationId).appendChild(dynamicTD);
            count++;
        }
    }
}
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

function getFilters(filterType) {
    let filterClass = 'button' + filterType + 'On';
    let classesArray = document.getElementsByClassName(filterClass);
    let classesValueArray = [];
    let targetid = "active" + filterType + "FiltersHere";
    for (let i = classesArray.length; i--;) classesValueArray[i] = classesArray[i].value
    document.getElementById(targetid).innerHTML = classesValueArray;
    returnFieldifMatchArray(preferenceCenterObject.neo, 2, filterType, classesValueArray);
    createActiveButtons(filterType, classesValueArray);
    validateFilters(filterType, classesValueArray);
    return classesValueArray;
}

function createActiveButtons(filterType, activeArray) {
    let array = activeArray;
    let filter = filterType;
    let filterButton, classOn, classOff, thisOptionId, functionOnClickString, currentId,text;
    let targetFilter = "active" + filterType + "ButtonFiltersHere";
    clearInnerHTML(targetFilter);
    classOn = "button" + filterType + "On";
    classOff = "button" + filterType + "Off";
    for (let i = array.length; i--;) {
        filterButton = document.createElement("BUTTON");
        thisOptionId = "OPTION" + filterType + array[i];
        currentId = "activeButton" + array[i];
        filterButton.setAttribute('id', currentId);
        filterButton.setAttribute('class', "buttonActive");
        functionOnClickString = "filtersClass('" + thisOptionId + "','" + classOn + "','" + classOff + "','" + currentId + "'),getFilters('" + filterType + "','" + classOn + "','" + classOff + "')";
        filterButton.setAttribute('onclick', functionOnClickString);
        text = (array[i]==="Latin America") ? "Latam":array[i]
        filterButton.innerHTML = filterType+":"+text;
        //filterButton.innerHTML = array[i];
        document.getElementById(targetFilter).appendChild(filterButton);
    }
}

function createBlockys(filterType) {
	let obj = preferenceCenterObject;
    refreshCommons(obj);
    console.log({obj});
    clearInnerHTML("debugPrints0");
    if ((obj.productsCommonSecRegConSeg.length) && (obj.filterSegmentOn != "")) {
        createProductBlocky(obj.neo, obj.productsCommonSecRegConSeg, 'debugPrints0');
    } else if ((obj.productsCommonSecRegCon.length) && (obj.filterCountryOn != "")) {
        createProductBlocky(obj.neo, obj.productsCommonSecRegCon, 'debugPrints0');
    } else if (obj.productsCommonSecReg.length) {
        createProductBlocky(obj.neo, obj.productsCommonSecReg, 'debugPrints0');
    } else if (obj.productsRegionOn.length) {
        createProductBlocky(obj.neo, obj.productsRegionOn, 'debugPrints0');
    } else if (obj.productsSectorOn.length) {
        createProductBlocky(obj.neo, obj.productsSectorOn, 'debugPrints0');
    } else {
        createProductBlocky(obj.neo, obj.trinity, 'debugPrints0');
    }
    filtersCheck(filterType,obj);
}
function refreshCommons(obj){
  obj.productsCommonSecReg = arrayNoDups(arrayIntersec(obj.productsSectorOn, obj.productsRegionOn));
  obj.productsCommonSecRegCon = arrayNoDups(arrayIntersec(obj.productsCommonSecReg, obj.productsCountryOn));
  obj.productsCommonSecRegConSeg = arrayNoDups(arrayIntersec(obj.productsCommonSecRegCon, obj.productsSegmentOn));
}
function filtersCheck(filterType,obj){
  if (((filterType != "Country") && (filterType != "Segment")) && ((obj.filterRegionOn.length) || (obj.filterSectorOn.length))) {
      createFiltersFunction(obj.neo, obj.productsCommonSecReg, 6, "Country");
  }
  if (filterType != "Segment") {
      createFiltersFunction(obj.neo, obj.productsCommonSecRegCon, 8, "Segment");
  }
  if (filterType == "Region") {
      createFiltersFunction(obj.neo, obj.productsRegionOn, 3, "Sector");
  }
  if (filterType == "Sector") {
      createFiltersFunction(obj.neo, obj.productsSectorOn, 4, "Region");
  }
}

function createFiltersFunction(matrix, array, fieldToMatch, filterType) {
    let classOn = "button" + filterType + "On";
    let classOff = "button" + filterType + "Off";
    let target = "test" + filterType + "FilterLocation";
    let matchArray = [];
    let arrayLen = array.length;
    let matrixLen = matrix.length;
    if (arrayLen) {
        for (let i = arrayLen; i--;) {
            for (let j = matrixLen; j--;)((matrix[j][2] == array[i]) && (matrix[j][fieldToMatch] != 'All')) ? matchArray.push(matrix[j][fieldToMatch]) : false
        }
    }else if(filterType=="Sector"||filterType=="Region") {
        matchArray = arrayNoDups(returnFieldifMatch(matrix, fieldToMatch, '12', 'active'));
    }
    matchArray = arrayNoDups(matchArray);
    createFilterOption(matrix, target, matchArray, filterType, classOff, classOn);
}

function createFilterOption(matrix, targetPosition, arrayToMatch, filterType, classOFF, classON) {
    document.getElementById(targetPosition).innerHTML = "";
    let filterArray = arrayToMatch;
    if (filterArray.length) {
        let i = filterArray.length;
        for (i; i--;returnStuffy( targetPosition, filterType, classON, classOFF, filterArray[i])) {}
    }
}

function returnStuffy(targetPosition, filterType, classOn, classOff, filterArray) {
    let thisId, filterOption, functionOnClickString, activeFilters, activeFilterLen, filterClass,jump;
    thisId = "OPTION" + filterType + filterArray;
    activeFilters = "active" + filterType + "FiltersHere";
    activeFiltersArray = csvToArray(document.getElementById(activeFilters).innerHTML, ',');
    filterOption = document.createElement("BUTTON");
	jump = document.createElement("BR");
    filterOption.setAttribute('id', thisId);
    functionOnClickString = "filtersClass('" + thisId + "','" + classOn + "','" + classOff + "'),getFilters('" + filterType + "','" + classOn + "','" + classOff + "')";
    for (let j = activeFiltersArray.length; j--;) filterClass = (activeFiltersArray[j] == filterArray) ? classOn : classOff
    filterOption.setAttribute('class', filterClass);
    filterOption.innerHTML = filterArray;
    filterOption.setAttribute('value', filterArray);
    filterOption.setAttribute('onclick', functionOnClickString);
	(document.getElementById(targetPosition).innerHTML) ? document.getElementById(targetPosition).appendChild(jump):false
    document.getElementById(targetPosition).appendChild(filterOption);
}


/*---- ------------------------------ ---------------------- ------------------------------ ----*/

function validateFilters(filterType, classesValueArray) {
    let obj = preferenceCenterObject;
    console.log("validate filters");
    console.log(filterType);
    console.log(classesValueArray);
    let blank = "";
    if (filterType == "Sector") {
        if ((classesValueArray == blank) || (obj.productsCommonSecRegCon.length)) {
            clearInnerHTML("activeCountryFiltersHere");
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeCountryButtonFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        } else if ((obj.productsCommonSecRegConSeg.length) || (!obj.filterSegmentOn.length)) {
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
        } else if (obj.productsCommonSecReg.length) {
            clearInnerHTML("activeRegionFiltersHere");
            clearInnerHTML("activeRegionButtonFiltersHere");
        }
        obj.filterSectorOn=[];

        //else if (classesValueArray.indexOf("Real Estate")<=0){
          //filtersClass('OPTIONRegionEurope','buttonRegionOn','buttonRegionOff','activeButtonEurope'),getFilters('Region','buttonRegionOn','buttonRegionOff');

/* THINK OF WAY OF REMOVING EUROPE IF SELECT RE INFRA EUROPE ASIA THEN REMOVES RE*/

        //}
    }
    if ((filterType == "Region") && (classesValueArray == blank)) {
        clearInnerHTML("activeCountryFiltersHere");
        clearInnerHTML("activeSegmentFiltersHere");
        clearInnerHTML("activeCountryButtonFiltersHere");
        clearInnerHTML("activeSegmentButtonFiltersHere");
        obj.productsRegionOn=[];
        obj.productsCountryOn=[];
        obj.productsSegmentOn=[];
        obj.filterRegionOn=[];
        obj.filterCountryOn=[];
        obj.filterSegmentOn=[];
    }
    if (filterType == "Country") {
        if ((classesValueArray == blank) || (obj.productsCommonSecRegConSeg.length) || (document.getElementById("testSegmentFilterLocation").innerHTML == "")) {
            clearInnerHTML("activeSegmentFiltersHere");
            clearInnerHTML("activeSegmentButtonFiltersHere");
            obj.productsSegmentOn=[];
              obj.filterSegmentOn=[];
              obj.filterCountryOn=[];
              obj.productsCommonSecRegCon=[];
              obj.productsCommonSecRegConSeg=[];
        }
    }
    if (filterType === 'all') {
        console.time("clear all");
        arrayBlank = [];
        console.log({obj});
        refreshArrays(obj);
        let arr = [
          "activeSegmentButtonFiltersHere",
          "activeCountryButtonFiltersHere",
          "activeRegionButtonFiltersHere",
          "activeSectorButtonFiltersHere",
          "activeSegmentFiltersHere",
          "activeCountryFiltersHere",
          "activeRegionFiltersHere",
          "activeSectorFiltersHere",
          "debugPrints0"
        ];
        for(let i = arr.length;i--;clearInnerHTML(arr[i])){}
        createProductBlocky(obj.neo, obj.trinity, 'debugPrints0');
        createFilterOption(obj.neo, 'testRegionFilterLocation', arrayNoDups(returnFieldifMatch(obj.neo, '4', '12', 'active')), 'Region', 'buttonRegionOff', 'buttonRegionOn', 'no');
        createFilterOption(obj.neo, 'testSectorFilterLocation', arrayNoDups(returnFieldifMatch(obj.neo, '3', '12', 'active')), 'Sector', 'buttonSectorOff', 'buttonSectorOn', 'no');
        createFilterOption(obj.neo, 'testCountryFilterLocation', arrayBlank, 'Country', 'buttonCountryOff', 'buttonCountryOn', 'no');
        createFilterOption(obj.neo, 'testSegmentFilterLocation', arrayBlank, 'Segment', 'buttonSegmentOff', 'buttonSegmentOn', 'no');
        console.timeEnd("clear all");
    }
}
/*---- ------------------------------ ---------------------- ------------------------------ ----*/
function refreshArrays(obj) {
    //const {productsSectorOn,productsRegionOn,productsCountryOn,productsSegmentOn} = obj;
    obj.productsRegionOn = [];
    obj.productsSectorOn = [];
    obj.productsSegmentOn = [];
    obj.productsCountryOn = [];

}

function searchBox(input) {
    const targetPosition = document.getElementById("debugPrints0");
    let toMatch = input.toUpperCase();
    let matchedArray = [];
    for (let i = preferenceCenterObject.trinity.length; i--;)(preferenceCenterObject.trinity[i].toUpperCase().indexOf(toMatch) > -1) ? matchedArray.push(preferenceCenterObject.trinity[i]) : false
    clearInnerHTML("debugPrints0");
    (matchedArray.length) ? createProductBlocky(preferenceCenterObject.neo, matchedArray, 'debugPrints0'): targetPosition.innerHTML = "SORRY NO PRODUCTS FOUND";
}
function filterSelect(target){
  document.getElementById(target).setAttribute("onchange",this.options[this.selectedIndex].onclick());
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
        createProductBlocky(matrix, array, 'debugPrints0');
    } else if (param === "notsubscribed") {
        createProductBlocky(matrix, notsubs, 'debugPrints0');
    } else if (param === "all") {
        createProductBlocky(matrix, preferenceCenterObject.trinity, 'debugPrints0');
    } else {
        createProductBlocky(matrix, preferenceCenterObject.trinity, 'debugPrints0');
    }
}


function readyInterests() {
	  let obj = preferenceCenterObject;
    let aux, i;
    let allInput = document.getElementById('interestsAll');
    let latamInput = document.getElementById('interestsLatam');
    let europeInput = document.getElementById('interestsEurope');
    let asiaInput = document.getElementById('interestsAsia');
    let subProdLen = obj.subscribedProducts.length;
    for (i = subProdLen; i--;) {
        aux = returnFieldifMatch(obj.neo, 4, 2, obj.subscribedProducts[i]);
        if ((aux == "Latin America") && (obj.productInterestLatinAmerica)) {
            productInterestLatinAmerica.push(obj.subscribedProducts[i]);
        } else if ((aux == "Europe") && (obj.productInterestEurope)) {
            productInterestEurope.push(obj.subscribedProducts[i]);
        } else if ((aux == "Asia") && (obj.productInterestAsia)) {
            productInterestAsia.push(obj.subscribedProducts[i]);
        }
        if (obj.subscribedProducts[i] === "") {
            removeFromArray(obj.subscribedProducts, obj.subscribedProducts[i]);
        }
    }
    allInput.value = arrayNoDups(obj.subscribedProducts);
    latamInput.value = changeParsers(arrayNoDups(obj.productInterestLatinAmerica));
    europeInput.value = changeParsers(arrayNoDups(obj.productInterestEurope));
    asiaInput.value = changeParsers(arrayNoDups(obj.productInterestAsia));
}

function subscribedClass(productId, productClassOn, checkboxId) {
    let target = document.getElementById(checkboxId).classList;
    (target.contains(productClassOn)) ? (target.remove(productClassOn), removeFromArray(preferenceCenterObject.subscribedProducts, productId)) : (target.add(productClassOn), preferenceCenterObject.subscribedProducts.push(productId));
}


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

function returnFieldifMatchArray(matrix, wantedField, filterType, classesValueArray,myObject) {
    let matchedArray1 = [];
    let conditionValues1 = csvToArray(document.getElementById('active' + filterType + 'FiltersHere').innerHTML, ',');
    let condVal1Len = conditionValues1.length;
    let conditionField = convertNametoNumber(filterType, conditionValues1)
    let matrixLen = matrix.length;
    if (conditionValues1) {
        for (let i = condVal1Len; i--;) {
            for (let j = matrixLen; j--;) {
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
    createBlockys(filterType, preferenceCenterObject);
    return matchedArray1;
}
