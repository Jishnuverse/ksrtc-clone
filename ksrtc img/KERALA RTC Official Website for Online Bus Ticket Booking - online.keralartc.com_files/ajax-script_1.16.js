/*
 * Author		: Rajasekhar
 * Description 	: Dojo Ajax JavaScripts for Abhibus OPRS Project
 */

/** ************************ Jquery AJAX stuff start ************************** */


var sortTermGlobal;	

var DIV_DEFAULT_WIDTH = "100%",DIV_DEFAULT_HEIGHT = "100%";
// refreshId -- refresh id is used to get the information of current page
var selectedIds = "", refreshId = "",parameter1 = "", parameter2 = "";
var _TAB = '9', _ESC = '27',_ETR = '13', _DEL = '46';
var _Z0 = 48, _N9 = 57, _A = 65, _Z = 90, _BSPC = 8, _SPC = 32;
var refreshInt = 3;
var divPosition = 'relative';
function getCurrentIndex(curIdx, divName) {
	if(curIdx > 0)
		return curIdx;
	// modify the display content as per regular expression matching string
	var table = document.getElementById(divName+"Tbl");
	var row, col;
	for (var i = 0; table != null && (row = table.rows[i]); i++) {
	   //iterate through rows
	   //rows would be accessed using the "row" variable assigned in the for loop
	   for (var j = 0; (col = row.cells[j]); j++) {
		   //iterate through columns
		   //columns would be accessed using the "col" variable assigned in the for loop
		   if(col.style.display != 'none') {
			   return i;
		   }
	   }
	}// end of rows for loop
	return 0;
}

function respHandlerAjaxJS(txtIdDest, txtCodeSrc, txtNameDest, eventObj, divName) {
	var found = false, t, aStr;
	var rexp = "";
	var tgtId;
	if(window.event) {
		// IE
		tgtId = window.event.srcElement.id;
	} else {
		tgtId = eventObj.target.id;
	}
	rexp = document.getElementById(tgtId).value;
	if(rexp == null || rexp == '') {
		return found;
	}
	rexp = LTrim(RTrim(rexp));
	var pat = new RegExp(rexp.toUpperCase());
	var tStr = "", len = rexp.length;
	// modify the display content as per regular expression matching string
	var table = document.getElementById(divName+"Tbl");
	var row, col;
	for (var i = 0; table != null && (row = table.rows[i]); i++) {
	   //iterate through rows
	   //rows would be accessed using the "row" variable assigned in the for loop
	   for (var j = 0; (col = row.cells[j]); j++) {
		   //iterate through columns
		   //columns would be accessed using the "col" variable assigned in the for loop
		   aStr = col.innerHTML;
		   var vAry = aStr.split("&nbsp;");
		   tStr = LTrim(RTrim(vAry[0]));
		   if(tStr.length == 0) 
			   continue;
		   if(tStr.length > len) {
			   tStr = tStr.substring(0, len);
		   }
		   t = pat.test(tStr);
		   
		   if(t) {
			   found = true;
			   col.style.display = 'block';
			   showdiv(divName);
		   } else {
			   // remove the items from response div display
			   col.style.display = 'none';
		   }
	   }
	}// end of rows for loop
	return found;
}


/**
 * This function is used to submit an ajax action. This method takes path and
 * division names as parameter.
 */
function submitCommonAjaxAction(path, lookupId, divName) {
	var	divWidth = "100%";
	var vHeight = "30%";
	// set the given lookupId to submit in ajax action
	selectedIds = lookupId;

	ajaxCommonActionSubmit(path, divName, divWidth, vHeight);
}// end of submitCommonAjaxAction(?, ?);

/**
 * This function is used to submit an ajax action. This method takes path and
 * division names as parameter.
 */
function submitAjaxAction(path, divName) {
	var	divWidth = "100%";
	var vHeight = "30%";

	ajaxCommonActionSubmit(path, divName, divWidth, vHeight);
}// end of submitAjaxAction(?, ?);

/**
 * This function is used to submit an ajax action. This method takes path and
 * division names as parameter.
 */
function submitAjaxActionDefaultWidth(path, divName) {
	vHEIGHT = "100%";
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, vHEIGHT);
}// end of submitAjaxActionDefaultWidth(?, ?);


function showLoadingTxt(vHeight, divWidth, divName) {
	var pgr = document.getElementById('progressBarDiv');
	if(pgr != null 
			&& pgr.style.display == 'block') {
		return false;
	}
	$(divName).innerHTML = "<span class='loadingBgClr'>Loading...</span>";
	$(divName).style.overflow = 'auto';
	$(divName).style.height = vHeight;
	$(divName).style.width = divWidth;
	$(divName).style.position = divPosition;
	showdiv(divName);
}


// this method is used to process the add product details action
function processCommonAjaxResponse(response, divName, vWidth, vHeight) {
	
	if(document.getElementById("progressBarDiv") != null) {
		hidediv("progressBarDiv");
	}
	$(divName).show();	
	
	divPosition='relative';
}// end of processCommonAjaxResponse();
/** *******************************  ******************************* **/
/** **************** COMMON AJAX actions ends here ***************** **/
/** *******************************  ******************************* **/
/**
 * This method is used to set the sort details of the a form, and calls the ajax
 * action submit method.
 */
function ajaxSort(path, sortId,  divName) {
	
	var previousId = document.getElementById("sortId").value;
	var previousOrder = document.getElementById("sortOrder").value;
	var nextId = sortId;
	var nextOrder = "ASC";
	
	if ((previousId != null) && (previousId == nextId)) {
		if ((previousOrder != null) && (previousOrder == "ASC")) {
			nextOrder = "DESC";
		} else {
			nextOrder = "ASC";
		}
	}
	
	// set the required parameters.
	parameter1 = nextId;
	parameter2 = nextOrder;
	
	if(document.getElementById("startIndex") != null) {
		// set the start index
		startIndexValue = document.getElementById("startIndex").value;
	} else {
		startIndexValue = "0";
	}
	
	// submit the pagination action to get the next page.
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
}// end of ajaxSort()

/**
 * Ajax function to get the next page based on the index value.
 * 
 * @param path --
 *            the action path that needs to be submited
 * @param indexVal --
 *            the starting inedex value where the page starts
 * @param divName --
 *            division name
 */
function ajaxGotoIndex(path, indexVal, divName) {
	// get the start index value.
	startIndexValue = indexVal;

	// submit the pagination action to get the next page.
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
}// end of ajaxGotoIndex()

/**
 * Ajax function to get the next page based on the index value.
 * 
 * @param path --
 *            the action path that needs to be submited
 * @param indexVal --
 *            the starting inedex value where the page starts
 * @param divName --
 *            division name
 */
function ajaxGotoNext20PageIndex(path, indexVal, next20page, divName) {
	// get the start index value.
	startIndexValue = indexVal;
	parameter1 = next20page;
	
	// submit the pagination action to get the next page.
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
}// end of ajaxGotoIndex()

/*
 * This function used for paging based on the start index
 */
function ajaxGotoNext20Index(startIdx, path, divName) {
	if (startIdx.length < 1) {
		startIdx = 0;
	}
	// next 20 page value as start index value
	parameter1 = startIdx;
	// set the start index value
	startIndexValue = (startIdx - 1) * 10;
	// submit the ajax action
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

/*
 * This function used for paging based on the start index
 */
function ajaxGotoPrevious20Index(startIdx, path, divName) {
	if (startIdx.length < 1) {
		startIdx = 0;
	}
	// set next 20 page value with new value
	parameter1 = startIdx - 19;
	// set the start index value
	startIndexValue = (startIdx - 20) * 10;
	// submit the ajax action
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
}
/** ************************************************************************** **/


/**
 * Function to replace all single quotes back
 */
function replaceAllSingleQuotes(str2Replace) {
	while(str2Replace.search("###") != -1) {
		str2Replace = str2Replace.replace("###", "\'");
	}
	return str2Replace;
}

//function to test the value is empty or not
function isEmpty(val) {
	if(val == '' || val.length < 1) {
		return true;
	}
	return false;
}// end of is empty function.

function hideDivision(divName) {
	
	if($(divName) == null || $(divName) == "") {
		return false;
	}

 	if ($(divName).style.display == 'block' || $(divName).style.display == '') {
			// hide the given form
			$(divName).style.display = 'none';
	}
 	//////////////////////////////////////////////
 	// get all the elements within the division.
 	var childNodeArry = $(divName).childNodes;
	for (var i = 0; i < childNodeArry.length; i++) {
		if(childNodeArry[i].id != null ||  childNodeArry[i].id != "") {
			// remove elements in the division.
			if(childNodeArry[i].parentNode != null)
				childNodeArry[i].parentNode.removeChild(childNodeArry[i]);
		}
	}
	
}// end of hideDivision() method

function showdiv(id) {
	if(document.getElementById(id) == null) {
		return false;
	}
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'block';
	} else {
		if (document.layers) { // Netscape 4
			document.id.display = 'block';
		} else { // IE 4
			document.all.id.style.display = 'block';
		}
	}
}

function hidediv(id) {
	if(document.getElementById(id) == null) {
		return false;
	}
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	} else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}

function isRadioButtonChecked(formObj) {
	var inputArray = document.getElementsByTagName("input");
	var size = inputArray.length;
	var checked = false;
	for (var j=0; j < size;j++) {
		if (inputArray[j].type == "radio") {
			checked = inputArray[j].checked;
			if(checked == true) {
				return checked;
			}
		}
	}// end of for loop
	return checked;
}// end of checkRadioChecked()

function showProgressBar(divName, bgDiv) {
	var waitDisplayDiv = document.getElementById(divName); // progress bar division
	if(waitDisplayDiv == null) { return false; } 
	waitDisplayDiv.style.left = (document.body.clientWidth/2) - 200;
	waitDisplayDiv.style.display = '';
	document.body.scrollTop = 0;
  
	showBackground(bgDiv);
}

function showBackground(bgDivName) {
	var waitDiv = document.getElementById(bgDivName); // background Division
    if (! document.body) {
      	waitDiv.style.height = 100;
      	waitDiv.style.width = 200;
    } else {
		waitDiv.style.height = document.body.clientHeight;
		waitDiv.style.width = document.body.clientWidth;
    }
    waitDiv.style.display = '';
    document.body.scrollTop = 0;
}


function getVersionList(val,path,divName){
	selectedIds = LTrim(RTrim(val));
	submitAjaxAction(path,divName);
}

function setVersionList(val,divName) {
	document.getElementById("versionNo").value = val;
	hideDivision(divName);
}

function setRowDataFromAjaxDiv(charCode, divName, txtIdDest, txtObjSrc, txtNameDest) {
	
	var currentIdenx = document.getElementById("currentIndex").value;
	if(document.getElementById("maxSize") == null || document.getElementById("maxSize").value == "") {
		// alert("Property \"maxSize\" is not defined.");
		return false;
	} 
		
	var maxSize = parseInt(document.getElementById("maxSize").value);
	if(maxSize == 0) {
		alert("Property \"maxSize\" value not set.");
		return false;
	}
	var curIdx;
	
	if(currentIdenx == null || currentIdenx == "") {
		curIdx = -1; 
	} else {
		curIdx = parseInt(currentIdenx);
	}
	
	
	if(charCode == '40') {
		curIdx = ++curIdx;
	} else { 
		curIdx = --curIdx;
	}
	
	if(curIdx >= maxSize) {	
		curIdx = --curIdx;
	} else if (curIdx < 0)  {
		curIdx = 0;
	}
	
	document.getElementById("currentIndex").value = curIdx;
	if(document.getElementById(("ajxId_" + curIdx)) == null) {
		return false;
	}
	document.getElementById(txtIdDest).value = document.getElementById(("ajxId_" + curIdx)).value;
	if(txtNameDest != "") {
		document.getElementById(txtNameDest).value = document.getElementById(("ajxName_" + curIdx)).value;
//		document.getElementById(txtNameDest).focus();
	}
	txtObjSrc.value = document.getElementById(("ajxCode_" + curIdx)).value;
}

function populateTextBoxValues(id, codeVal, nameVal, divName) {
	var txtIdDestName = document.getElementById("txtIDSrc").value;
	var txtCodeDestName = document.getElementById("txtCodeSrc").value;
	var txtNameDestName = "";
	
	if(document.getElementById("txtNameSrc") != null) {
		txtNameDestName = LTrim(document.getElementById("txtNameSrc").value);
	}
	
	document.getElementById(txtIdDestName).value = id;
	document.getElementById(txtCodeDestName).value = codeVal;
	
	if(txtNameDestName != "" && txtNameDestName.length > 0 && document.getElementById(txtNameDestName) != null) {
		document.getElementById(txtNameDestName).value = nameVal;
	} else {
		document.getElementById(txtCodeDestName).focus();
	}
	hideDivision(divName);
}

function defaultToCurrentIdexValue(curIdx, txtCodeSrc, txtIdDest, txtNameDest, divName) {

	var txtObjSrc = document.getElementById(txtCodeSrc);
	curIdx = getCurrentIndex(curIdx, divName);
	if(document.getElementById(("ajxId_" + curIdx)) == null || txtObjSrc.value == "") {
		return false;
	}
	
	
	if(document.getElementById(txtIdDest).value != "") {
		return false;
	}
	document.getElementById(txtIdDest).value = document.getElementById(("ajxId_" + curIdx)).value;
	txtObjSrc.value = document.getElementById(("ajxCode_" + curIdx)).value;
	
	if(txtNameDest != "" && document.getElementById(txtNameDest) != null) {
		document.getElementById(txtNameDest).value = document.getElementById(("ajxName_" + curIdx)).value;
//		document.getElementById(txtNameDest).focus();
	}
	hideDivision(divName);
}

function isNonFnKeyPress(charCode) {
	var intCode = parseInt(charCode);
	if((intCode >= _Z0 && intCode <= _N9)
			|| (intCode >= _A && intCode <= _Z)
			|| intCode == _SPC || intCode == _BSPC)
		return false;
	return true;
}
function isNOajaxAction(txtCodeSrc, txtNameDest, lenChek) {
	var length = 0;
	var ob = document.getElementById(txtCodeSrc);
	if(ob != null) {
		length = ob.value.length;
	}
	if(length == 0) {
		ob = document.getElementById(txtNameDest);
		if(ob != null)
			length = ob.value.length;
	}
	if(lenChek == ""){lenChek = 2;}
	if(length == 0 || length < lenChek){return true;}
	return false;
}
function commonAutoCompleteAction(path, txtIdDest, txtCodeSrc, txtNameDest, eventObj, divName) {
	
	var txtObjSrc = document.getElementById(txtCodeSrc);
	var lookupId = txtObjSrc.value;
	
	var charCode = (eventObj.which) ? eventObj.which : event.keyCode;
	if(charCode == _TAB || charCode == _ETR) {
		var idVal = document.getElementById(txtIdDest).value;
		if(idVal == "")
			setTextValuesByIndex(0, txtIdDest, txtCodeSrc, txtNameDest, '', divName);
		return true;
	} else if(charCode == _ESC) {
		document.getElementById(txtIdDest).value = "";
		document.getElementById(txtCodeSrc).value = "";
		document.getElementById(txtNameDest).value = "";
		hideDivision(divName);
		return false;
	} else if((charCode != _BSPC && charCode != _DEL) && isNonFnKeyPress(charCode)) {
		return false;
	}
	document.getElementById(txtIdDest).value = "";
	if(isNOajaxAction(txtCodeSrc, txtNameDest, refreshInt)) {
		return false;
	}
	// set the given lookupId to submit in ajax action
	selectedIds = lookupId;// 
	if(path.indexOf("?") > 0) {
		path += "&";
	} else {
		path += "?";
	}
	path = path + "txtIDSrc=" +  txtIdDest
			+ "&txtCodeSrc=" + txtObjSrc.name
			+ "&txtNameSrc=" + txtNameDest
	;
	var vWIDTH = "200px", vHEIGHT = "30%";
	divPosition='absolute';
	if(respHandlerAjaxJS(txtIdDest, txtCodeSrc, txtNameDest, eventObj, divName)) {
		return false;
	}
	// submit ajax action to set the states list.
	ajaxCommonActionSubmit(path, divName, vWIDTH, vHEIGHT); 
}// end of commonAutoCompleteAction()

function populateTextMoreValues(indx, divName) {
	var txtIdDest = document.getElementById("txtIDSrc").value;
	var txtCodeSrc = document.getElementById("txtCodeSrc").value;
	var txtNameDest = document.getElementById("txtNameSrc").value;
	var otherNames = document.getElementById("otherNames").value;
	setTextValuesByIndex(indx, txtIdDest, txtCodeSrc, txtNameDest, otherNames, divName);
}
function setTextValuesByIndex(curIdx, txtIdDest, txtCodeSrc, txtNameDest, otherNames, divName) {
	var txtObjSrc = document.getElementById(txtCodeSrc);
	curIdx = getCurrentIndex(curIdx, divName);
	document.getElementById(txtIdDest).value = document.getElementById(("ajxId_" + curIdx)).value;
	if(txtNameDest != "") {
		document.getElementById(txtNameDest).value = document.getElementById(("ajxName_" + curIdx)).value;
	}
	txtObjSrc.value = document.getElementById(("ajxCode_" + curIdx)).value;
	if(otherNames.length > 0) {
		if(otherNames.indexOf(",") > 0) {
			otherNameArray = otherNames.split(",");
			otherValueArray = (document.getElementById(("ajxOthers_" + curIdx)).value).split(",");
			for(var j = 0; j < otherNameArray.length; j++) {
				if(document.getElementById(otherNameArray[j]) != null) {
					document.getElementById(otherNameArray[j]).value = otherValueArray[j];
				}
			}
		} else {
			if(document.getElementById(otherNames) != null) {
				document.getElementById(otherNames).value = document.getElementById(("ajxOthers_" + curIdx)).value;
			}
		}
	}
	hideDivision(divName);
}
function manyParamsAutoCompleteAction(path, txtIdDest, txtCodeSrc, txtNameDest, otherNames, eventObj, divName) {
	
	var txtObjSrc = document.getElementById(txtCodeSrc);
	var charCode = (eventObj.which) ? eventObj.which : event.keyCode;
	if(charCode == _TAB || charCode == _ETR) {
		var idVal = document.getElementById(txtIdDest).value;
		if(idVal == "")
			setTextValuesByIndex(0, txtIdDest, txtCodeSrc, txtNameDest, otherNames, divName);
		return false;
	} else if(charCode == _ESC) {
		document.getElementById(txtIdDest).value = "";
		document.getElementById(txtCodeSrc).value = "";
		document.getElementById(txtNameDest).value = "";
		hideDivision(divName);
		return false;
	} else if(isNonFnKeyPress(charCode)) {
		return false;
	}
	document.getElementById(txtIdDest).value = "";
	
	if(path.indexOf("?") > 0) {
		path += "&";
	} else {
		path += "?";
	}
	path = path + "txtIDSrc=" +  txtIdDest
			+ "&txtCodeSrc=" + txtObjSrc.name
			+ "&txtNameSrc=" + txtNameDest
			+ "&otherNames=" + otherNames
	;
	var vWIDTH = "960px", vHEIGHT = "30%";
	divPosition='absolute';
	// submit ajax action to set the states list.
	ajaxCommonActionSubmit(path, divName, vWIDTH, vHEIGHT); 
}// end of manyParamsAutoCompleteAction()
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSelectedRadio(buttonGroup) {
   // returns the array number of the selected radio button or -1 if no button is selected
   if (buttonGroup[0]) { // if the button group is an array (one button is not an array)
      for (var i=0; i<buttonGroup.length; i++) {
         if (buttonGroup[i].checked) {
            return i;
         }
      }
   } else {
      if (buttonGroup.checked) { return 0; } // if the one button is checked, return zero
   }
   // if we get to this point, no radio button is selected
   return -1;
} // Ends the "getSelectedRadio" function

function getSelectedRadioValue(buttonGroup) {
   // returns the value of the selected radio button or "" if no button is selected
   var i = getSelectedRadio(buttonGroup);
   if (i == -1) {
      return "";
   } else {
      if (buttonGroup[i]) { // Make sure the button group is an array (not just one button)
         return buttonGroup[i].value;
      } else { // The button group is just the one button, and it is checked
         return buttonGroup.value;
      }
   }
   return "";
} // Ends the "getSelectedRadioValue" function

function getBookingPlacesList(path, eventObj, divName, txtIdDest, txtCodeSrc, txtNameDest) {
	path = path + "&startPlaceId=" + document.getElementById("startPlaceId").value;
	commonAutoCompleteAction(path, txtIdDest, txtCodeSrc, txtNameDest, eventObj, divName);
}

function getAvailableServiceList(actType, searchType) {
	DIV_DEFAULT_WIDTH = "100%";
	var paramStr = "";
	
	paramStr = "?txtJourneyDate=" + document.getElementById("txtJourneyDate").value;
	var tatkalFlag=false;
	var isTatkalEnabled=document.getElementById("isTatkalEnabled").value;
	if(isTatkalEnabled=='true'){
		tatkalFlag =  document.getElementById("tatkalFlag").checked;
	}
	var singleLady = getSingleLady();
	
	showdiv("progressBarDiv");
	var divName = "ForwardAvailableServicesDiv";
	if(actType == '1') {
		path = "/return/booking/avail/services.do";
		// return journey parameters
		paramStr = paramStr 
					+ "&startPlaceId=" + document.getElementById("endPlaceId").value
					+ "&endPlaceId=" + document.getElementById("startPlaceId").value
					+ "&txtReturnJourneyDate=" + document.getElementById("txtReturnJourneyDate").value
					+ "&ajaxAction=ret"
					+ "&singleLady=" + singleLady
				;
		divName = "ReturnAvailableServicesDiv";
	} else {
		// forward journey parameters
		path = "/forward/booking/avail/services.do";
		paramStr = paramStr
				+ "&startPlaceId=" + document.getElementById("startPlaceId").value
				+ "&endPlaceId=" + document.getElementById("endPlaceId").value
				+ "&ajaxAction=fw"
				+ "&singleLady=" + singleLady
				;
	}
	path = path + paramStr + "&qryType=" + searchType + "&tatkalFlag=" + tatkalFlag;
	
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function getBookingSearchType() {
	var searchType = "";
	if(document.getElementById("searchType") != null) {
		searchType = document.getElementById("searchType").value;
	} else if(document.getElementById("searchType_1").checked == true) {
		searchType = document.getElementById("searchType_1").value;
	} else if(document.getElementById("searchType_2").checked == true) {
		searchType = document.getElementById("searchType_2").value;
	} else if(document.getElementById("searchType_3") != null) {
		searchType = document.getElementById("searchType_3").value;
	}
	return searchType;
}

function ajaxShowBoardingPoints(srid, sid, scId, rtPid, act, idx, departureTime, arrivalTime, arrivalDay, startTime) {
	var path, divName, dt, startId, endId,tatkalFlag;
	if(act == "Return") {
		divName = "ReturnBoardPtsDiv";
		dt = document.getElementById("txtReturnJourneyDate").value;
		var ondt = document.getElementById("txtJourneyDate").value;
		path = "/ajax/return/layout/boardPoints.do?ajaxAction=rt&txtReturnJourneyDate=" + dt + "&txtJourneyDate=" + ondt;
		startId = document.getElementById("endPlaceId").value;
		endId = document.getElementById("startPlaceId").value;
	} else {
		startId = document.getElementById("startPlaceId").value;
		endId = document.getElementById("endPlaceId").value;
		divName = "ForwardBoardPtsDiv";
		dt = document.getElementById("txtJourneyDate").value;
		var isTatkalEnabled=document.getElementById("isTatkalEnabled").value;
		if(isTatkalEnabled=='true'){
			if(document.getElementById("tatkalFlag") != null)
				tatkalFlag = document.getElementById("tatkalFlag").checked;
		}
		path = "/ajax/forward/layout/boardPoints.do?ajaxAction=fw&txtJourneyDate=" + dt;
	}
	document.getElementById(act + "ServiceId").value = sid;
	document.getElementById("srvcRtId" + act).value = srid;
	document.getElementById("categoryId" + act).value = scId;
	
	path = path + "&serviceId=" + sid 
					+ "&startPlaceId=" + startId  
					+ "&routeCode=" + srid 
					+ "&endPlaceId=" + endId 
					+ "&serviceCategoryId=" + scId
					+ "&rtDepartuteTime=" + departureTime 
					+ "&fwArrivalTime=" + arrivalTime
					+ "&arrivalDay=" + arrivalDay
					+ "&tatkalFlag=" + tatkalFlag
					+ "&serviceOriginStartDate=" +startTime
					;
	
	var remName = document.getElementById(act).value;
	removeDiv(remName, divName);
	var divTag = createDiv(divName);
    document.getElementById(("Layout" + act + idx)).appendChild(divTag);
    document.getElementById(act).value = ("Layout" + act + idx);
    showdiv("progressBarDiv");
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);	
}

function displayLayoutDiv(actName) {
	var ajaxAction = "fw";
	var path = "/ajax/forward/layout/view.do?ajaxAction=" + ajaxAction;
	var journeyDate = document.getElementById("txtJourneyDate").value;
	var adultMale = 0, adultFemale = 0, childMale = 0, childFemale = 0;
	var stockNo = "", concessionId = "", srvcTypeCatgId = "";
	var divName = "ShowLayoutDiv";
	
	var slady = getSingleLady();
	var sid = document.getElementById(actName + "ServiceId").value;
	var srid = document.getElementById("srvcRtId" + actName).value;
	var boardId = "", dropId = "",linkType="Start";
	var t, searchType, tatkalFlag;
	var isLinkTicket = 0, linkPlaceId = 0, linkStartPlaceId = 0, linkEndPlaceId = 0, linkEvalEndJourneyDate="";;
	
	if(document.getElementById("isLinkTicket") != null)
		isLinkTicket = document.getElementById("isLinkTicket").value;
	
	if(isLinkTicket && isLinkTicket =="1")
		document.getElementById("txtReturnJourneyDate").value = document.getElementById("txtJourneyDate").value
	
	if(isLinkTicket =="1" && document.getElementById("linkEvalEndJourneyDate"))
		document.getElementById("txtReturnJourneyDate").value = document.getElementById("linkEvalEndJourneyDate").value;	
		
	if(document.getElementById("txtReturnJourneyDate") != null)
		t = document.getElementById("txtReturnJourneyDate").value;
	
	if(t =! null && t != "" && t != "Return On (Optional)" && validateDate(t)) {
		searchType = '1';
	} else {
		searchType = "0";
	}
	var ForwardBoardId = "", ForwardDroppingId = "", ReturnBoardId = "", ReturnDroppingId = "";
	if(actName == 'Forward'){
		if(document.getElementById("ForwardBoardId") != null && document.getElementById("ForwardBoardId").value != ''){
			ForwardBoardId = document.getElementById("ForwardBoardId").value ;
		} else {
			alert("Please select boarding place.");
			return false;
		}
		if(document.getElementById("ForwardDroppingId") != null && document.getElementById("ForwardDroppingId").value != ''){
			ForwardDroppingId = document.getElementById("ForwardDroppingId").value ;		
		} else {
			alert("Please select droping place.");
			return false;
		}		
	} else{
		if(document.getElementById("ReturnBoardId") != null && document.getElementById("ReturnBoardId").value != ''){
			ReturnBoardId = document.getElementById("ReturnBoardId").value ;
		} else {
			alert("Please select boarding place.");
			return false;
		}
		if(document.getElementById("ReturnDroppingId") != null && document.getElementById("ReturnDroppingId").value != ''){
			ReturnDroppingId = document.getElementById("ReturnDroppingId").value ;		
		} else {
			alert("Please select droping place.");
			return false;
		}
		
	}
	
	if(document.getElementById("linkType") != null)
		linkType = document.getElementById("linkType").value;

	if(actName == "Return") {
		if(document.getElementById("linkPlaceId") != null)
			linkPlaceId = document.getElementById("linkPlaceId").value;
		
		if(document.getElementById("startPlaceId") != null)
			linkStartPlaceId = document.getElementById("startPlaceId").value;
		
		if(document.getElementById("endPlaceId") != null)
			linkEndPlaceId = document.getElementById("endPlaceId").value;
		
		if(isLinkTicket ==="1") {
			boardId = document.getElementById(actName + "BoardId").value;
			dropId = document.getElementById(actName + "DroppingId").value;
		}else {
			boardId = document.getElementById("endPlaceId").value;
			dropId = document.getElementById("startPlaceId").value;
		}
		
		path = "/ajax/return/layout/view.do?ajaxAction=rt"
				+ "&startPlaceId=" + boardId
				+ "&endPlaceId=" + dropId
				+ "&retBoardId=" + ReturnBoardId
				+ "&retDroppingId=" + ReturnDroppingId
				+ "&isLinkTicket=" + isLinkTicket
				+ "&linkPlaceId=" + linkPlaceId
				+ "&linkStartPlaceId=" + linkStartPlaceId
				+ "&linkEndPlaceId=" + linkEndPlaceId
				;
    	divName = "ShowReturnLayoutDiv";
    	journeyDate = document.getElementById("txtReturnJourneyDate").value;
    } else {
    	if(document.getElementById("linkPlaceId") != null)
			linkPlaceId = document.getElementById("linkPlaceId").value;
		
		if(document.getElementById("startPlaceId") != null)
			linkStartPlaceId = document.getElementById("startPlaceId").value;
		
		if(document.getElementById("endPlaceId") != null)
			linkEndPlaceId = document.getElementById("endPlaceId").value;

		if(isLinkTicket ==="1") {
			boardId = document.getElementById(actName + "BoardId").value;
			dropId = document.getElementById(actName + "DroppingId").value;
		}else {
			boardId = document.getElementById("startPlaceId").value;
			dropId = document.getElementById("endPlaceId").value;
		}
		
		if(document.getElementById("linkEvalEndJourneyDate") != null)
			linkEvalEndJourneyDate = document.getElementById("linkEvalEndJourneyDate").value;
		
		path = path + "&endPlaceId=" + dropId
					+ "&startPlaceId=" + boardId
					+ "&onwardBoardId=" + ForwardBoardId
					+ "&onwardDroppingId=" + ForwardDroppingId
					+ "&isLinkTicket=" + isLinkTicket
					+ "&linkPlaceId=" + linkPlaceId
					+ "&linkStartPlaceId=" + linkStartPlaceId
					+ "&linkEndPlaceId=" + linkEndPlaceId
					+ "&linkEvalEndJourneyDate=" + linkEvalEndJourneyDate
					;
	}
	var retJourneyDate = "";
	if(document.getElementById("txtReturnJourneyDate") != null)
		retJourneyDate = document.getElementById("txtReturnJourneyDate").value;
	if(retJourneyDate == null || retJourneyDate == "" || retJourneyDate == "Return On (Optional)") {
		retJourneyDate = "";
	}
	if(document.getElementById("concessionId") != null)
		concessionId = document.getElementById("concessionId").value;
		
	if(document.getElementById("serviceCategoryId") != null)
		srvcTypeCatgId = document.getElementById("serviceCategoryId").value;
	
	if(boardId == null || boardId == "") {
		alert("Please select boarding point to continue.");
		return false;
	}
	if(dropId == null || dropId == "") {
		alert("Please select dropping point to continue.");
		return false;
	}
	if(concessionId == null || concessionId == "") {
		alert("Please select a concession to continue.");
		return false;
	}
	var isTatkalEnabled=document.getElementById("isTatkalEnabled").value;
	if(isTatkalEnabled=='true'){
		if(document.getElementById("tatkalFlag") != null)
			tatkalFlag = document.getElementById("tatkalFlag").checked;
	}
	showdiv("progressBarDiv");
	
    path = path + "&searchType=" + searchType
			+ "&concessionId=" + concessionId
    		+ "&serviceCategoryId=" + document.getElementById("categoryId" + actName).value
    		+ "&serviceId=" + document.getElementById(actName + "ServiceId").value
    		+ "&txtJourneyDate=" + journeyDate
    		+ "&txtReturnJourneyDate=" + retJourneyDate
    		+ "&srvcTypeCatgId=" + srvcTypeCatgId
			+ "&singleLady=" + slady
			+ "&tatkalFlag=" + tatkalFlag
			+ "&linkType=" + linkType
    ;
    ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}
function showCancellServices() {
	var path = '/ajax/cancel/services/load.do?txtJourneyDate='
		+ document.getElementById('txtJourneyDate').value; 
	var divName = 'CancelledServiceDivId';
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function showCancellTicketsPage(val, mob, pfx,  uid) {
	var path = '/ajax/cancel/details/load.do'; 
	var divName = 'BookedTicketsDivId';
	if(document.getElementById("id") != null) {
		document.getElementById("id").value = val;
	}
	if(document.getElementById("pnrPrefixWithTktNo") != null) {
		document.getElementById("pnrPrefixWithTktNo").value = pfx + val;
	}
	path = path + "?searchType=0"
				+ "&id=" + val
				+ "&mobileNo=" + mob
				+ "&pnrPrefixWithTktNo=" + pfx + val
				+ "&uidNumber=" + uid
	;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}
function showTicketDetailsPage(divName) {
	var txtJourneyDate = "";
	if(document.getElementById("txtJourneyDate") != null)
		txtJourneyDate = document.getElementById("txtJourneyDate").value;
	var path = "/ajax/ticket/alter/load.do?searchType=0&id=" + document.getElementById("id").value
		+ "&stockKey=" + document.getElementById("stockKey").value
		+ "&stockNumber=" + document.getElementById("stockNumber").value
		+ "&txtJourneyDate=" + txtJourneyDate
	;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function getRefundDetails(divName) {
	var i=0; 
	var obj, mPrice = "", qty = "";
	while(true) {
		obj = document.getElementById("mPrice"+i);
		if(obj == null) break;
		if(i > 0) {mPrice += ","; qty += ",";}
		mPrice += obj.value;
		qty += document.getElementById("mQty"+i).value;
		i++;
	}
	i=0;
	var ob, seats = "";
	while(true) {
		ob = document.getElementById("seatNos" + i);
		if(ob == null) break;
		else if(ob.checked == true) {
			if(seats.length > 0) seats += ",";
			seats += ob.value;
		}
		i++;
	}
	if(seats.length == 0) {
		alert("Atleast one seat must be selected for partial cancellation.");
		/*seats = document.getElementById("seatNos0").value;
		document.getElementById("seatNos0").checked = true;*/
		return false;
	} 
	document.getElementById("seatNosForward").value = seats;
	
	var uid = "";
	if(document.getElementById("uidNumber") != null) {
		uid = document.getElementById("uidNumber").value ;
	}
	var mobile = "";
	if(document.getElementById("mobileNo") != null) {
		mobile = document.getElementById("mobileNo").value ;
	}
	var path = "/ticket/cancel/refund/calc.do?searchType=1"
		+ "&id=" + document.getElementById("id").value
		+ "&pnrPrefixWithTktNo=" + document.getElementById("pnrPrefixWithTktNo").value
		+ "&seats=" + seats
		+ "&mPricLs=" + mPrice
		+ "&mSelQty=" + qty
		+ "&showLayout=false"
		+ "&uidNumber=" + uid
		+ "&mobileNo=" + mobile
	;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	showdiv(divName);
}
function showStaffDetailDiv(counterId) {
	var roleId = document.getElementById("roleId").value;
	var path = '/ajax/booking/counters/load.do?blockedType=1';
	if(roleId == 1002) {
		path = path + "&roleId=" + roleId 
				    + "&counterId=" + counterId;
		// enable this code when counter's is in use
		// submitAjaxAction(path, 'CountersDivId');
		showdiv("agentDetailsDivId");
	} else {
		hidediv("agentDetailsDivId");
	}
}
function validateFields(srcName, path, divId) {
	var srcObj = document.getElementById(srcName);
	if(path.indexOf("?") > 0) {
		path += "&";
	} else {
		path += "?";
	}
	path = path + srcName + "=" + srcObj.value;
	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

/* ************************** JQUERY Realted calls ************************** */
   /**
    * This function is used to take the divisiotn width, height as parameter along
    * with the path, division name. This function can be used for all types of ajax
    * action with six parameters, (can be extended in future if required).
    */
function ajaxCommonActionSubmit(path, divName, divWidth, vHeight) {
   	divPosition = 'relative';
   	//showLoadingTxt(vHeight, divWidth, divName);   	
   	
   	// get context path
   	var contextPath = document.getElementById("contextPath").value;
   	var rNum = new Date().getTime() + Math.floor((Math.random()*100)+1);
   	// form the exact url to be performed
   	var realPath =  contextPath + path + "&X=" + rNum;
   	var actionType = document.getElementById("ajaxAction").value;   	
   	
   	$.ajax({
        url: realPath,
        type: "POST",
        cache: false,
        data: ({parameter1: rNum, 
				parameter2: parameter2,
				actionType: actionType
				}),
        dataType: "html",        
        success: function(data) {
				$('#'+divName).html(data);        		
				ga('send', 'pageview', realPath.substr(0,realPath.indexOf("?")));
				processCommonAjaxResponse(data, divName, divWidth, vHeight);				
			}
   	});

}

function validateObreferanceNo(bankRefNo) {
	var divName = "ShowTranxDetails";
	var path ="/tickets/status/obreference.do?isTranxSuccess=0"
				+ "&bankRefNo=" + bankRefNo;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function ajaxFavoritesAjaxAction(path, divName) {
	var	divWidth = "100%";
	var vHeight = "30%";
	if(document.getElementById('checkFavorites').checked == true){
		ajaxCommonActionSubmit(path, divName, divWidth, vHeight);
	}

}// end of ajaxFavoritesAjaxAction(?, ?);

function checkGuestLoging(path, divName){
	showdiv("GuestLoginRespDivID");
	//showdiv("GuestDivID");
	//hidediv("GuestLoginDivID");
	/*document.getElementById("guestLogin_1").checked = true;
	document.getElementById("guestLogin_2").checked = false;*/
	var userName, password;
	if(document.getElementById("userName") != null){
		userName = document.getElementById("userName").value;
	} else {
		alert("Please ente user name..");
		return false;
	}
	if(document.getElementById("password") != null){
		password = document.getElementById("password").value;
	} else {
		alert("Please ente user name..");
		return false;
	}
	if(document.getElementById("TermsConditions") != null
			&& document.getElementById("TermsConditions").checked == false) {
		alert("Please check Terms & Conditions");
		return false;
	}
	path = path + "?userName=" + userName
				+ "&password=" + password;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

/* This helps to change the pax count based on the accomdation selection 
 * 
 *  If single selected then pax count will be 1,2,3,4,5,6
 *  If Twin selected then pax count will be 2,4,6
 *  If Triple selected then pax count will be 3,6
 *  
 * */

function changePaxCount() {
	var accomType = document.getElementById("accomType");
	var paxCount = document.getElementById("paxCount");
	var accomOptions = {
		"1" : [ "1", "2", "3", "4", "5", "6" ],
		"2" : [ "2", "4", "6" ],
		"3" : [ "3", "6" ]
	};
	try {
		// clear out paxCount for every request
		paxCount.length = 0;
		// get the selected value from accomType
		var _val = accomType.options[accomType.selectedIndex].value;
		// loop through accomOptions at the selected value
		for ( var i in accomOptions[_val]) {
			// create option tag
			var op = document.createElement('option');
			// set its value
			op.value = accomOptions[_val][i];
			// set the display label
			op.text = accomOptions[_val][i];
			// append it to paxCount
			paxCount.appendChild(op);
		}
	} catch (e) {
		console.log("error in changePaxCount " + e);
	}

}



function resetDateTxt(o, v, dateList) {
	try{
		if(o != null) {
			o.value = v;
		}
	    var array = new Array();
	    array = dateList.split(',',dateList.length);

	    for (var i = 0; i < array.length; i++) {
	    	array[i] = array[i].replace(/"/g, "");
	    }
	    
	    $('#selectedDate').datepicker(
	    	{	numberOfMonths: 1
				, dateFormat: 'dd/mm/yy'
				, minDate: '0'
				, maxDate: "+90d"
				, beforeShowDay: function(date){
		        var string = jQuery.datepicker.formatDate('dd-mm-yy', date);
		        for(var i=0; i< array.length; i++){
		        	 if ($.inArray(string, array) != -1 ) {
			        	 return [true];
			        } else{
			        	return [false];
			        }
		        }
		    }
	    	}).val();
	    $('#selectedDate').datepicker("show");
	}catch(e){
		console.log("Error in resetDateTxt "+e);
	}
}



// This method will get the busInformation for the selected package in the selected city

function retrieveBusInfo(formObj){
	try{
		var selectedDate = ""
		
		if(document.getElementById("selectedDate") && document.getElementById("selectedDate") != null){
			selectedDate = document.getElementById("selectedDate").value;
		}

		if(selectedDate == "" || selectedDate == "Journey Date"){
			alert("Please select Journey Date to proceed");
			return false;
		}else{
			 showdiv("progressBarDiv");
			 formObj.submit();		
		}
				
	}catch(e){
		console.log("Error in retrieveBusInfo "+e);
	}
}

function getBusLayout(path, busId, selectedDate, time, routeCode, busTypeDesc, totalSeats,  totalFare, availableSeats, accomAvailable, formObj){
	try{

		if(availableSeats == 0){
			alert("Seats are full for this service. Please retry by selecting another date.");
			return false;
		}
		
		var accomType = "", paxCount = "", variantId = "", fromPlace = "", companyInfo="";
		if(document.getElementById("companyInfo") && document.getElementById("companyInfo") != null){
			companyInfo = document.getElementById("companyInfo").value; 
		}
		if(document.getElementById("fromPlace") && document.getElementById("fromPlace") != null){
			fromPlace = document.getElementById("fromPlace").value; 
		}
		if(document.getElementById("variantId") && document.getElementById("variantId") != null){
			if(document.getElementById("variantId").value == "114")
				variantId = "Budget";
		}
		
		if(document.getElementById("accomType") && document.getElementById("accomType") != null){
			accomType = document.getElementById("accomType").value; 
		}
		if(document.getElementById("paxCount") && document.getElementById("paxCount") != null){
			paxCount = document.getElementById("paxCount").value; 
		}
		
		if(document.getElementById("tourDescription") && document.getElementById("tourDescription") != null){
			ctDescription = document.getElementById("tourDescription").value;
		}
		
		if(parseInt(paxCount) > availableSeats){
			alert("You are trying to book seat(s) more than the available seats.")
			return false;
		}
		
		showdiv("progressBarDiv");
		path = path+"?busId="+busId
							 +"&selectedDate="+selectedDate
							 +"&companyInfo="+companyInfo
							 +"&fromPlace="+fromPlace
							 +"&variantId="+variantId
							 +"&accomType="+accomType
							 +"&paxCount="+paxCount
							 +"&time="+time
							 +"&routeCode="+routeCode
							 +"&busDescription="+busTypeDesc + "(" +totalSeats+ " Seater)"
							 +"&tourDescription="+ctDescription
							 +"&totalFare="+(totalFare)
							 +"&accomAvaliable="+accomAvailable
							 +"&seatSelected=false";
		
		formObj.action = path;
		formObj.submit();
	}catch(e){
		console.log("error in getBusLayout "+e);
	}
}


function sendSelectedSeats(numOfSeats, index, seatNumber){
	try{
		var tdId = document.getElementById("seat_"+index);
		var tIdx = parseInt(document.getElementById("curSeatIndx").value);
		var selSeats = document.getElementById("selectedSeats");
		if (tIdx < 0) {
			tIdx = 0;
		}
		if(tIdx >= numOfSeats && tdId.className == "availSeatClassS"){
			alert("Maximum " + numOfSeats + " seat(s) allowed to book.");
			return false;
		}
		
		if(tdId != null) {
			if(tdId.className == ("selectedSeatClassS")) {
				tdId.className = "availSeatClassS";
				tIdx = tIdx - 1;
				var vb = false;
				for(var sIdx = 0; sIdx < tIdx; sIdx++) {
					if(document.getElementById(("passSeatDetails" + sIdx)).value == seatNumber) {
						vb = true;	
					}
					if(vb && document.getElementById(("passSeatDetails" +  (sIdx+1)))) {
						document.getElementById(("passSeatDetails" +  sIdx)).value = document.getElementById(("passSeatDetails" +  (sIdx+1))).value;
						document.getElementById(("categoryId" +  sIdx)).value = document.getElementById(("categoryId" +  (sIdx+1))).value;
						document.getElementById(("genderId" +  sIdx)).value = document.getElementById(("genderId" +  (sIdx+1))).value;
						document.getElementById(("passName" +  sIdx)).value = document.getElementById(("passName" +  (sIdx+1))).value;
						document.getElementById(("passAge" +  sIdx)).value = document.getElementById(("passAge" +  (sIdx+1))).value;
					}
				}
				document.getElementById(("passSeatDetails" +  tIdx)).value = "";
				document.getElementById(("genderId" +  tIdx)).value = "";
				document.getElementById(("passName" +  tIdx)).value = "";
				document.getElementById(("passAge" +  tIdx)).value = "";
				removePassengerTd(tIdx, "paxtbldetails");
			}else{
				tdId.className = "selectedSeatClassS";
				addPassengerTd(tIdx, "paxtbldetails");
				document.getElementById(("passSeatDetails" + tIdx)).value = seatNumber;
				tIdx = tIdx + 1;
			}
		}
		document.getElementById("curSeatIndx").value = tIdx;
	}catch(e){
		console.log("Error in sendSelectedSeats  "+e);
	}
}

function removePassengerTd(idx, divId) {
	try{
		$('#'+  idx + "tr" ).detach();
	}catch(e){
		console.log("Error in removePassengerTd "+ e);
	}
	
}

function addPassengerTd( idx, divId) {
	try{
	var _rEle;
	var ADULT_ID = 16;
	var nStr = idx ;
	_rEle = '<tr id="' + nStr + "tr" + '"><td width="24%">' 
				+ '<input type="hidden" name="categoryId" id="categoryId' + nStr + '" value="'+ ADULT_ID +'" />'
				+ '<select name="genderId" id="genderId' + nStr + '" class="requiredfield">'
				+ '<option value="">Select One</option>'
				+ '<option value="24">MALE</option>'
				+ '<option value="25">FEMALE</option>'
				+ '</select>'
			+ '</td><td>'
				+ '<input type="text" style="width:90%" name="passName" id="passName' + nStr + '" maxlength="150" size="16" class="requiredfield" onkeyup="validatePassName(this, this.name);">'
			+ '</td>'
			+ '<td style="width:10%">'
				+ '<input type="text" style="width:50%" name="passAge" id="passAge' + nStr + '" maxlength="2" size="2" class="requiredfield">'
			+ '</td>'
			+ '<td style="width:10%">'
				+ '<input type="text" style="width:50%" name="passSeatDetails" id="passSeatDetails' + nStr + '" size="1" class="seatNormalField" readonly="readonly">'
			+ '</td>'
			+ '</tr>'
		;
		
	$('#'+divId+' tr:last').after(_rEle);
	}catch(e){
		console.log("Error in addPassenger "+e);
	}
}

function validatePassAge(tObj){
	try{
		if(!isNumber(tObj)) {
			return false;
		}
		if(tObj.value == 0 || tObj.value < 0){
			alert("age should not be zero or negative. Please enter valid value");
			return false;
		}
		if(tObj.value <=5 ){
			if( confirm('No ticket is required for child below 6 years.\nPlease click on "OK" to continue') != true ){			
				tObj.value="";
				return false
			}
		}
		return true;
	}catch(e){
		console.log("Error in validatePassAge "+e);
	}
}

function validatePassName(txtObj, fieldName) {
	if(txtObj.value == "" || validAlphabet(txtObj.value) ) {
		return true;
	} else {
		alert("Please enter valid " + fieldName);
		txtObj.value = "";
		txtObj.focus();
		return false;
	}
}


function blockSelectedSeats(path, companyInfo, fromPlace, selectedDate, time,
		variantId, paxCount, accomType, busTypeDesc, routeCode,
		totalFare, frmObj) {
	try {
		
		if(!validateSeatSelection()){
			return false;
		}
		
		if(document.getElementById("curSeatIndx").value != paxCount){
			alert("Seems to that you are selected only "+ document.getElementById("curSeatIndx").value + " seat. Please select "+paxCount + " seats to proceed further.");
			return false;
		}
		
		
		showdiv("progressBarDiv");
		var busId = "", pickupId = "",pickupName = "",tourDescription="";

		if (document.getElementById("busId")
				&& document.getElementById("busId") != null) {
			busId = document.getElementById("busId").value;
		}
		
		// pickup points ...
		
		if(document.getElementById("pickupPointId") && document.getElementById("pickupPointId") != null){
			pickupId = document.getElementById("pickupPointId").value;
			pickupName = document.getElementById("pickupPointId").options[document.getElementById("pickupPointId").selectedIndex].text;
		}
		
		if(document.getElementById("tourDescription") && document.getElementById("tourDescription") != null){
			tourDescription = document.getElementById("tourDescription").value;
		}
		
		var mobileNum = document.getElementById("mobileNum").value;
		var email = document.getElementById("email").value;
		
		
		path = path + "?busId=" + busId + "&selectedDate="
				+ selectedDate + "&companyInfo=" + companyInfo + "&fromPlace="
				+ fromPlace + "&variantId=" + variantId + "&accomType="
				+ accomType + "&paxCount=" + paxCount + "&time=" + time
				+ "&routeCode=" + routeCode + "&busDescription=" + busTypeDesc
				+ "&tourDescription=" + tourDescription + "&totalFare="
				+ totalFare + "&pickupPointId="+ pickupId + "&pickupPointName="+ pickupName
				+ "&mobileNum="+ mobileNum + "&email="+ email + "&seatSelected=true";
		frmObj.action = path;
		frmObj.submit();
	} catch (e) {
		console.log("Error in blockSelectedSeats " + e);
	}
}

function validateSeatSelection() {
	try {

		var txtObj = document.getElementById("mobileNum");
		var val = "";
		var msg = "";

		if (!validateMobileNo(txtObj)) {
			return false;
		}

		txtObj = document.getElementById("email");
		if (txtObj != null && txtObj.value == "") {
			alert("Please enter valid email address.");
			txtObj.focus();
			return false;
		}

		var size = 10;
		// set seat details and calculate total price details
		var ageObj, seatObj, nm, ad, genderObj;
		ad = false;
		var pax = 0;
		for ( var i = 0; i < size; i++) {
			nm = document.getElementById(("passName" + i));
			ageObj = document.getElementById(("passAge" + i));
			seatObj = document.getElementById(("passSeatDetails" + i));
			genderObj = document.getElementById(("genderId" + i));

			if (seatObj == null) {
				continue;
			}

			if (genderObj != null && genderObj.value != '24'
					&& genderObj.value != '25') {
				alert("Please select gender.");
				genderObj.focus();
				return false;
			}
			if (document.getElementById(("categoryId" + i)).value == ADULT_ID) {
				ad = true;
			}
			if (seatObj.value == "") {
				alert("Please select " + size + " number of seat(s).");
				ageObj.focus();
				return false;
			} else if (ageObj.value == "") {
				alert("Please enter passenger age.");
				ageObj.focus();
				return false;
			} else if (nm.value == ""){
				alert("Please enter valid passenger name.");
				nm.focus();
				return false;
			} else if(nm.value.indexOf(",") != -1){
				alert("Please enter passenger name with out commas.");
				nm.focus();
				return false;
			}
			if(!validatePassAge(ageObj)){
				return false;
			}
			++pax;
		}
		document.getElementById("curSeatIndx").value = pax;
		if (ad == false) {
			alert("Atleast one adult passenger is required to continue.");
			return false;
		}
		return true;
	} catch (e) {
		console.log("Error in validateSeatSelection " + e);
	}
}


function pkgToursSubmitAction(path, frmObj){
	try{
		var pgId = "", id = "";
		if(document.getElementById("pgId") && document.getElementById("pgId") != null){
			pgId = document.getElementById("pgId").value;
		}
		if(document.getElementById("tempBookingId") && document.getElementById("tempBookingId") != null){
			id = document.getElementById("tempBookingId").value;
		}
		if(pgId == ""){
			alert("Please select payment gateway to continue.");
			return false;
		}
		
		path = path + "?pgId="+pgId +"&id="+id +"&packageTours=true";
		frmObj.action = path;
		frmObj.submit();
		
	}catch(e){
		console.log("Error in pkgToursSubmitAction "+ e);
	}
}

/**
 *   The Following are the new methods related to KSTDC Package Tour Changes 
 */

function getElementsList(id,loadId,path){
	try{
		//showdiv(divName);
		path = path + "?"+id+"="+$("#"+id).val();
		jsonAjaxCommonActionSubmit(path,loadId);

		
	}catch(e){
		console.log("Error in getElementsList "+e);
	}
}

function autocompleteJSON(ele_code,ele_value,json_data,loadId,path) {

	$("#"+ele_value).autocomplete({	
        source: function(request, response){	
		$("#"+ele_value).keydown(function(event) {
			if (event.keyCode == _ESC) {
				$("#"+ele_code).val("");
				$("#"+ele_value).val("")
				$('#errnopack').hide();
				$('#accomType').empty();
				$('#packageName').val("");
				$('#tripRouteId').val("");
				$('#paxCount').empty();
				$('#selectedDate').val("");
				$('#selectedDate').prop( "disabled", true );
    		 return ;
			}
		});
				var regex = $.ui.autocomplete.escapeRegex(request.term);  
				if(regex == "\\ "){
					response( json_data );}
				else{
					var matcher = new RegExp("^" +regex, "i");
					response( $.grep( json_data, function( value ) {
						return  matcher.test(value.value);
					}));
				}
    		},
    	minLength: 0,
    	autoFocus: true,
    	focus: function(event, ui) { return true; },
   	    select: function (event, ui) { 
    			 event.preventDefault();
    			 $("#"+ele_code).val( ui.item.id);
    			 if(ui.item.value != undefined ){$("#"+ele_value).val( ui.item.value );} 
    			 if(path != undefined && path != null && path.trim() != ""){
    				 getElementsList(ele_code,loadId,path)
    			 }			
    		}
		}).bind('focus', function(){ $(this).autocomplete("search"); } );
	}

function jsonAjaxCommonActionSubmit(path,loadId) {

   	var contextPath = document.getElementById("contextPath").value;
   	var rNum = new Date().getTime() + Math.floor((Math.random()*100)+1);
   	// form the exact url to be performed   	
   	var realPath =  contextPath + path + "&X=" + rNum;
   	var actionType = document.getElementById("ajaxAction").value;   
   	$.ajax({
        url: realPath,
        type: "POST",
        cache: false,
        data: ({parameter1: rNum, 
				parameter2: parameter2,
				actionType: actionType			
				}),
        dataType: "html",        
        success: function(data) {
   				ga('send', 'pageview', realPath.substr(0,realPath.indexOf("?")));
   				loadTourData(data,loadId);
		
			}
   	});
}

function loadTourData(data,loadId){
	
	if(loadId == 'packageName'){
		var pos = data.lastIndexOf(',');
		data = data.substring(0,pos)+ data.substring(pos+1)
		var json = JSON.parse(data);  	
		$('#accomType').empty();
		$('#packageName').val("");
		$('#tripRouteId').val("");
		$('#paxCount').empty();
		$('#selectedDate').val("");
		$('#selectedDate').prop( "disabled", true );
		if(json.length == 0){
		$('#errnopack').show();
		}else{
			$('#errnopack').hide();
		}
		autocompleteJSON("tripRouteId",loadId,json,'loadProp','/ajax/pkg/tours/load/props.do');	

	}else{
		document.getElementById(loadId).innerHTML=data;
	}
}

function getTourRefundDetails(divName) {
	try {
		var i = 0;
		var ob, seats = "";

		var accomtype = document.getElementById('accomType').value;
		while (true) {
			ob = document.getElementById("seatNos" + i);
			if (ob == null)
				break;
			else if (ob.checked == true) {
				if (seats.length > 0)
					seats += ",";
				seats += ob.value;
			}
			i++;
		}
		if(seats.length == 0){
			alert("Please select seat to proceed.");
			return false;
		}
		var path = "/pkg/tours/load/refundDetails.do?" + "&bookingId="
				+ document.getElementById("pnrNo").value + "&seats="
				+ seats;
		showdiv("progressBarDiv");
		ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH,
				DIV_DEFAULT_HEIGHT);
		showdiv(divName);
	} catch (e) {
		console.log("getTourRefundDetails " + e);
	}
}

function transferWalletMoney(path, divId){
	var mobileNo = '', email = '', walletTranserAmount = '', description  = '';
	var obj = document.getElementById("mobileNo");
	if(obj != null && obj.value != ""){
		mobileNo = obj.value;
		
	}
	obj = document.getElementById("email");
	if(obj != null && obj.value != ""){
		email = obj.value;
		
	}
	obj = document.getElementById("walletTranserAmount");
	if(obj != null && obj.value != ""){
		walletTranserAmount = obj.value;
		if(!isValidNumber(obj)) {
			return false;
		}
	}
	path = path + "?mobileNo=" + mobileNo
				+ "&email=" + email
				+ "&walletTranserAmount=" + walletTranserAmount;
	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function validateTransferOTP(divName){
	
	var path = "/ajax/wallet/transfer/generateOTP.do?otpType=2";
	ajaxCommonActionSubmit(path, divName);
}

function pgwAmountAddToWallet(path, divId){
	
	var i=0; 
	var obj, mPrice = "", qty = "";
	while(true) {
		obj = document.getElementById("mPrice"+i);
		if(obj == null) break;
		if(i > 0) {mPrice += ","; qty += ",";}
		mPrice += obj.value;
		qty += document.getElementById("mQty"+i).value;
		i++;
	}
	i=0;
	var ob, seats = "";
	while(true) {
		ob = document.getElementById("seatNos" + i);
		if(ob == null) break;
		else if(ob.checked == true) {
			if(seats.length > 0) seats += ",";
			seats += ob.value;
		}
		i++;
	}
	if(seats.length == 0 && document.getElementById("seatNos0") != null) {
		seats = document.getElementById("seatNos0").value;
		document.getElementById("seatNos0").checked = true;
	} 
	document.getElementById("seatNosForward").value = seats;
	
	var uid = "";
	if(document.getElementById("uidNumber") != null) {
		uid = document.getElementById("uidNumber").value ;
	}
	var mobile = "";
	if(document.getElementById("mobileNo") != null) {
		mobile = document.getElementById("mobileNo").value ;
	}
	var walletRefundAmount = 0,pgwRefundAmount = 0, refundTotalAmount = 0;
	if(document.getElementById("checkPgwRefundToWallet").checked){
		checkPgwRefundToWallet = 1;
	} else {
		checkPgwRefundToWallet = 0;
	}
	path = path + "?searchType=1"
			+ "&id=" + document.getElementById("id").value
			+ "&pnrPrefixWithTktNo=" + document.getElementById("pnrPrefixWithTktNo").value
			+ "&seats=" + seats
			+ "&mPricLs=" + mPrice
			+ "&mSelQty=" + qty
			+ "&showLayout=false"
			+ "&uidNumber=" + uid
			+ "&mobileNo=" + mobile
			+ "&checkPgwRefundToWallet=" + checkPgwRefundToWallet;
	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function valiadateWalletDiv(path, divId){
	showdiv("progressBarDiv");
	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	var element = document.getElementById("MyTrxnDIVID");
	element.style.display = 'block';
}

function cashbackValidation(path,divId){
	var onwardTotalFare = 0.0, totalAmount = 0.0, returnTotalFare = 0.0;
	
	var onwardTotalFareVal = document.getElementById("totalAmountHid");
	if(onwardTotalFareVal != null){
			onwardTotalFare = onwardTotalFareVal.value;
	}
	
	var retTotalFareVal = document.getElementById("retTotalAmountHid");
	if(retTotalFareVal != null){
		returnTotalFare = retTotalFareVal.value;
			
	}
	totalAmount = parseFloat(onwardTotalFare) + parseFloat(returnTotalFare);
	
	var cashbackCouponObj = document.getElementById('cashbackCoupon');
	var cashbackCoupon;
	if(cashbackCouponObj != null){
		cashbackCoupon = cashbackCouponObj.value;
	}
	var cashbackCouponObj = document.getElementById('bankRefNo');
	var bankRefNo;
	if(cashbackCouponObj != null){
		bankRefNo = cashbackCouponObj.value;
	}
	
	var concessionAmoun = 0.0, dynamicDiscountFare = 0.0;
	/*if(document.getElementById("totalAmountHid") != null)
	totalAmount = parseFloat(document.getElementById("totalAmountHid").value);*/
	if(document.getElementById("concessionAmountHid") != null)
		concessionAmoun = parseFloat(document.getElementById("concessionAmountHid").value);
	if(document.getElementById("dynamicDiscountFareHid") != null)
		dynamicDiscountFare = parseFloat(document.getElementById("dynamicDiscountFareHid").value);
	
	path = path + "?cashbackCoupon="+ cashbackCoupon
				+ "&bankRefNo="+ bankRefNo
				+ "&totalAmount="+ totalAmount
				+ "&concessionAmount="+ concessionAmoun
				+ "&dynamicDiscountFare="+ dynamicDiscountFare
				;

	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	//document.getElementById('cashbackCoupon').
}

function validatePKGObreferanceNo(bankRefNo, pkgStatus, seatNum) {
	var divName = "ShowTranxDetails";
	var path ="/pkg/tickets/status/obreference.do?isTranxSuccess=0"
				+ "&bankRefNo=" + bankRefNo + "&pkgBkgStatus="+ pkgStatus+ "&seatNumbers="+seatNum;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function getOfflineAvailableServiceList(actType, searchType) {
	DIV_DEFAULT_WIDTH = "100%";
	var serviceId = "";
	var paramStr = "?txtJourneyDate=" + document.getElementById("txtJourneyDate").value
	;
	if(document.getElementById("serviceId") && document.getElementById("serviceId").value !=0
			&& document.getElementById("serviceId").value!="0") {
		serviceId = document.getElementById("serviceId").value;
	}
	showdiv("progressBarDiv");
	var divName = "ForwardAvailableServicesDiv";
	
		// forward journey parameters
	if(serviceId) {
		path = "/avail/offline/services/book.do";
	}else {
		path = "/forward/offline/services.do";
	}
		
		paramStr = paramStr
				+ "&startPlaceId=" + document.getElementById("startPlaceId").value
				+ "&endPlaceId=" + document.getElementById("endPlaceId").value
				+ "&serviceId=" + serviceId
				+ "&ajaxAction=fw"
				;
	
	path = path + paramStr + "&qryType=" + searchType;
	
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}


/*
 *  The following methods are related to the feature WL Tkt Transactions 
 */

function loadWLTktDetails(){
	var divName = "DisplayOptionsDiv";
	hideMessages();
	var pnr = "";
	var id = "";
	if(document.getElementById("pnrPrefixWithTktNo") != null) {
		pnr = document.getElementById("pnrPrefixWithTktNo").value;
		if(pnr != null && pnr != '') {
			id = pnr.replace(pnr.charAt(0), "");
			document.getElementById("id").value = id;
		}
	}
	var path =  "/validate/wlTkt.do?pnrPrefixWithTktNo=" + pnr
		+ "&id=" +id
		+ "&wlTktValidate=true"
		;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function cancelFullTicket(frmObj, pnrPrefix, id, uid, mobileNum, path) {
	hideMessages();
	var path =  path + "?searchType=0"
				+ "&pnrPrefixWithTktNo=" + pnrPrefix+id
				+ "&uidNumber="+uid
				+ "&mobileNo="+ mobileNum
				+ "&id=" +id
				+ "&wlTktValidate=true"
				;
	frmObj.action = path;
	frmObj.submit();
}

function transferTickets(frmObj, pnrPrefix, id, searchType,
		startPlaceId, endPlaceId, fromPlaceName, toPlaceName, singleLady, path, uid, mobileNum, onWardDate){
	
	hideMessages();

	var path =  path + "?searchType="+searchType
	+ "&pnrPrefixWithTktNo=" + pnrPrefix+id
	+ "&startPlaceId="+startPlaceId
	+ "&endPlaceId="+endPlaceId
	+ "&fromPlaceName="+fromPlaceName
	+ "&toPlaceName="+toPlaceName
	+ "&singleLady="+singleLady
	+ "&id=" +id
	+ "&wlTktValidate=true"
	+ "&uidNumber="+uid
	+ "&mobileNo="+ mobileNum
	+ "&wlTktTransfer=true"
	+ "&checkPgwRefundToWallet=1"
	+ "&txtJourneyDate="+onWardDate;
	;
	frmObj.action = path;
	frmObj.submit();
}

function addPGWToWalletForWL(path, divId, searchType,
		startPlaceId, endPlaceId, fromPlaceName, toPlaceName, singleLady, onwardDate, returnDate){
	var i=0; 
	var obj, mPrice = "", qty = "";
	while(true) {
		obj = document.getElementById("mPrice"+i);
		if(obj == null) break;
		if(i > 0) {mPrice += ","; qty += ",";}
		mPrice += obj.value;
		qty += document.getElementById("mQty"+i).value;
		i++;
	}
	i=0;
	var ob, seats = "";
	while(true) {
		ob = document.getElementById("seatNos" + i);
		if(ob == null) break;
		else if(ob.checked == true) {
			if(seats.length > 0) seats += ",";
			seats += ob.value;
		}
		i++;
	}
	if(seats.length == 0 && document.getElementById("seatNos0") != null) {
		seats = document.getElementById("seatNos0").value;
		document.getElementById("seatNos0").checked = true;
	} 
	document.getElementById("seatNosForward").value = seats;
	
	var uid = "";
	if(document.getElementById("uidNumber") != null) {
		uid = document.getElementById("uidNumber").value ;
	}
	var mobile = "";
	if(document.getElementById("mobileNo") != null) {
		mobile = document.getElementById("mobileNo").value ;
	}
	var walletRefundAmount = 0,pgwRefundAmount = 0, refundTotalAmount = 0;
	if(document.getElementById("checkPgwRefundToWallet").checked){
		checkPgwRefundToWallet = 1;
	} else {
		checkPgwRefundToWallet = 0;
	}
	path = path + "? id=" + document.getElementById("id").value
			+ "&pnrPrefixWithTktNo=" + document.getElementById("pnrPrefixWithTktNo").value
			+ "&seats=" + seats
			+ "&mPricLs=" + mPrice
			+ "&mSelQty=" + qty
			+ "&showLayout=false"
			+ "&uidNumber=" + uid
			+ "&mobileNo=" + mobile
			+ "&checkPgwRefundToWallet=" + checkPgwRefundToWallet
			+ "&wlTktValidate=true"
			+ "&wlTktTransfer=true"
			+ "&searchType="+searchType
			+ "&startPlaceId="+startPlaceId
			+ "&endPlaceId="+endPlaceId
			+ "&fromPlaceName="+fromPlaceName
			+ "&toPlaceName="+toPlaceName
			+ "&singleLady="+singleLady
			+ "&txtJourneyDate="+onwardDate
			+ "&txtReturnJourneyDate="+returnDate;
	ajaxCommonActionSubmit(path, divId, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function confirmWLCancellation(path, formObj, pnrNo, searchType,
		startPlaceId, endPlaceId, fromPlaceName, toPlaceName, singleLady, onwardDate, returnDate, checkPgwRefundToWallet) {
	var a = confirm("ALERT: Do you want to cancel the ticket?");
	if (a) {
		path = path + "?searchType="+searchType
			+ "&startPlaceId="+startPlaceId
			+ "&endPlaceId="+endPlaceId
			+ "&fromPlaceName="+fromPlaceName
			+ "&toPlaceName="+toPlaceName
			+ "&singleLady="+singleLady
			+ "&checkPgwRefundToWallet=" + checkPgwRefundToWallet
			;
		if(searchType == "1"){
			path = path + "&txtReturnJourneyDate="+returnDate;
		}else{
			path = path + "&txtJourneyDate="+onwardDate
		}
		submitFormAction(path, formObj);
	}
}

function getSearchLinkTicketList(path, divName) { 
	var txtJourneyDate, endPlaceId, startPlaceId, txtReturnJourneyDate = "";
	hidediv("ForwardLinkServiceDiv");
	hidediv("ReturnLinkServiceDiv");
	showdiv("populateLinkPlacesDiv");
	//showdiv("progressBarDiv");
	if(document.getElementById("startPlaceId") != null && document.getElementById("startPlaceId").value){
		startPlaceId = document.getElementById("startPlaceId").value;
	} else {
		alert("Please enter start place..");
		return false;
	}
	if(document.getElementById("endPlaceId") != null && document.getElementById("endPlaceId").value){
		endPlaceId = document.getElementById("endPlaceId").value;
	}else {
		alert("Please enter end place..");
		return false;
	}
	showdiv("LoadLinkTicketDiv");
	if(document.getElementById("txtJourneyDate") != null)
		t = document.getElementById("txtJourneyDate").value;
	
	if(t != null && t != "" && !validateDate(t)) {
		// alert("Please select a valid Journey Date to continue.");
		$('#txtJourneyDate').datepicker("show");
		return false;
	}
	
	if(document.getElementById("txtJourneyDate") != null && document.getElementById("txtJourneyDate").value){
		txtJourneyDate = document.getElementById("txtJourneyDate").value;
	}else {
		alert("Please select journey date..");
		return false;
	}
	
	if(document.getElementById("txtReturnJourneyDate") != null && document.getElementById("txtReturnJourneyDate").value){
		txtReturnJourneyDate = document.getElementById("txtReturnJourneyDate").value;
	}
	/*if(document.getElementById("searchType_3") != null 
			&& document.getElementById("searchType_3").checked == true){
		if(document.getElementById("txtReturnJourneyDate") != null && document.getElementById("txtReturnJourneyDate").value){
			txtReturnJourneyDate = document.getElementById("txtReturnJourneyDate").value;
		}else {
			alert("Please select return journey date..");
			return false;
		}
	}*/
	
	path = path + "?txtJourneyDate=" + txtJourneyDate
				+ "&txtReturnJourneyDate=" + txtReturnJourneyDate
	            + "&endPlaceId=" + endPlaceId
	            + "&startPlaceId=" + startPlaceId
				;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function getLinkAvailableServiceList(path, linkType, linkPlaceId, offlinePlace, linkRouteId, divName){
	
	/*hidediv("ForwardAvailableServicesDiv");
	hidediv("ReturnAvailableServicesDiv");*/
	hidediv("fwInfoLeftId");
	hidediv("retInfoLeftId");
	showdiv("ForwardLinkServiceDiv");
	showdiv("ReturnLinkServiceDiv");
	hidediv("populateLinkPlacesDiv");
	// forward journey parameters
	var arrivalDay = 0;
	var startPlaceId = 0, endPlaceId = 0;
	// Exaple :hyd---tpt---knpm  actual route
	//hyd--->sart, tpt--->end
	//tpt--->start, hyd--->end
	if(document.getElementById("isLinkTicket") != null)
		document.getElementById("isLinkTicket").value = 1;
	
	if(linkType == 'Forward'){
		if(document.getElementById("linkPlaceId") != null)
			document.getElementById("linkPlaceId").value = linkPlaceId;
		
		if(document.getElementById("offlinePlaceFw") != null)
			document.getElementById("offlinePlaceFw").value = offlinePlace;
		if(offlinePlace == 1){
			startPlaceId = linkPlaceId;
			if(document.getElementById("endPlaceId") != null)
				endPlaceId = document.getElementById("endPlaceId").value;

			if(document.getElementById("startPlaceId") != null)
				linkPlaceId = document.getElementById("startPlaceId").value;
		} else {
			if(document.getElementById("startPlaceId") != null)
				startPlaceId = document.getElementById("startPlaceId").value;
			
			endPlaceId = linkPlaceId;
			if(document.getElementById("endPlaceId") != null)
				linkPlaceId = document.getElementById("endPlaceId").value;

		}

	} else if(offlinePlace == 1){
		if(document.getElementById("offlinePlaceRt") != null)
			document.getElementById("offlinePlaceRt").value = offlinePlace;
		
		if(document.getElementById("linkPlaceIdRet") != null)
			document.getElementById("linkPlaceIdRet").value = linkPlaceId;
		
		startPlaceId = linkPlaceId;

		if(document.getElementById("startPlaceId") != null)
			endPlaceId = document.getElementById("startPlaceId").value;
		
		if(document.getElementById("endPlaceId") != null)
			linkPlaceId = document.getElementById("endPlaceId").value;


	} else {
		if(document.getElementById("offlinePlaceRt") != null)
			document.getElementById("offlinePlaceRt").value = offlinePlace;
		
		if(document.getElementById("linkPlaceIdRet") != null)
			document.getElementById("linkPlaceIdRet").value = linkPlaceId;
		
		if(document.getElementById("endPlaceId") != null)
			startPlaceId = document.getElementById("endPlaceId").value;
		
		endPlaceId = linkPlaceId;
		
		if(document.getElementById("startPlaceId") != null)
			linkPlaceId = document.getElementById("startPlaceId").value;

	}
	if(linkType == 'Forward'){
		if(document.getElementById("linkRouteId") != null)
			document.getElementById("linkRouteId").value = linkRouteId;
	} else {
		if(document.getElementById("linkRouteIdRet") != null)
			document.getElementById("linkRouteIdRet").value = linkRouteId;
	}
	if(linkType == 'Forward'){
		path = path + "?startPlaceId=" + startPlaceId
		+ "&endPlaceId=" + endPlaceId
		+ "&linkPlaceId=" + linkPlaceId
		+ "&txtJourneyDate=" + document.getElementById("txtJourneyDate").value
		+"&arrivalDay=" + arrivalDay 
		+ "&isLinkTicket=1"
		+ "&linkType=fw"
		+ "&ajaxAction=fw"
		+ "&offlinePlaceFw=" + offlinePlace
		+ "&linkRouteId=" + linkRouteId
		;
	} else {
		path = path +"?startPlaceId=" + startPlaceId
		+ "&endPlaceId=" + endPlaceId
		+ "&linkPlaceId=" + linkPlaceId
		+ "&txtJourneyDate=" + document.getElementById("txtJourneyDate").value
		+ "&txtReturnJourneyDate=" + document.getElementById("txtReturnJourneyDate").value
		+"&arrivalDay=" + arrivalDay 
		+ "&isLinkTicket=1"
		+ "&linkType=rt"
		+ "&ajaxAction=rt"
		+ "&offlinePlaceRt=" + offlinePlace
		+ "&linkRouteId=" + linkRouteId
		;
	}

	showdiv("progressBarDiv");
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	
	showdiv('modifySearchId');
	return true;
	
}

function ajaxShowLinkBoardingPoints(srid, sid, scId, rtPid, act, idx) {
	var path, divName, dt, startId, endId;
	if(document.getElementById("isLinkTicket") != null){
		document.getElementById("isLinkTicket").value = 1;
	}
	if(document.getElementById("startPlaceCode") != null){
		document.getElementById("startPlaceCode").checked = true;
	}
	
	if(act == "Return") {
		divName = "ReturnBoardPtsDiv";
		dt = document.getElementById("txtReturnJourneyDate").value;
		path = "/ajax/return/layout/boardPoints.do?ajaxAction=rt&txtReturnJourneyDate=" + dt;
		/*startId = document.getElementById("endPlaceId").value;
		endId = document.getElementById("startPlaceId").value;*/
		if(document.getElementById("offlinePlaceRt") != null)
			offlinePlace = document.getElementById("offlinePlaceRt").value;
		if(offlinePlace == 1){

			if(document.getElementById("linkPlaceIdRet") != null)
				linkPlaceId = document.getElementById("linkPlaceIdRet").value;

			startId = linkPlaceId;

			if(document.getElementById("startPlaceId") != null)
				endId = document.getElementById("startPlaceId").value;

		} else {
	
			if(document.getElementById("linkPlaceIdRet") != null)
				linkPlaceId = document.getElementById("linkPlaceIdRet").value;

			if(document.getElementById("endPlaceId") != null)
				startId = document.getElementById("endPlaceId").value;

			endId = linkPlaceId;

		}
	} else {
		/*startId = document.getElementById("startPlaceId").value;
		endId = document.getElementById("endPlaceId").value;*/
		
		if(document.getElementById("txtReturnJourneyDate").value != '' && document.getElementById("endPlaceCodeRet") != null 
				&& document.getElementById("endPlaceCodeRet").checked == false){
			alert("Please Select Return service list..");
			return false;
			
		}
		if(document.getElementById("linkPlaceId") != null)
			linkPlaceId = document.getElementById("linkPlaceId").value;
		
		if(document.getElementById("offlinePlaceFw") != null)
			offlinePlace = document.getElementById("offlinePlaceFw").value;
		if(offlinePlace == 1){
			startId = linkPlaceId;
			if(document.getElementById("endPlaceId") != null)
				endId = document.getElementById("endPlaceId").value;
			
		} else {
			if(document.getElementById("startPlaceId") != null)
				startId = document.getElementById("startPlaceId").value;
			
			endId = linkPlaceId;

		}
		divName = "ForwardBoardPtsDiv";
		dt = document.getElementById("txtJourneyDate").value;
		path = "/ajax/forward/layout/boardPoints.do?ajaxAction=fw&txtJourneyDate=" + dt;
	}
	
	document.getElementById(act + "ServiceId").value = sid;
	document.getElementById("srvcRtId" + act).value = srid;
	document.getElementById("categoryId" + act).value = scId;
	
	path = path + "&serviceId=" + sid 
				+ "&startPlaceId=" + startId 
				+ "&routeCode=" + srid 
				+ "&endPlaceId=" + endId 
				+ "&serviceCategoryId=" + scId
				+ "&isLinkTicket=1";
	
	var remName = document.getElementById(act).value;
	removeDiv(remName, divName);
	var divTag = createDiv(divName);
    document.getElementById(("LTLayout" + act + idx)).appendChild(divTag);
    document.getElementById(act).value = ("LTLayout" + act + idx);
    showdiv("progressBarDiv");
    accomPrice=0;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);	
}

function getLinkAvailableServiceList(actType, searchType, linkPlaceId) {
	DIV_DEFAULT_WIDTH = "100%";
	var paramStr = "?txtJourneyDate=" + document.getElementById("txtJourneyDate").value;
	var tatkalFlag=false;
	var linkFwServiceId ="";
	var isTatkalEnabled=document.getElementById("isTatkalEnabled").value;
	if(isTatkalEnabled=='true'){
		tatkalFlag =  document.getElementById("tatkalFlag").checked;
	}
	
	var singleLady = getSingleLady();
	showdiv("progressBarDiv");
	var divName = "ForwardStartAvailableServicesDiv";
	if(actType == '1') {
		path = "/end/booking/link/avail/services.do";
		// return journey parameters
		if(document.getElementById("linkFwServiceId") != null)
			linkFwServiceId = document.getElementById("linkFwServiceId").value;
		paramStr = paramStr 
					+ "&startPlaceId=" + document.getElementById("selectedLinkPlaceId").value
					+ "&endPlaceId=" + document.getElementById("endPlaceId").value
					+ "&txtJourneyDate=" + document.getElementById("txtJourneyDate").value
					+ "&ajaxAction=ret"
					+ "&singleLady=" + singleLady
					+ "&isLinkTicket=1"
					+ "&linkPlaceId=" + linkPlaceId
					+"&linkType="+"End"
					+"&linkFwServiceId="+linkFwServiceId
				;
		divName = "ForwardEndAvailableServicesDiv";
	} else {
		// forward journey parameters
		path = "/forward/booking/link/avail/services.do";
		paramStr = paramStr
				+ "&startPlaceId=" + document.getElementById("startPlaceId").value
				+ "&endPlaceId=" + document.getElementById("selectedLinkPlaceId").value
				+ "&ajaxAction=fw"
				+ "&singleLady=" + singleLady
				+ "&isLinkTicket=1"
				+"&linkType="+"Start"
				;
	}
	path = path + paramStr + "&qryType=" + searchType+ "&tatkalFlag=" + tatkalFlag;
	
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function ajaxShowLinkBoardingPoints(srid, sid, scId, rtPid, act, idx, departureTime, arrivalTime, arrivalDay,startTime, linkType) {
	var path, divName, dt, startId, endId, ondt ,tatkalFlag,isLinkTicket="",linkPlaceId="",linkFwArriavlDay="", linkFwServiceId;
	if(act == "Return") {
		if(document.getElementById("ForwardBoardPtsDiv") == null){
			alert("Please select onward journey...");
			return false;
		}
		divName = "ReturnBoardPtsDiv";
		ondt = document.getElementById("txtJourneyDate").value;
		dt = document.getElementById("txtReturnJourneyDate").value;
		if(document.getElementById("linkEvalEndJourneyDate"))
			dt = document.getElementById("linkEvalEndJourneyDate").value;
		path = "/ajax/return/layout/boardPoints.do?ajaxAction=rt&txtReturnJourneyDate=" + dt + "&txtJourneyDate=" + ondt;
		startId = document.getElementById("selectedLinkPlaceId").value;
		endId = document.getElementById("endPlaceId").value;
		if(document.getElementById("fwArrivalTime") != null)
			arrivalTime = document.getElementById("fwArrivalTime").value;
		if(document.getElementById("arrivalDay") != null)
			arrivalDay = document.getElementById("arrivalDay").value;
		
		if(document.getElementById("linkFwArriavlDay")) {
			linkFwArriavlDay = document.getElementById("linkFwArriavlDay").value;
		}
		if(document.getElementById("linkFwServiceId")) {
			linkFwServiceId = document.getElementById("linkFwServiceId").value;
		}
	} else {
		if(document.getElementById("fwArrivalTime") != null)
			document.getElementById("fwArrivalTime").value = arrivalTime;
		if(document.getElementById("arrivalDay") != null)
			document.getElementById("arrivalDay").value = arrivalDay;
		var isTatkalEnabled=document.getElementById("isTatkalEnabled").value;
		if(isTatkalEnabled=='true'){
			if(document.getElementById("tatkalFlag") != null)
				tatkalFlag = document.getElementById("tatkalFlag").checked;
		}
		if(arrivalDay) {
			document.getElementById("linkFwArriavlDay").value = arrivalDay;
			linkFwArriavlDay = arrivalDay;
		}
		if(sid) {
			document.getElementById("linkFwServiceId").value = sid;
			linkFwServiceId = sid;
		}
		startId = document.getElementById("startPlaceId").value;
		endId = document.getElementById("selectedLinkPlaceId").value;
		divName = "ForwardBoardPtsDiv";
		dt = document.getElementById("txtJourneyDate").value;
		path = "/ajax/forward/layout/boardPoints.do?ajaxAction=fw&txtJourneyDate=" + dt;
	}
	
	document.getElementById(act + "ServiceId").value = sid;
	document.getElementById("srvcRtId" + act).value = srid;
	document.getElementById("categoryId" + act).value = scId;
	if(document.getElementById("isLinkTicket") != null)
		isLinkTicket = document.getElementById("isLinkTicket").value;
	if(document.getElementById("selectedLinkPlaceId") != null)
		linkPlaceId = document.getElementById("selectedLinkPlaceId").value;
	
	path = path + "&serviceId=" + sid 
								+ "&startPlaceId=" + startId  
								+ "&routeCode=" + srid 
								+ "&endPlaceId=" + endId 
								+ "&serviceCategoryId=" + scId
								+ "&rtDepartuteTime=" + departureTime 
								+ "&fwArrivalTime=" + arrivalTime
								+ "&arrivalDay=" + arrivalDay
								+ "&tatkalFlag=" + tatkalFlag
								+ "&serviceOriginStartDate=" +startTime
								+ "&isLinkTicket=" +isLinkTicket
								+ "&linkType=" +linkType
								+ "&linkPlaceId=" +linkPlaceId
								+ "&linkFwArriavlDay=" +linkFwArriavlDay
								+ "&linkFwArriavlDay=" +linkFwArriavlDay
								;
	
	var remName = document.getElementById(act).value;
	removeDiv(remName, divName);
	var divTag = createDiv(divName);
    document.getElementById(("Layout" + act + idx)).appendChild(divTag);
    document.getElementById(act).value = ("Layout" + act + idx);
    showdiv("progressBarDiv");
    accomPrice=0;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);	
}

function verifyPhonepeTxnStatus(path, divName) {
	DIV_DEFAULT_WIDTH = "100%";
	path = path;
	showdiv(divName);
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function lockoutSubmit(button, disableTime) {
	rewardDisableResend(button, disableTime);
	
	var path = "/ajax/wallet/transfer/generateOTP.do";
	path = path + "?mobileNo=" + document.getElementById("mobileNo").value

	;
	ajaxCommonActionSubmit(path, 'ajaxId', DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}
function rewardDisableResend(button, disableTime) {
	var oldValue = button.value;
	//convert to milliseconds
	disableTime = parseFloat(disableTime) * 1000;
	button.setAttribute('disabled', true);
	button.className='resendBtn';
    setTimeout(function(){
        button.value = oldValue;
        button.removeAttribute('disabled');        
        button.className='resendBtnEn';
    }, disableTime)
}
