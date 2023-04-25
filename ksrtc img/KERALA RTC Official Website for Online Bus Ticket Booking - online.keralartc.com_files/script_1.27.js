/*
 * Author		: Rajasekhar Chittattooru
 * Description 	: Common JavaScripts for MVC Project
 */

// popup window properties
var winProps = 'toolbars=0, menubar=0,scrollbars=1,resizable=1,location=0,status=0,copyhistory=0,directories=0';

var PAGE_SIZE = 10; // default number of records per page
var ADULT_ID = 16;
var CHILD_ID = 17;
var MALE_ID = 24;
var FEMALE_ID = 25;
var ladyQuotaSeatArray = new Array();

// report engine URL path
var rptServerPath = "";
var accomPrice=0;
var FILTER_TYPE = null;

// global function identify the browser type and version
(function(){
	var userAgent = navigator.userAgent.toLowerCase();
	window.browser = {
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
		safari: /webkit/.test( userAgent ),
		opera: /opera/.test( userAgent ),
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
		chrome: /chrome/.test( userAgent )
	};
})();

function $() {
    var elements = new Array();

    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];

        if (typeof element == 'string')
            element = document.getElementById(element);

        if (arguments.length == 1)
            return element;

        elements.push(element);
    }
    return elements;
}

function checkbox() {
	if(document.getElementById("TermsConditions") != null
			&& document.getElementById("TermsConditions").checked == false) {
		alert("Please check Terms & Conditions");
		return false;
	}
	return true;
}
function recordOutboundLink(link, category, action) {
  try {
    var pageTracker=_gat._getTracker("UA-XXXXX-X");
    pageTracker._trackEvent(category, action);
    setTimeout('document.location = "' + link.href + '"', 100);
  }catch(err){}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showClock() {
	var dayarray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	var montharray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	serverdate.setSeconds(serverdate.getSeconds()+1);
    var hours = serverdate.getHours();
    var minutes = serverdate.getMinutes();
    var seconds = serverdate.getSeconds();
    var day = serverdate.getDay();
    var date = serverdate.getDate();
    var month = serverdate.getMonth();
    var year = serverdate.getYear();

    var dn = "PM";
    if (hours < 12) {
        dn = "AM";
    }
    if (hours > 12) {
        hours = hours-12;
    }
    if (hours == 0) {
        hours=12;
    }
    if (minutes <= 9) {
        minutes = "0"+minutes;
    }
    if (seconds <= 9) {
        seconds = "0"+seconds;
    }

    if (year < 1000) {
        year += 1900;
    }

    var ctime = hours+": "+minutes+": "+seconds+" "+dn+", "+dayarray[day]+", "+date+" " + montharray[month]+" "+year;
	document.getElementById("clock").innerHTML = ctime;
	setTimeout("showClock()",1000);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function disableCtrlKeyCombination(e) {
	// list all CTRL + key combinations you want to disable
    var forbiddenKeys = new Array("a", "n", "c", "x", "v", "j", "p");
    var key;
    var isCtrl;
    if(window.event) {
    	key = window.event.keyCode;     // IE
        if(window.event.ctrlKey)
        	isCtrl = true;
        else
        	isCtrl = false;
    } else {
    	key = e.which;     // firefox
        if(e.ctrlKey)
        	isCtrl = true;
        else
        	isCtrl = false;
    }
    // if ctrl is pressed check if other key is in forbidenKeys array
    if(isCtrl) {
    	for(var i=0; i<forbiddenKeys.length; i++) {
    		// case-insensitive comparation
            if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
            	alert("Key combination CTRL + "+String.fromCharCode(key)+" has been disabled.");
                return false;
            }
    	}
    }
    return true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeDiv(parentDiv, childDiv) {
	
	if(parentDiv != null && parentDiv != "" && childDiv != null && childDiv != "") {
		var parent = document.getElementById(parentDiv);
		if(parent != null) {
			var children = parent.getElementsByTagName('div')[0];
			if(children != null) {
				parent.removeChild(children);
			}
		}
	}
}
function convertToUpper(currObj) {
	currObj.value = currObj.value.toUpperCase();
}
function removeComboItems(obj){
    var selctdVal = obj.options[obj.selectedIndex].value;
    for (var i=0; i<obj.options.length; i++) {
		if(obj.options[i].value == selctdVal)  {
			continue;
		}
    	obj.remove(i);
    }
}
function createDiv(divId) {
	var divTag = document.createElement("div");
    divTag.id = divId;
    divTag.setAttribute("align","center");
    divTag.style.margin = "0px auto";
    return divTag;
}
function setAutocompleteOff() {
	if (document.getElementsByTagName) {
		var inputElements = document.getElementsByTagName("input");
		for (var i=0; inputElements[i]; i++) {
			if (inputElements[i].className && (inputElements[i].className.indexOf("disableAutoComplete") != -1)) {
				inputElements[i].setAttribute("autocomplete","off");
			}
		}
	}
}
function submitLogin(srcObj, eventObj) {
	var charCode = (eventObj.which) ? eventObj.which : event.keyCode;
	if(charCode == '13') {
		document.getElementById("submitBtn").click();
	}
}
/*
 * This function extends the basic JavaScript escape() functionality by also
 * encoding the '+' sign, which will otherwise be mistaken for a space.
 */
function URLencode(str)
{
    ns = escape(str);
    os = "";

    for(var i=ns.indexOf("+");-1!=i;i=ns.indexOf("+"))
    {
        os += ns.substr(0,i);
        os += "%2B";
        ns = ns.substr(i+1);
    }
    if(0 == os.length)
    {
        os = ns;
    }

    return os;
}

/*
 * This function extends the basic JavaScript escape() functionality by also
 * encoding the '+' sign, which will otherwise be mistaken for a space.
 */
function URLencode(str)
{
    ns = escape(str);
    os = "";

    for(var i=ns.indexOf("+");-1!=i;i=ns.indexOf("+"))
    {
        os += ns.substr(0,i);
        os += "%2B";
        ns = ns.substr(i+1);
    }
    if(0 == os.length)
    {
        os = ns;
    }

    return os;
}

// Returns an array containing old items (in current URL) check
function getQueryArgs()
{
    if(null == location.search)
    {		
        return new Array();	
    }	
    args = location.search.split("?");	
    if(args.length < 2)	
    {		
        return new Array();	
    }	
    s = args[1];
    args = s.split("&");
    return args;
}

/*
 * 
 * Scans the query-string of the URL of the current page and returns an array
 * holding the values for the elements of the requested name. That is, if the
 * current query string is
 * 
 * ?arg1=val1&arg2=val2U&arg2=val3&arg4=val4
 * 
 * then getFromUrl("arg1") would return ["val1"], and getFromUrl("arg2") would
 * return ["arg2","arg3"]
 * 
 */
function getFromUrl(param)
{
    n = new Array();
    count = 0;
    args = getQueryArgs();
    for(var i=0;i<args.length;i++)
    {
        nv = args[i].split("=");
        if(nv[0] != param)
        {
            continue;
        }
        n[count++] = nv[1];
    }
    return n;
}

function popUpWin(url, winName) {
	var childWin = window.open(url, winName, winProps+',width=1100, height=780');
}
function serviceHaltPopUp(url, winName) {
	var childWin = window.open(url, winName, winProps+',width=700, height=400, resizable=0');
}
/*
 * Redirect to another specified URL
 */
function gotoPage(url) {
	if (url == '') {
		url = '#';
	}
    location.href=url;
}
function gotoBack(path, btnObj) {
	var agree=confirm("Are you leaving the current page? The data you entered can not be recovered.\n Do you want to continue?");
	if (agree){
		btnObj.disabled = true;
		gotoPage(path);
	}
}
// This function used to reset the action
function setAction(action, formname) {
	var objForm = formname != '' ? document.forms[formname] : document.forms[0];
	objForm.action = action;
}
// This function used to get the radio value from form
function getRadioValue(radio) {
	for (var i=0;i<radio.length;i++) {
		if (radio[i].checked) return radio[i].value;
	}
}
/*
 * This function used for paging based on the start index
 */
function gotoIndex2(objForm, startIdx) {
	if (startIdx == '') {
		startIdx = '0';
	}
	
	// alert("form obj:"+document.forms[objForm]+" start Index "+startIdx);
	
	document.forms[objForm].startIndex.value = startIdx;
	document.forms[objForm].submit();
}
/*
 * This function used for paging based on the start index
 */
function gotoIndex(startIdx) {
	if (startIdx == '') {
		startIdx = '0';
	}
	var objForm = document.forms[0];
	objForm.startIndex.value = startIdx;
	objForm.submit();
}
/*
 * This function used for paging based on the start index
 */
function gotoIndex3(startIdx, next20) {
	if (startIdx == '') {
		startIdx = '0';
	}
	var objForm = document.forms[0];
	objForm.next20Page.value = next20;
	objForm.startIndex.value = startIdx;
	objForm.submit();
}
/*
 * This function used for paging based on the start index
 */
function gotoNext20Index(startIdx) {
	if (startIdx == '') {
		startIdx = '0';
	}
	var objForm = document.forms[0];
	objForm.next20Page.value = startIdx;
	if(objForm.pageSize != null) {
		PAGE_SIZE = objForm.pageSize.value;
	}
	objForm.startIndex.value = (startIdx - 1) * PAGE_SIZE;
	objForm.submit();
}
/*
 * This function used for paging based on the start index
 */
function gotoPrevious20Index(startIdx) {
	if (startIdx == '') {
		startIdx = '0';
	}
	var objForm = document.forms[0];
	objForm.next20Page.value = startIdx - 19;
	if(objForm.pageSize != null) {
		PAGE_SIZE = objForm.pageSize.value;
	}
	objForm.startIndex.value = (startIdx - 20) * PAGE_SIZE;
	objForm.submit();
}
/*
 * This function used for sort the column
 */
function sort(id) {
	var objForm = document.forms[0];
	var previousId = objForm.sortId.value;
	var previousOrder = objForm.sortOrder.value;
	var nextId = id;
	var nextOrder = "ASC";
	
	if ((previousId != null) && (previousId == nextId)) {
		if ((previousOrder != null) && (previousOrder == "ASC")) {
			nextOrder = "DESC";
		} else {
			nextOrder = "ASC";
		}
	}
	objForm.sortId.value = nextId;
	objForm.sortOrder.value = nextOrder;
	
	var startIdx = objForm.startIndex;
	if ((startIdx != null)) {
	objForm.startIndex.value = "0";
	}
	objForm.submit();
}
/*
 * This function used for sort the column
 */
function sort2(id, next20) {
	var objForm = document.forms[0];
	objForm.next20Page.value = next20;
	var previousId = objForm.sortId.value;
	var previousOrder = objForm.sortOrder.value;
	var nextId = id;
	var nextOrder = "ASC";
	
	if ((previousId != null) && (previousId == nextId)) {
		if ((previousOrder != null) && (previousOrder == "ASC")) {
			nextOrder = "DESC";
		} else {
			nextOrder = "ASC";
		}
	}
	
	objForm.sortId.value = nextId;
	objForm.sortOrder.value = nextOrder;
	
	var startIdx = objForm.startIndex;
	if ((startIdx != null)) {
	objForm.startIndex.value = "0";
	}
	objForm.submit();
}
// Removes leading whitespaces
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
// Removes ending whitespaces
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}
function validNumber(val) {
	return val.match(/^\d+$/);
}
function validDecimal(val) {
	var reg = /^\d+(\.\d+)?$|^\.\d+$/;
	return reg.test(val);
}
function validAlphabet(val) {
	var reg = /[a-zA-z ]/;
	return reg.test(val);
}
function validAlphaNumeric(val) {
	var reg = /^[a-zA-Z0-9]+$/;
	return reg.test(val);
}
function validEmail(val) {
	var reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return reg.test(val);
}
//////////////////////////////////////
function getSelectedTextInCombo(fieldName) {
	var combObj = document.getElementById(fieldName);
	if(combObj == null || combObj.options == null) {
		return "";
	}
	return combObj.options[combObj.selectedIndex].text;
}
function checkTimeFormat(starttime, id) {
   // regular expression to match required time format
   var re = /^\d{1,4}:\d{2}([ap]m)?$/;
   if(starttime != '' && !starttime.match(re)) {
     alert("Invalid time format: " +starttime);
	  document.getElementById(id).value="";
     document.getElementById(id).focus();
     return false;
   }
}
function isNumber(txtObj) {
	var val = txtObj.value;
	if(val == "" || txtObj.value == "0.00") {
		return false;
	}
	if(validNumber(val)) {
		return true;
	} else {
		txtObj.value = "0";
		txtObj.focus();
		alert("Please enter valid number.");
		return false;
	}
}
function isDecimal(txtObj) {
	var val = txtObj.value;
	if(val == "" || txtObj.value == "0.00") {
		return true;
	}
	if(validDecimal(val)) {
		return true;
	} else {
		alert("Please enter valid decimal number.");
		txtObj.value = "";
		txtObj.focus();
		return false;
	}
}
function validateDate(dtValue) {
	var dtRegex = new RegExp(/\b\d{1,2}[\/]\d{1,2}[\/]\d{4}\b/);
	return dtRegex.test(dtValue);
}

function validateAlphabet(txtObj, fieldName) {
	if(document.getElementById('selectedSleeperDays') && document.getElementById('selectedSleeperDays').value != "") {
		if(txtObj.value == "" || validAlphabetOnly(txtObj.value)) {
			return true;
		} else {
			alert("Please enter valid " + fieldName);
			txtObj.value = "";
			txtObj.focus();
			return false;
		}
	}else {
		if(txtObj.value == "" || validAlphabet(txtObj.value)) {
			return true;
		} else {
			alert("Please enter valid " + fieldName);
			txtObj.value = "";
			txtObj.focus();
			return false;
		}
	}
	
}
function validateEmail(txtObj) {
	if(txtObj.value == "" || validEmail(txtObj.value)) {
		return true;
	} else {
		alert("Please enter valid email address.");
		txtObj.value = "";
		txtObj.focus();
		return false;
	}
}
function maxLengthMoveToDest(val, maxLength, destName) {
	if(val.length == maxLength && document.getElementById(destName) != null) {
		document.getElementById(destName).focus();
	}
}
function getElementY(element){
	var targetTop = 0;
	if (element.offsetParent) {
		while (element.offsetParent) {
			targetTop += element.offsetTop;
            element = element.offsetParent;
		}
	} else if (element.y) {
		targetTop += element.y;
    }
	return targetTop;
}
// this function is used to reset the form,
// it reset the text, drop down boxes only and hidden fields.
function restForm(formObj) {
	var inputArray = document.getElementsByTagName("input");
	var size = inputArray.length;
	for(var i = 0; i < size; i++) {
		if (inputArray[i].type == "text") {
			inputArray[i].value = "";
		} else if (inputArray[i].type == "hidden") {
			if(inputArray[i].name == "ajaxAction"
				|| document.getElementById("ajaxAction").value == 'ticketHistory'
				|| inputArray[i].name == "contextPath"
				|| inputArray[i].name == "currentIndex") {
				continue;
			}
			inputArray[i].value = "";
		} else if(inputArray[i].type == 'select-one') {
			inputArray[i].value = "";
		} else if(inputArray[i].type == 'radio') {
			inputArray[i].checked = false;
		} else if(inputArray[i].type == 'checkbox'){
			inputArray[i].checked = false;
		}
	}// end of for loop
	
	if(document.getElementById("startIndex") != null) {
		document.getElementById("startIndex").value = 0;
	}
	
	if(document.getElementById("next20Page") != null) {
		document.getElementById("next20Page").value = 0;
	}
	
	if(document.getElementById("convertedFuel") != null) {
		document.getElementById("convertedFuel").value = 0.00;
	}
}// end of restForm()

// this function is used to reset the pagination form element,
function resetPaginationForm(formObj) {
	if(document.getElementById("startIndex") != null) {
		document.getElementById("startIndex").value = 0;
	}
	
	if(document.getElementById("next20Page") != null) {
		document.getElementById("next20Page").value = 0;
	}
	
}// end of resetPaginationForm()

/**
 * Thie method is used to select all the check boxes in a form, for a give
 * check box object.
 * 
 */
function  selectAllCheckBoxes(chkBoxObj) {
	// get the form object.
	var formObj= chkBoxObj.form;
	var inputArray = document.getElementsByTagName("input");
	// get the form elements size.
	var size = inputArray.length;
	// is the check box checked or not
	var isSelected = chkBoxObj.checked;
	
	for (var j=0; j < size;j++) {
		// set the checked status as the given check object status.
		inputArray[j].checked = isSelected;
		
	}// end of for loop
}// end of selectAllCheckBoxes() method.

function disableAllBtns() {
	var iAry = document.getElementsByTagName("input");
	// get the form elements size.
	var size = iAry.length;
	for (var j=0; j < size;j++) {
		// disable all buttons
		if(iAry[j].type == 'button' || iAry[j].type == 'submit')
			iAry[j].disabled = "disabled";
		
	}// end of for loop
}

function submitFormAction(path, id) {
	if(!checkbox()){
		return false;
	}
	disableAllBtns();
	var formObj = document.getElementById(id);
	formObj.action = path;
	formObj.submit();
}
/**
 * This method is used to submit the download action and to set the form
 * action back
 */
function submitDownload(actionStr, formName) {
	var objForm = formName != '' ? document.forms[formName] : document.forms[0];
	
	if(objForm != null) {
		var prevAction = objForm.action;
		
		objForm.action = actionStr;
		objForm.submit();
		objForm.action  = prevAction;
	}
	else {
		var downWin = window.open(actionStr, 'downloadWin', 'height=10, width=10,scrollbars=1,resizable=1');
	}
}// end of submitDownload()
function trim(str) {
    if(!str || typeof str != 'string')
        return null;

    return str.replace(/^[\s]+/,'').replace(/[\s]+$/,'').replace(/[\s]{2,}/,' ');
}

function calendarPopup(id) {
	if(self.gfPop) {
		gfPop.fPopCalendar(document.getElementById(id));
	}
	return false;
}

function currCalPopup(id) {
	var d = serverdate.getDate();
    var m = serverdate.getMonth() + 1;
    var y = serverdate.getFullYear();
	
	if(self.gfPop) {
		gfPop.fPopCalendar(document.getElementById(id),[[y,m,d]]);
	}
	return false;
}

// textarea maxlength check.
function checklength(srcObj, maxLength) {
	var str =  srcObj.value;
	maxLen = parseInt(maxLength); // 200; // max number of characters
									// allowed
	if (str.length >= maxLen) {
		// Alert message if maximum limit is reached.
		// If required Alert can be removed.
		alert("You have reached your maximum limit of characters allowed");
		// Reached the Maximum length so trim the textarea
		srcObj.value = srcObj.value.substring(0, maxLen);
	}else{ // Maximum length not reached so update the value of my_text
			// counter
		document.getElementById('textnum').value = maxLen - srcObj.value.length;
	}
}

function printPageByDiv(printDivId) {
	if(printDivId == null || document.getElementById(printDivId) == null) {
		return false;
	}
	var contentObj = document.getElementById(printDivId).innerHTML; 
	if(document.getElementById("boardingPointPtn") != null){
	    var boardingPointPtn=document.getElementById("boardingPointPtn").innerHTML;
	    contentObj=contentObj.replace(boardingPointPtn,"");
	}
	
    var newWin = window.open("", "_blank"
    		, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=1100, height=780");
    if(document.getElementById("contextPath") != null) {
    	var contextPath = document.getElementById("contextPath").value;
    	var cssLink = '<link id="skinCssID" href="' + contextPath + '/_assets/skin/skin.css" rel="stylesheet" type="text/css"/>';
    	newWin.document.write(cssLink);
    }
    newWin.document.write(contentObj); 
    newWin.document.close(); 
    var myDelay = setInterval(checkReadyState, 1000);
	
	function checkReadyState() {
        if (newWin.document.readyState == "complete") {
            clearInterval(myDelay);
            newWin.focus(); // necessary for IE >= 10
            newWin.print(); 
            newWin.close();
        }
    }
    // --------------------------------------- 
}

function printCurrentPage(objName) {
 	var x = document.getElementById(objName);
	x.style.visibility = 'hidden';	
	window.print();
	x.style.visibility = 'visible';	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////MODULE RELATED JAVASCRIPT CODE 														//////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function reduceOnMeal(obj, qt) {
	if(!isNumber(obj)) return false;
	var v = parseInt(obj.value);
	if(v > qt) {
		alert("Please enter valid quantity to be cancelled.");
		obj.value = qt; 
		obj.focus();
	}
}

function isFemaleSeatBooked(requestType, tdId, seatIndx, currentIdx, seatType) {
	if(seatType != null && seatType != '' && seatType == 'B') {
		return false;
	}
	var columns = parseInt(document.getElementById("columns" + requestType).value);
	var nextIdx = parseInt(seatIndx) + columns;
	var seatTd = document.getElementById((requestType + nextIdx));
	var femSt = 'ladiesSeatClass' + seatType;
	if(seatTd != null) {
		if(seatTd.className == femSt  
			&& document.getElementById(("genderCodeId" + requestType + currentIdx)).value == MALE_ID) {
			return true;
		}
	}
	nextIdx = parseInt(seatIndx) - columns;
	seatTd = document.getElementById((requestType + nextIdx));
	
	if(seatTd != null) {
		if(seatTd.className == femSt 
			&& document.getElementById(("genderCodeId" + requestType + currentIdx)).value == MALE_ID) {
			return true;
		}
	}
	return false;
}

function lockFemaleAdjacentSeat(requestType, tdId, seatIndx, currentIdx, seatType) {
	if(seatType != null && seatType != '' && seatType == 'B') {
		return false;
	}
	var columns = parseInt(document.getElementById("columns" + requestType).value);	
	var nextIdx = parseInt(seatIndx) + columns;
	var seatTd = document.getElementById((requestType + nextIdx));
	var femSt = 'ladiesSeatClass' + seatType;
	if(seatTd != null) {
		if(seatTd.className == femSt) {
			var fOb = document.getElementById(("genderCodeId" + requestType + currentIdx));
			/*if(fOb != null) {
				fOb.value = FEMALE_ID;
				removeComboItems(fOb);
			}*/
		}
	}
	nextIdx = parseInt(seatIndx) - columns;
	seatTd = document.getElementById((requestType + nextIdx));
	
	/*if(seatTd != null) {
		if(seatTd.className == femSt ) {
			document.getElementById(("genderCodeId" + requestType + currentIdx)).value = FEMALE_ID;
			removeComboItems(document.getElementById(("genderCodeId" + requestType + currentIdx)));
		}
	}	*/
}

function checkWLSeatsOrder(requestType){
	for(var j=1004;j>=1000;j--) {
		wlObj = document.getElementById(requestType + j);
		if(wlObj != null && wlObj.className.indexOf('selec') != -1) {
			if(!checkWaitingListSeats(requestType, j)) {
				return false;
			}
		}
	}
	return true;
}

function checkWaitingListSeats(requestType, seatIndx) {
	for(var i=1;i<=4;i++){
		var minIdx = parseInt(seatIndx)-i;
		if(minIdx < 0) {
			break;
		}
		var mintdId = document.getElementById((requestType + minIdx));
		
		if(mintdId != null && mintdId.className.indexOf('avail') != -1) {
			alert('Please select minimum waiting list seat number');
			return false;
		} 
	}
	return true;
}

function setSelectedSeatDetail(requestType, seatNumber, seatType, seatIndx) {	
	var indx = parseInt(document.getElementById("currSeatIndex" + requestType).value);
	if(document.getElementById("BookNowBtnDivID")) {
		showdiv("BookNowBtnDivID");
	}
	
	var size = 1 ;
	
	var tdId = document.getElementById((requestType + seatIndx));
	if(tdId.className == "availSeatClassLadies"+seatType) {
		if(ladyQuotaSeatArray.length ==0 || !ladyQuotaSeatArray.includes(seatNumber)) {
			ladyQuotaSeatArray.push(seatNumber);
		}
	}
		
	if(seatNumber.indexOf('WL') != -1 && tdId.className.substring(0,5) == "avail") {
		var flag = checkWaitingListSeats(requestType, seatIndx);
		if(!flag) return false;
	}
	
	var maxSeatsAllowed = parseInt(document.getElementById("maxPassengerAllowed").value);
	size = maxSeatsAllowed;
	if(indx < 0) {
		indx = 0;
	}
	if(indx >= size && tdId.className == ("availSeatClass" + seatType)) {
		alert("Maximum " + size + " seat(s) allowed to book.");
		return false;
	}
	if(tdId.className == ("availSeatClassLadies" + seatType)) {
		alert("This seats are allowed to lady passengers only");
	}
	
	var tblId = 'PaxTbl'+requestType;
	var fvs = document.getElementById("femaleSeatSpanId" + requestType);
	if(fvs != null) {
		fvs.innerHTML = "";
		fvs.className = "";
	}
	
	var sLdy = document.getElementById("sldyAllowed" + requestType);
	if(document.getElementById("singleLadyIndex" + requestType)) {
		document.getElementById("singleLadyIndex" + requestType).value = seatIndx;
	}
	if(sLdy != null && sLdy.value == "1" && parseInt(seatIndx) % parseInt(document.getElementById("columns" + requestType).value) ===0) {
		var tmsg = "Single lady seat booking not allowed for last row in layout please select another seat";
		var b = confirm(tmsg);
		if(document.getElementById("BookNowBtnDivID")) {
			hidediv("BookNowBtnDivID");
		}
		return false;
		
	}
	
	// set seat details and calculate total price details 
	if(tdId != null) {
		if(tdId.className == ("selectedSeatClass" + seatType)) {
			tdId.className = "availSeatClass" + seatType;
			if(ladyQuotaSeatArray && ladyQuotaSeatArray.length>0) {
				if(ladyQuotaSeatArray.includes(seatNumber) && tdId.className == "availSeatClass"+ seatType) {
					tdId.className = "availSeatClassLadies" + seatType;
					if (ladyQuotaSeatArray.indexOf(seatNumber) !== -1) {
						ladyQuotaSeatArray.splice(ladyQuotaSeatArray.indexOf(seatNumber), 1);
					}
				}
			}
			indx = indx - 1;
			var vb = false;
			for(var sIdx = 0; sIdx < indx; sIdx++) {
				if(document.getElementById(("seatDetails" + requestType + sIdx)).value == seatNumber) {
					vb = true;	
				}
				if(vb && document.getElementById(("seatDetails" + requestType + (sIdx+1)))) {
					document.getElementById(("seatDetails" + requestType + sIdx)).value = document.getElementById(("seatDetails" + requestType + (sIdx+1))).value;
					document.getElementById(("categoryCodeId" + requestType + sIdx)).value = document.getElementById(("categoryCodeId" + requestType + (sIdx+1))).value;
					document.getElementById(("genderCodeId" + requestType + sIdx)).value = document.getElementById(("genderCodeId" + requestType + (sIdx+1))).value;
					document.getElementById(("passengerName" + requestType + sIdx)).value = document.getElementById(("passengerName" + requestType + (sIdx+1))).value;
					document.getElementById(("passengerAge" + requestType + sIdx)).value = document.getElementById(("passengerAge" + requestType + (sIdx+1))).value;
					if(document.getElementById(("nationality" + requestType + (sIdx+1)))!=null){
					document.getElementById(("nationality" + requestType + sIdx)).value = document.getElementById(("nationality" + requestType + (sIdx+1))).value;					
					document.getElementById(("passportNo" + requestType + sIdx)).value = document.getElementById(("passportNo" + requestType + (sIdx+1))).value;
					document.getElementById(("foreignerAddress" + requestType + sIdx)).value = document.getElementById(("foreignerAddress" + requestType + (sIdx+1))).value;
					document.getElementById(("dob" + requestType + sIdx)).value = document.getElementById(("dob" + requestType + (sIdx+1))).value;
					}
					
				}
			}
			document.getElementById(("seatDetails" + requestType + indx)).value = "";
			document.getElementById(("genderCodeId" + requestType + indx)).value = "";
			document.getElementById(("passengerName" + requestType + indx)).value = "";
			document.getElementById(("passengerAge" + requestType + indx)).value = "";
			removePaxRow(requestType, indx, tblId);			
		} else {
			/*if(sLdy != null && sLdy.value == "1" && indx > 0) {
				alert("Please select single lady seat only. You are not allowed for multiple single lady seats.")
				return false;
			}*/
			
			/*if(seatNumber.indexOf('WL') != -1 && tdId.className.substring(0,5) == "avail" && indx > 0) {
				alert("Waitlist Ticket can be booked only 1 seat at a time.");
				return false;
			}*/
			
			addNewPaxRow(requestType, indx, tblId, tdId, seatIndx, seatType);
			if(requestType == 'Return'){
				populateEachPaxDetails(indx);
			}
			if(requestType == 'End'){
				populateLinkEachPaxDetails(indx);
			}
			if(sLdy != null && sLdy.value == 1) {
				document.getElementById("genderCodeId" + requestType + indx).value = FEMALE_ID;
				removeComboItems(document.getElementById("genderCodeId" + requestType + indx));
			}
			var selCss = tdId.className;
			tdId.className = "selectedSeatClass" + seatType;
			//copyPrimaryPaxName();
			
			if(sLdy != null && sLdy.value == "1" 
					&& selCss != 'availSeatClassLadies'
					&& isFemaleSeatBooked(requestType, tdId, seatIndx, indx, seatType)) {
				tdId.className = "selectedSeatClass" + seatType;
				var tmsg = "The adjacent seat is booked by male, single lady is not allowed to book next to another male seat.";
				var b = confirm(tmsg);
				// if not confirmed then do not allow the user to continue the seat selection.
				if(!b) {
					tdId.className = "availSeatClass" + seatType;
					document.getElementById(("seatDetails" + requestType + indx)).value = "";
					document.getElementById(("genderCodeId" + requestType + indx)).value = "";
					document.getElementById(("passengerName" + requestType + indx)).value = "";
					document.getElementById(("passengerAge" + requestType + indx)).value = "";
					removePaxRow(requestType, indx, tblId);
					return false;
				}
				document.getElementById(("genderCodeId" + requestType + indx)).value = FEMALE_ID;
				removeComboItems(document.getElementById(("genderCodeId" + requestType + indx)));
				fvs = document.getElementById("femaleSeatSpanId" + requestType);
				if(fvs != null) {
					fvs.innerHTML = tmsg;
					fvs.className = "errormsg";
				}
			}
			if(sLdy != null && sLdy.value == "1") {
				var fOb = document.getElementById(("genderCodeId" + requestType + indx));
				if(fOb != null) {
					fOb.value = FEMALE_ID;
					removeComboItems(fOb);
				}	
			}
			document.getElementById(("seatDetails" + requestType + indx)).value = seatNumber;
			indx = indx + 1;			
		}
	}
	// calculateTotalFare(requestType);
	document.getElementById("currSeatIndex" + requestType).value = indx;
	
	 var radioboxes = document.getElementsByName('accomodationId');
     
         for (var i = 0; i < radioboxes.length; i++) {
             if (radioboxes[i].type == 'radio') {
            	 radioboxes[i].checked = false;
             }      
         }
}


function calculateBalance(collectedAmt) {
	var balanceObj = document.getElementById("BalanceAmtId");
	
	if(collectedAmt == "") 
		collectedAmt = 0.00;
	var prevTotalVal = 0.00;
	if(document.getElementById("totalAmount") != null) {
		prevTotalVal = parseFloat(document.getElementById("totalAmount").value);
	}
	var balancePrice = parseFloat(collectedAmt) - parseFloat(document.getElementById("grandTotal").value) + prevTotalVal;
	
	balanceObj.innerHTML = balancePrice.toFixed(2); 
	if(balancePrice >= 0) {
		balanceObj.className = "greenBgColor";
		document.getElementById("SavePassengersBtn").disabled = "";
	} else {
		balanceObj.className = "redFontColor";
		document.getElementById("SavePassengersBtn").disabled = "disabled";
	}
}
function hideBookingLayout() {
	hideDivision("ShowLayoutDiv");
	hideDivision("ShowReturnLayoutDiv");
}
function validateBookingForm(requestType) {
	var size = 10; 
	// set seat details and calculate total price details
	var ageObj, seatObj, nm, ad, genderObj,nationalityObj; 
	ad = false;
	var pax = 0;
	for(var i=0; i<size; i++) {
		nm = document.getElementById(("passengerName" + requestType + i));
		ageObj = document.getElementById(("passengerAge" + requestType + i));
		seatObj = document.getElementById(("seatDetails" + requestType + i));
		genderObj = document.getElementById(("genderCodeId" + requestType + i));
		if(seatObj == null) { continue; }
		
		if(genderObj != null && genderObj.value != '24' && genderObj.value != '25'){
			alert("Please select gender.");
			genderObj.focus();
			return false;
		}
		if(document.getElementById(("categoryCodeId" + requestType + i)).value == ADULT_ID) {
			ad = true;
		}
		if(seatObj.value == "") {
			alert("Please select " + size + " number of seat(s).");
			ageObj.focus();
			return false;
		} else if(ageObj.value == "") {
			alert("Please enter passenger age.");
			ageObj.focus();
			return false;
		} else if(nm.value == "") {
			alert("Please enter passenger name.");
			nm.focus();
			return false;
		}
		nationalityObj=document.getElementById(("nationality" + requestType + i));
		if(nationalityObj!= null) {
			if(nationalityObj.value!='IN'){
				return foreignPassengerValidation(requestType + i)
			}
		}
		
		++pax;
	}
	document.getElementById("currSeatIndex" + requestType).value = pax;
	if(ad == false) {
		alert("Atleast one adult passenger is required to continue.");
		return false;
	}
	return true;
}

function foreignPassengerValidation(reqType){
	var passportObj,addressObj,dobObj;
	passportObj=document.getElementById('passportNo'+reqType);
	addressObj=document.getElementById('foreignerAddress'+reqType);
	dobObj=document.getElementById('dob'+reqType);
	if(passportObj!= null && passportObj.value==""){
		alert("Please Enter Passport No.");
		passportObj.focus();
		return false;
	}else if(addressObj!= null && addressObj.value==""){
		alert("Please Enter Address.");
		addressObj.focus();
		return false;
	} else if(dobObj!= null && dobObj.value==""){
		alert("Please Select DOB.");
		dobObj.focus();
		return false;
	} else{
		return true;
	}
}

function validateMandatoryFields() {
	var inputArray = document.getElementsByTagName("input");
	var size = inputArray.length;
	// validate form here
	for(var i = 0; i < size; i++) {
		if(inputArray[i].type == "text"
			&& inputArray[i].className == 'requiredfield' 
			&& inputArray[i].value == '') {
			alert("Please fill the required fields to continue.");
			return false;
		}
	}
	return true;
}

function validateSubmitBookingLayout() {
	// validate Mobile number
	var txtObj = document.getElementById("mobileNo");
	var val = "";
	var msg = "";
	
	if(!validateMobileNo(txtObj)) {
		return false;
	}
	
	// validate Passenger Name for 150 characters
	txtObj = document.getElementById("bookedByName");
	val = txtObj.value;
	if(val.length > 100) msg = "The Passenger Name   can not be more than 100 characters.";
	else if(LTrim(RTrim(val)).length < 1) 
		//msg = "Please enter valid Passenger Name.";
	
	if(msg != "") {
		alert(msg);
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("email");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter valid email address.");
		txtObj.focus();
		return false;
	}
	
	// validate Address field for 100 characters
	txtObj = document.getElementById("address");
	if(txtObj != null) {
		val = txtObj.value;
		msg = "Address can not be more than 100 characters.";
		if(val.length > 100) {
			alert(msg);
			txtObj.focus();
			return false;
		}
	}
	txtObj = document.getElementById("cardNumber");
	if(txtObj != null && RTrim(LTrim(txtObj.value)) == "") {
		alert("Please enter card number.");
		txtObj.focus();
		return false;
	}
	if(!validateBookingForm("Forward")) return false;
	if(!checkWLSeatsOrder("Forward")) return false;
	
	var txtObj = document.getElementById("totalAmount");
	if(txtObj != null) {
		document.getElementById("oldBookingAmt").value = txtObj.value;
		var grandTotal = parseFloat(document.getElementById("grandTotal").value);
		grandTotal = grandTotal - parseFloat(txtObj.value);
		document.getElementById("collectedAmt").value = grandTotal.toFixed(2);
	}
	
	var fwCurIdx = 0,  rtCurIdx = 0;
	
	fwCurIdx = parseInt(document.getElementById("currSeatIndexForward").value);
	if(document.getElementById("currSeatIndexReturn") != null) {
		rtCurIdx = parseInt(document.getElementById("currSeatIndexReturn").value);
		if(!checkWLSeatsOrder("Return")) return false;
		
		if(!validateBookingForm("Return")) {
			return false;
		}
		if(fwCurIdx != rtCurIdx) {
			alert("Please select same number of seats in Onward and return journey.");
			return false;
		}
	}
	return true;
}

function bookingFormSubmitAction(path, formObj) {
	if(!validateSubmitBookingLayout()) {
		return false;
	}
	
 	var ob = document.getElementById("copyPaxChk");
 	if(ob != null) {
		populatePaxDetails(true);
	}
	formObj.action = path;
	formObj.submit();
}

function addDay(dtVal, days) {
    var curDate;
    var dateObj;
	
	curDate = getDateObj(new Date());
	
    if(dtVal == 'Depart On') {
    	return curDate;
    }
	
    var dtAr = dtVal.split("/");
	var yy = parseInt(dtAr[2]);
	var mm = parseInt(dtAr[1]) - 1;
	var dd = parseInt(dtAr[0]);
	dateObj = new Date(yy, mm, dd); // year, month, day
	dateObj.setDate(dateObj.getDate() + days);
	dateObj = getDateObj(dateObj);
	
	if (dateObj >= curDate) {
        // alert("Date Obj is greather then equal to Current Date.");
    	return dateObj;
    } else {
      // alert("Date Two is greather then Date One.");
    }
    return dateObj;
}

function padDt(s) { 
	return (s < 10) ? '0' + s : s; 
}

function getDateObj(d) {
	return [padDt(d.getDate()), padDt(d.getMonth()+1), d.getFullYear()].join('/');
}

function convertDateStr(dateObj) {
	return getDateObj(dateObj);
}

function refineSearchResults(days) {
	var contextPath = document.getElementById("contextPath").value;
	var path = contextPath + '/avail/services.do';
	
	var ob = document.getElementById("txtJourneyDate");
	formObj = ob.form;
	
	var t = "";
	if(ob != null) {
		t = addDay(ob.value, days);
		
		if(t == null) {
			return false;
		}
		ob.value = t;
	}
	
	ob = document.getElementById("txtReturnJourneyDate");
	
	if(ob != null && ob.value != "" && ob.value != 'Date Of Return') {
		t = addDay(ob.value, days);
		if(t != null) {
			ob.value = t;
		}
		
	}
	validateBookingSearch(formObj, path);
}

function getSingleLady() {
	var slady = "";
	
	var sob = document.getElementById("singleLady");
	
	if(sob != null && sob.value != '' && sob.checked == true) {
		sob.value = "1";
		slady = sob.value;
		if(document.getElementById("adultMale") != null) 
			document.getElementById("adultMale").value = 0;
		if(document.getElementById("adultFemale") != null)
			document.getElementById("adultFemale").value = o.value;
		if(document.getElementById("childMale") != null)
			document.getElementById("childMale").value = 0;
		if(document.getElementById("childFemale") != null)
			document.getElementById("childFemale").value = 0;
	} else if(sob != null) {
		sob.value = "0";
	}
	return slady;
}

function validateBookingSearch(formObj, path) {
	var txtObj;
	var t;
	txtObj = document.getElementById("fromPlaceName");
	if(txtObj.value == "" || txtObj.value == "0" || txtObj.value == "Leaving From:") {
		alert("Please select start place.");
		return false;
	}
	var sLady = getSingleLady();
	t = txtObj.value;
	txtObj = document.getElementById("toPlaceName");
	if(txtObj.value == "" || txtObj.value == "0" || txtObj.value == "Going To:") {
		alert("Please select end place.");
		return false;
	}
	
	if(t == txtObj.value) {
		alert("End Place cannot be same as Start Place.");
		return false;
	}
	if(document.getElementById("adultMale") != null)
		adultMale = document.getElementById("adultMale").value;
	
	if(document.getElementById("txtJourneyDate") != null)
		t = document.getElementById("txtJourneyDate").value;
	
	if(t != null && t != "" && !validateDate(t)) {
		// alert("Please select a valid Journey Date to continue.");
		$('#txtJourneyDate').datepicker("show");
		return false;
	}
	if(document.getElementById("txtReturnJourneyDate") != null)
		t = document.getElementById("txtReturnJourneyDate").value;
	
	if(t == null || t == "" || t == "Date Of Return") {
		document.getElementById("txtReturnJourneyDate").value = "";
	} else if(t != null && t != "" && !validateDate(t)) {
		// alert("Please select a valid Journey Date to continue.");
		$('#txtReturnJourneyDate').datepicker("show");
		return false;
	}
	
	// for offline time table modify search, clearning the selected service from booknow
	if(document.getElementById("serviceId")!=null && document.getElementById("serviceId").value !=null) {
		document.getElementById("serviceId").value = "";
	}
	
	formObj.action = path;
	formObj.submit();
}

function submitTrack(formObj,path) {
	
	txtObj = document.getElementById("id");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Ticket Number value");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("uidNumber");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter UID Number");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("mobileNo");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Mobile Number");
		txtObj.focus();
		return false;
	}
	formObj.action = path;
	formObj.submit();
}

function showCancelTicket() {
	
	var divName = 'BookedTicketsDivId';
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
	var path =  "/ajax/cancel/details/load.do?searchType=0"
				+ "&pnrPrefixWithTktNo=" + pnr
				+ "&id=" +id
				+ "&uidNumber=" + document.getElementById("uidNumber").value
				+ "&mobileNo=" + document.getElementById("mobileNo").value
				+ "&wlTktValidate="+ document.getElementById("wlTktValidate").value
				+ "&wlTktTransfer="+ document.getElementById("wlTktTransfer").value;
				;
	var txtObj = document.getElementById("pnrPrefixWithTktNo");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Ticket Number");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("uidNumber");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Txn. Password");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("mobileNo");
	if(!validateMobileNo(txtObj)) {
		return false;
	}
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function validateAgeField(txtObj, actType, idx) {
	if(!isNumber(txtObj)) {
		return false;
	}
	var max = parseInt(document.getElementById("maxAgeCh").value);
	var age = parseInt(txtObj.value);
	var id = 0;
	
	if(age > max) {
		document.getElementById("categoryCodeId" + actType + idx).value = ADULT_ID;
	} else {
		document.getElementById("categoryCodeId" + actType + idx).value = CHILD_ID;
	}
	if(document.getElementById("categoryCodeId" + actType + idx) != null) {
		id = document.getElementById("categoryCodeId" + actType + idx).value;
	}
	if(CHILD_ID == id && age > max) {
		alert("Child age must be less than or equal to " + max + " years.");
		txtObj.value = "";
		return false;
	} else if(ADULT_ID == id && age <= max){
		alert("Adult age must be greater than " + max + " years.");
		txtObj.value = "";
		return false;
	}
	var minAge = parseInt(document.getElementById("minConcAge").value);
	if(minAge > age) {
		var concTxt = getSelectedTextInCombo('concessionId');
		alert("Minimum Age for " +  concTxt + " should be " + minAge + " years.");
		txtObj.value = "";
		return false;
	}
	var destName = "passengerName" + actType + (parseInt(idx) + 1);
	maxLengthMoveToDest(txtObj.value, 2, destName);
}

function setThisValueTo(destName, sourceObj) {
	var destObj = document.getElementById(destName);
	if(destObj != null) {
		destObj.value = sourceObj.value;
	}
}
function hideMessages() {
	hidediv('errorMsg');
	hidediv('successmsg');
}

function submitRepeatBooking(formObj) {
	document.getElementById("repeat").value = '1';
	formObj.submit();	
}
function showRepeatBookingLayout() {
	if(document.getElementById("repeat").value == '1'
		&& document.getElementById("serviceId").value != "") {
		document.getElementById("repeat").value = '0';
		document.getElementById("aType").value = "search";
		getAvailableServiceList('/booking/specific/search.do?aType=search');
	}
}
function showFareTypeScheduleDiv(val) {
	if(val == '0') {
		hidediv('fareTypeScheduleDivId');
	} else {
		showdiv('fareTypeScheduleDivId');
		setSelectedDays('0');
	}
}
function showMinTravelDistanceScheduleDetail(val) {
	if(val == '' || parseFloat(val) <= 0.00) {
		hidediv('minTravelScheduleDivId');
	} else {
		showdiv('minTravelScheduleDivId');
		checkSelectedDayDetails('0', 'minDay_');
	}
}
function submitBookingForm(param) {
	if(param == '') {
		hidediv('ForwardAvailableServicesDiv');
		hidediv('ReturnAvailableServicesDiv');
		hidediv('buttonsDivId');
		showdiv('loginPageDivId');
	} else {
		document.getElementById("bookingsForm").submit();
	}
}
function pgSubmitAction(path, formObj) {
	var pgObj;
	var pgchk = false;
	for(var i=1; i<=3; i++) {
		pgObj = document.getElementById(("pgId"+i));
		if(pgObj == null) {
			break;
		} else if(pgObj.checked == true) {
			pgchk = true;
			break;
		}
	}
	if (pgchk) {
		alert("Please select payment gateway to continue.");
		return false;
	}
	if(!document.getElementById('walletChk') || document.getElementById('walletChk').checked == false) {
		if (!document.getElementById("pgId") || document.getElementById("pgId").value=="" || document.getElementById("pgId").value=="0") {
			alert("Please select payment gateway to continue.");
			return false;
		}
	}
	if(document.getElementById("termsChk").checked == false) {
		alert("Please accept terms and conditions.");
		return false;
	}
	if(document.getElementById("isLinkTicket") && document.getElementById("isLinkTicket").value=="1") {
		formObj.action = path +"?isLinkTicket="+document.getElementById("isLinkTicket").value;
	}else {
		formObj.action = path;
	}
	formObj.submit();
	
}
function printTickets(formObj) {
	printPageByDiv("TktPrintDivID_0");
	divObj = document.getElementById("TktPrintDivID_1");
	setTimeout(function() {
	if(divObj != null) {
		printPageByDiv("TktPrintDivID_1");
	}}, 1000);
}
function divFlipFlop(divName, obj) {
	var dObj = document.getElementById(divName);
	var v = dObj.style.display;
	if(v == null || v == '' || v == 'none' || !(v)) {
		obj.className = 'modifyBkgSelect';
		dObj.style.display = 'block';
	}
	/* else {
		obj.className = 'modifyBkgCS';
		dObj.style.display = 'none';
	}*/
	//hidediv('fwInfoLeftId');
	if(document.getElementById('fwInfoLeftId')) {
		document.getElementById('fwInfoLeftId').setAttribute("style","visibility: hidden;");
	}
	
	
	//hidediv('retInfoLeftId');
	if(document.getElementById('retInfoLeftId')) {
		document.getElementById('retInfoLeftId').setAttribute("style","visibility: hidden;");
	}
	
	hidediv('ForwardAvailableServicesDiv');
	hidediv('ReturnAvailableServicesDiv');
	if(document.getElementById("LogingModSearchId")!=null){
		showdiv('favoritesDivID');
	}
	var tatkalFlag =  false;
	var isTatkalEnabled=document.getElementById("isTatkalEnabled").value;
	if(isTatkalEnabled=='true'){
		tatkalFlag=document.getElementById("tatkalFlag").checked ;
	}
	
	if(tatkalFlag) {
		document.getElementById("txtReturnJourneyDate").setAttribute("style","opacity: 0.5;pointer-events: none;cursor: default;");
	}else {
		if(document.getElementById("txtReturnJourneyDate")) {
			document.getElementById("txtReturnJourneyDate").removeAttribute("style");
		}
		
	}
}
function setAccomodationDetails(actName, id,accomType,seatType) {
	//document.getElementById(("facilityId" + actName)).value = id;
	//document.getElementById(("acFlag" + actName)).value = ac;
	size=0;
	seats = 0;
	var rows=0;
	var columns=0;
	var level= 0;
	var facility= new Array();
	
	if(document.getElementById('rows' + actName) != null){
		rows = document.getElementById('rows' + actName).value;
	}
	if(document.getElementById('columns' + actName) != null){
		columns = document.getElementById('columns' + actName).value;
	}
	if(document.getElementById('numberOfLevels' + actName) != null){
		level = document.getElementById('numberOfLevels' + actName).value;
	}
	
	size = rows * columns * level;
	for ( var i = 1; i <= size; i++) {
	seat = document.getElementById(actName + i);
		if(seat != null){
			if(seat.classList.contains('selectedSeatClass'+seatType)){
				seats = seats + 1;
			}
		}

	}

	if(seats == 0 || !((seats % accomType) == 0)){	
		if(document.getElementById('accomodationId' + actName+id)){
			document.getElementById('accomodationId' + actName+id).checked = false;
		}
		if(document.getElementById(actName+'FacilityId') != null){
			document.getElementById(actName+'FacilityId').value = 0;
		}
		alert("Selected no.of seats are not suitable for Facility");
	}else{
		if(document.getElementById('facilityId'+actName) != null && document.getElementById('facilityId'+actName).value != ""){
			if(document.getElementById('accomodationId'+actName+id).checked) {
				var facId = document.getElementById('accomodationId'+actName+id).value;
				document.getElementById('facilityId'+actName).value += facId+",";
			}
			if(!document.getElementById('accomodationId'+actName+id).checked) {
				if(document.getElementById('facilityId'+actName).value.includes(document.getElementById('accomodationId'+actName+id).value)) {
					document.getElementById('facilityId'+actName).value = document.getElementById('facilityId'+actName).value.replace(document.getElementById('accomodationId'+actName+id).value+",", '');
				}
				
			}
			
		} else if(document.getElementById('facilityId'+actName) != null){
			document.getElementById('facilityId'+actName).value = id+',';
		}
	}	
	
	/*if(price !=''){
		facilityPrice = price;
		calculateTotalFare(actName);
	} else {
		facilityPrice = 0;
		calculateTotalFare(actName);
	}
	/*if(id == '') {
		document.getElementById("acmdtPrice" + actName).value = 0.00;
	}*/
}
function displaySelectedSearchPage(val) {
	autocompletePlace("#fromPlaceName","#startPlaceId");
	autocompletePlace("#toPlaceName","#endPlaceId");
	
	$('#txtJourneyDate').datepicker({ numberOfMonths: 1
			, dateFormat: 'dd/mm/yy'
			, minDate: '0'
			, maxDate: "+30d"
			,  onSelect: function(selected) {$("#txtReturnJourneyDate").datepicker("option","minDate", selected);}
			}).val();
	
	$('#txtReturnJourneyDate').datepicker({ numberOfMonths: 1
			, dateFormat: 'dd/mm/yy'
			, minDate: '0'
			, maxDate: "+30d" 
			
		}).val();

	
	setHelpText('Leaving From:', 'fromPlaceName');
	setHelpText('Going To:', 'toPlaceName');
}
function submitUserForm(formObj){
	var user = document.getElementById("error");
	if(user != null) { 
		if(user.value == 'true') {
			alert("Login Name Already Exist!");
			return false;
		}
	}
	var email = document.getElementById("flag");
	if(email != null) { 
		if(email.value == 'true') {
	    	alert("Email ID Already Exist!");
	    	return false;	
	    }
    }
	formObj.submit();
}
function populatePaxDetails(chk) {
	var oj = 'Forward';
	var rt = 'Return';
	var indx = parseInt(document.getElementById("currSeatIndex" + rt).value);
    var curIdx = 0;    
	for(var i = 0; i < 10 ; i++) {
		if(document.getElementById("categoryCodeId" + rt + i) != null
			&& document.getElementById("categoryCodeId" + oj + i) != null) {
			if(chk == true) {
				console.log("Forward value of Passenger Name... "+document.getElementById("passengerName" + oj + i).value);
				
				document.getElementById("categoryCodeId" + rt + i).value = document.getElementById("categoryCodeId" + oj + i).value;
				document.getElementById("genderCodeId" + rt + i).value = document.getElementById("genderCodeId" + oj + i).value;
				document.getElementById("passengerName" + rt + i).value = document.getElementById("passengerName" + oj + i).value;
				document.getElementById("passengerAge" + rt + i).value = document.getElementById("passengerAge" + oj + i).value;	
				
				console.log("Return value of Passenger Name ..."+document.getElementById("passengerName" + rt + i).value );
			}  else {
				document.getElementById("passengerName" + rt + i).value = "";
				document.getElementById("passengerAge" + rt + i).value = "";
				
			}
			document.getElementById("categoryCodeId" + rt + i).value = document.getElementById("categoryCodeId" + oj + i).value;
			curIdx++;
		}
		if(curIdx == indx)  {
			break;
		}
	}//  end of for loop
	// calculateTotalFare(rt);
}

function populateEachPaxDetails(indx) {
	var oj = 'Forward';
	var rt = 'Return';
	var indxselected = indx;
    var curIdx = 0;    
    for(var indx = 0; indx <=  indxselected ; indx++) {
		if(document.getElementById("categoryCodeId" + rt + indx) != null
			&& document.getElementById("categoryCodeId" + oj + indx) != null) {
			
				document.getElementById("categoryCodeId" + rt + indx).value = document.getElementById("categoryCodeId" + oj + indx).value;
				document.getElementById("genderCodeId" + rt + indx).value = document.getElementById("genderCodeId" + oj + indx).value;
				document.getElementById("passengerName" + rt + indx).value = document.getElementById("passengerName" + oj + indx).value;
				document.getElementById("passengerAge" + rt + indx).value = document.getElementById("passengerAge" + oj + indx).value;				

				document.getElementById("categoryCodeId" + rt + indx).value = document.getElementById("categoryCodeId" + oj +indx).value;
				if(document.getElementById("dob" + oj +indx)!=null){
					
					var hiddenForeignerId=document.getElementsByClassName('hiddenForeignerId');
					while (hiddenForeignerId.length) hiddenForeignerId[0].classList.remove("hiddenForeignerId");
					
					
				document.getElementById("dob" + rt + indx).value = document.getElementById("dob" + oj +indx).value;
				document.getElementById("passportNo" + rt + indx).value = document.getElementById("passportNo" + oj +indx).value;
				document.getElementById("foreignerAddress" + rt + indx).value = document.getElementById("foreignerAddress" + oj +indx).value;
				document.getElementById("nationality" + rt + indx).value = document.getElementById("nationality" + oj +indx).value;
				}
				disabledReturnPaxInfo(rt + indx);
				
			curIdx++;
		}
}
	// calculateTotalFare(rt);
}
function disabledReturnPaxInfo(rtIndx){
	document.getElementById("genderCodeId" + rtIndx).readOnly=true;
	document.getElementById("passengerName" + rtIndx).readOnly=true;
	document.getElementById("passengerAge" + rtIndx).readOnly=true;
	if(document.getElementById("dob" + rtIndx)!=null){
	document.getElementById("dob" + rtIndx).readOnly=true;
	document.getElementById("passportNo" +rtIndx).readOnly=true;
	document.getElementById("foreignerAddress" + rtIndx).readOnly=true;
	document.getElementById("nationality" + rtIndx).readOnly=true;
	}
}
function populateLinkEachPaxDetails(indx) {
	var oj = 'Start';
	var rt = 'End';
    var curIdx = 0;    
		if(document.getElementById("categoryCodeId" + rt + indx) != null
			&& document.getElementById("categoryCodeId" + oj + indx) != null) {
			
				document.getElementById("categoryCodeId" + rt + indx).value = document.getElementById("categoryCodeId" + oj + indx).value;
				document.getElementById("genderCodeId" + rt + indx).value = document.getElementById("genderCodeId" + oj + indx).value;
				document.getElementById("passengerName" + rt + indx).value = document.getElementById("passengerName" + oj + indx).value;
				document.getElementById("passengerAge" + rt + indx).value = document.getElementById("passengerAge" + oj + indx).value;				

				document.getElementById("categoryCodeId" + rt + indx).value = document.getElementById("categoryCodeId" + oj +indx).value;
			curIdx++;
		}
	// calculateTotalFare(rt);
}

function showNewsDiv(subect,i) {
	var dv = document.getElementById('nwDiv');
	dv.style.display = 'block';
    dv.style.opacity = 2;
    var btn = "<a haref=# class=nwsHrefCs onclick=hidediv(\'nwDiv\')>close x</a>";
	var aTxt = "<table class=newsbodyTbl><tr><td>" + btn + "</td></tr>"
			+ "<tr><td class=newsSubject>" + document.getElementById("subjectCode"+i).innerHTML+ "</td>"
			+ "<tr><td>"+ document.getElementById("textMessage"+i).innerHTML 
			+ "</td></tr></table>" ;
	dv.innerHTML = aTxt ;
}
function showClassification() {
	var s = document.getElementById("classTextDiv").className;
	
	if(s == 'showClasTxt') {
		s = "hideClasTxt";
	} else {
		s = "showClasTxt";
	}
	document.getElementById("classTextDiv").className = s;
}
function changeDivClss(id,s) {
	document.getElementById(id).className = s;
}
function showfac(a) {
	var s = document.getElementById(a).className;
	if(s == 'showClasTxt') {
		s = "hideClasTxt";
	} else {
		s = "showClasTxt";
	}

	document.getElementById(a).className = s;
}

function confirmCancellation(path, formObj) {
	var a = confirm("ALERT: Do you want to cancel the ticket?");
	if (a) {
		submitFormAction(path, formObj);
	}
}
/** DOM PRINTER END * */
/** AutoComplete place details **/
function autocompletePlace(ele,dataEle) {
	$(ele).autocomplete({
	    source: jsondata,
	    minLength: 3,
	    autoFocus: true,
	    select: function (event, ui) { 
	        $(ele).val( ui.item.value );
	        $(dataEle).val(ui.item.id);	 
	    }
	});	
}

function autocomplete(ele,dataEle,data) {
	$(ele).autocomplete({
	    source: data,
	    autoFocus: true,
	    select: function (event, ui) { 
	        $(ele).val( ui.item.value );
	        $(dataEle).val(ui.item.id);	 
	    }
	});	
}
function resetTxt(o, v) {
	if(o != null) {
		o.value = v;
	}
	$('#txtJourneyDate').datepicker({ numberOfMonths: 2
		, dateFormat: 'dd/mm/yy'
		, minDate: '0'
		, maxDate: "+30d"
		}).val();
}
function clearHelpText(txt, name) {
	var temp = new Array();
	temp = txt.split(",");
	var obj = document.getElementById(name);
	var cs = obj.className;
	if(cs == 'placesRequired') {
		cs = cs.replace("placesRequiredGray",  "placesRequired");
		obj.className = cs;
	}
	if(obj.value == txt) {
		obj.value = '';
	}
	if (obj.value == temp[0] || (temp.length > 1 && obj.value == temp[1])) {
		obj.value = '';
	}
}

function setHelpText(txt, name) {
	var obj = document.getElementById(name);
	if(obj) {
		var cs = obj.className;
	}
	if(cs == 'placesRequiredGray') {
		cs = cs.replace("placesRequired",  "placesRequiredGray");
		obj.className = cs;
	}
	if(obj) {
		if(obj.value == '') {
			obj.value = txt;
		}	
	}
}
/* For package tours display */
function showDetailsPack(showId) {
	hidediv("maintableId");
	hidediv("srisailDivId");
	hidediv("arakuDivId");
	hidediv("niamDivId");
	hidediv("hanumaDivId");
	hidediv("hydDivId");	
	hidediv("kadapaDivId");
	hidediv("yaganDivId");
	hidediv("lepakDivId");
	hidediv("nachDivId");
	hidediv("tiruDivId");
	hidediv("basaraDivId");
	showdiv(showId);
	showdiv("buttonId");
}

function showMainPack() {
	showdiv("maintableId");
	//hidediv("papiDivId");
	hidediv("kaniDivId");
	hidediv("srisailDivId");
	hidediv("arakuDivId");
	hidediv("niamDivId");
	/*hidediv("hanumaDivId");
	hidediv("kadapaDivId");
	hidediv("hydDivId");
	hidediv("kadapaDivId");
	hidediv("yaganDivId");
	hidediv("lepakDivId");
	hidediv("nachDivId");
	hidediv("tiruDivId");
	hidediv("basaraDivId");
	hidediv("buttonId");*/
}
function calendarMnYrSelect(id) {
	$('#'+id).datepicker({ numberOfMonths: 1, dateFormat: 'dd/mm/yy', changeMonth: true
	, changeYear: true, yearRange: '1945:2030'}).val();
}

function populateSearch(fId,fnm,tId,tnm) {
	var ob = document.getElementById("startPlaceId");
	if(ob != null) {
		ob.value = fId;
	}
	ob = document.getElementById("fromPlaceName");
	if(ob != null) {
		ob.value = fnm;
	}
	
	ob = document.getElementById("endPlaceId");
	if(ob != null) {
		ob.value = tId;
	}
	ob = document.getElementById("toPlaceName");
	if(ob != null) {
		ob.value = tnm;
	}
	$("#txtJourneyDate").datepicker('show');
}
function removePaxRow(act, idx, divId) {

	$('#'+ act +  idx + "tr" ).detach();
}

function addNewPaxRow(act, idx, divId, tdId, seatIndx, seatType) {
	var _rEle;
	var nStr = act + idx ;
	if(document.getElementById('nationality')!=null){
		
		var countriesListOptions=document.getElementById('nationality').innerHTML;
		
		if(document.getElementById('concessionId').value!='1466060086837'){
			_rEle = '<tr id="' + nStr + "tr" + '"><td>' 
			+ '<input type="hidden" name="categoryCodeId" id="categoryCodeId' + nStr + '" value="'+ ADULT_ID +'" />'
			+ '<select name="genderCodeId" id="genderCodeId' + nStr + '" class="requiredfield">'
			+ '<option value="">Select One</option>'
			+ '<option value="24">MALE</option>'
			+ '<option value="25">FEMALE</option>'
			+ '</select>'
		+ '</td><td>'
			+ '<input type="text" name="passengerName" id="passengerName' + nStr + '" maxlength="150" size="16" class="requiredfield" onkeyup="validateAlphabet(this, this.name);">'
		+ '</td>'
		+ '<td>'
			+ '<input type="text" name="passengerAge" id="passengerAge' + nStr + '" maxlength="2" size="2" class="requiredfield" onblur="validateAgeField(this, \'' + act + '\', \''+idx+'\');">'
		+ '</td>'
		+ '<td>'
			+ '<input type="text" name="seatDetails" id="seatDetails' + nStr + '" size="1" class="seatNormalField" readonly="readonly">'
		+ '</td>'
		+ '<td>'
		+ '<select name="nationality" id="nationality'+nStr+'" onchange="enabledPassPortNo(\'' + nStr + '\')" class="requiredfield b-d-point-select" style="opacity: 0.5;pointer-events: none;cursor: default;">'
		+countriesListOptions+
		+'</select>'
		+ '</td>'
		+ '<td class="hiddenForeignerId hiddenForeigner">'
		+ '<input type="text" name="passportNo" id="passportNo'+nStr+'"  size="15"  maxlength="20"   readonly="readonly" class="requiredfield"/>'						
		+ '</td>'
		+ '<td  class="hiddenForeignerId hiddenForeigner">'     
		+ '<textarea name="foreignerAddress" id="foreignerAddress'+nStr+'"  maxlength="100" rows="3" cols="30"  readonly="readonly" wrap="hard" class="requiredfield" style="width: 170px;"/>'
		+'</td>'						
		+ '<td align="left" valign="top" width="15%"  class="hiddenForeignerId hiddenForeigner">'						
		+ '<input type="text" name="dob"  id="dob'+nStr+'"	class="calOnward requiredfield" id="dob'+nStr+'" size="11" maxlength="10" value=""  readonly="readonly"   /> '
		+'</td>'
		+ '</tr>'
	;
		}
		else{
			_rEle = '<tr id="' + nStr + "tr" + '"><td>' 
			+ '<input type="hidden" name="categoryCodeId" id="categoryCodeId' + nStr + '" value="'+ ADULT_ID +'" />'
			+ '<select name="genderCodeId" id="genderCodeId' + nStr + '" class="requiredfield">'
			+ '<option value="">Select One</option>'
			+ '<option value="24">MALE</option>'
			+ '<option value="25">FEMALE</option>'
			+ '</select>'
		+ '</td><td>'
			+ '<input type="text" name="passengerName" id="passengerName' + nStr + '" maxlength="150" size="16" class="requiredfield" onkeyup="validateAlphabet(this, this.name);">'
		+ '</td>'
		+ '<td>'
			+ '<input type="text" name="passengerAge" id="passengerAge' + nStr + '" maxlength="2" size="2" class="requiredfield" onblur="validateAgeField(this, \'' + act + '\', \''+idx+'\');">'
		+ '</td>'
		+ '<td>'
			+ '<input type="text" name="seatDetails" id="seatDetails' + nStr + '" size="1" class="seatNormalField" readonly="readonly">'
		+ '</td>'
		+ '<td>'
		+ '<select name="nationality" id="nationality'+nStr+'" onchange="enabledPassPortNo(\'' + nStr + '\')" class="requiredfield b-d-point-select" >'
		+countriesListOptions+
		+'</select>'
		+ '</td>'
		+ '<td class="hiddenForeignerId hiddenForeigner">'
		+ '<input type="text" name="passportNo" id="passportNo'+nStr+'"  size="15"  maxlength="20"   readonly="readonly" class="requiredfield"/>'						
		+ '</td>'
		+ '<td  class="hiddenForeignerId hiddenForeigner">'     
		+ '<textarea name="foreignerAddress" id="foreignerAddress'+nStr+'"  maxlength="100" rows="3" cols="30"  readonly="readonly" wrap="hard" class="requiredfield" style="width: 170px;"/>'
		+'</td>'						
		+ '<td align="left" valign="top" width="15%"  class="hiddenForeignerId hiddenForeigner">'						
		+ '<input type="text" name="dob"  id="dob'+nStr+'"	class="calOnward requiredfield" id="dob'+nStr+'" size="11" maxlength="10" value=""  readonly="readonly"   /> '
		+'</td>'
		+ '</tr>'
	;
		}
		
	
	
	
		
	$('#'+divId+' tr:last').after(_rEle);
	}else{
		_rEle = '<tr id="' + nStr + "tr" + '"><td>' 
		+ '<input type="hidden" name="categoryCodeId" id="categoryCodeId' + nStr + '" value="'+ ADULT_ID +'" />'
		+ '<select name="genderCodeId" id="genderCodeId' + nStr + '" class="requiredfield">'
		+ '<option value="">Select One</option>'
		+ '<option value="24">MALE</option>'
		+ '<option value="25">FEMALE</option>'
		+ '</select>'
	+ '</td><td>'
		+ '<input type="text" name="passengerName" id="passengerName' + nStr + '" maxlength="150" size="16" class="requiredfield" onkeyup="validateAlphabet(this, this.name);">'
	+ '</td>'
	+ '<td>'
		+ '<input type="text" name="passengerAge" id="passengerAge' + nStr + '" maxlength="2" size="2" class="requiredfield" onblur="validateAgeField(this, \'' + act + '\', \''+idx+'\');">'
	+ '</td>'
	+ '<td>'
		+ '<input type="text" name="seatDetails" id="seatDetails' + nStr + '" size="1" class="seatNormalField" readonly="readonly">'
	+ '</td>'
	+ '</tr>'
;

$('#'+divId+' tr:last').after(_rEle);
	}
}

function enabledPassPortNo(objTxt){
	if(document.getElementById('nationality'+objTxt).value!='IN'){
		
		var hiddenForeignerId=document.getElementsByClassName('hiddenForeignerId');
		while (hiddenForeignerId.length) hiddenForeignerId[0].classList.remove("hiddenForeignerId");
		
		/*var hiddenForeignerId=document.getElementsByClassName('hiddenForeignerId');
		
		for(var k=0;k<hiddenForeignerId.length;k++){
			hiddenForeignerId[k].classList.remove("hiddenForeignerId");
		}*/
		
		document.getElementById('passportNo'+objTxt).removeAttribute('readonly');
		document.getElementById('foreignerAddress'+objTxt).removeAttribute('readonly');
		document.getElementById('dob'+objTxt).removeAttribute('readonly');
		
		 $('#dob'+objTxt).datepicker({
			    defaultDate: "+1w",
			    changeMonth: true,
			    changeYear: true,
			    dateFormat: "dd/mm/yy",
			    maxDate: serverdate,
			   // minDate: dateToday
			   // maxDate: dateMaxDay  
			})
			return false;
			
	}
	else {
		
		
		document.getElementById('foreignerAddress'+objTxt).setAttribute('readonly','readonly');
		document.getElementById('passportNo'+objTxt).setAttribute('readonly','readonly');
		document.getElementById('dob'+objTxt).setAttribute('readonly','readonly');
		
		document.getElementById('foreignerAddress'+objTxt).classList.add("hiddenForeignerId");
		document.getElementById('passportNo'+objTxt).classList.add("hiddenForeignerId");
		document.getElementById('dob'+objTxt).classList.add("hiddenForeignerId");
		
		var objTxt=objTxt;
		var nationObjects=document.querySelectorAll("[id*='nationality"+objTxt.substring(0,objTxt.length-1)+"']");
		var len=nationObjects.length;
		
		var disabledAll=false;
		for(var i=0;i<len;i++){
			if(nationObjects[i].value!='IN')
				disabledAll=true;
		} 
		if(!disabledAll){
			var hiddenForeignerId=document.getElementsByClassName('hiddenForeigner');
			for(var k=0;k<hiddenForeignerId.length;k++){
				hiddenForeignerId[k].classList.add("hiddenForeignerId");
			}
			
			//document.getElementById('passportNo'+objTxt).classList.add("hiddenForeignerId");
		}
	}		
}

function setTotalSeatsDetails(t) {
	var services = 0, seats = 0;
	var ob;
	
	ob = document.getElementById(t + "TotalServices");
	if(ob != null) {
		services = parseInt(ob.value);
	}
	
	
	ob = document.getElementById(t + "TotalSeats");
	if(ob != null) {
		seats = parseInt(ob.value);
	}
	
	document.getElementById(t + "TotalServicesId").innerHTML = services;
	if(document.getElementById(t + "TotalSeatsId") !=null) {
		document.getElementById(t + "TotalSeatsId").innerHTML = seats;
	}
}

/* FILTERs for listing page */
function delFil(filterTypeid, clrType, position) {
    if (position === undefined || position == 1) var position = '';
    if (clrType == "ClearAll") {
        $('.FilSearch').each(function() {
            if ($(this).attr("title") == filterTypeid) {
                $(this).prop('checked', false);
                $("#ActFil" + $(this).value).hide();
            }
        });
        $("." + filterTypeid + "Active").remove();
        if (position == '2') {
            if (filterTypeid == "TravelsNameR")
                opf2 = 0;
            else if (filterTypeid == "BustypesR")
                btf2 = 0;
            else if (filterTypeid == "BoardingPointR")
                bpf2 = 0;
            else if (filterTypeid == "DroppingPointR")
                dpf2 = 0;
            else if (filterTypeid =="BusCategoryR")
            	bcf2 = 0;
            	
        } else {
            if (filterTypeid == "TravelsName")
                opf = 0;
            else if (filterTypeid == "Bustypes")
                btf = 0;
            else if (filterTypeid == "BoardingPoint")
                bpf = 0;
            else if (filterTypeid == "DroppingPoint")
                dpf = 0;
            else if (filterTypeid =="BusCategory")
            	bcf = 0;
        }
    } else {
        $("#" + clrType + filterTypeid).prop('checked', false);
        if (position == '2')
            $("#ActFil2" + clrType + filterTypeid).remove();
        else
            $("#ActFil" + clrType + filterTypeid).remove();
        if (position == '2')
            chekfils2(clrType, -1);
        else
            chekfils(clrType, -1);
    }
    FilSearch('ClearAll', '', '', position);
}

function chekfils(filtype, val) {
    if (filtype == "TravelsName")
        opf = opf + val;
    else if (filtype == "Bustypes")
        btf = btf + val;
    else if (filtype == "BoardingPoint")
        bpf = bpf + val;
    else if (filtype == "DroppingPoint")
        dpf = dpf + val;
    else if (filtype == "BusCategory")
    	bcf = bcf + val;
}

function chekfils2(filtype, val) {
    if (filtype == "TravelsNameR")
        opf2 = opf2 + val;
    else if (filtype == "BustypesR")
        btf2 = btf2 + val;
    else if (filtype == "BoardingPointR")
        bpf2 = bpf2 + val;
    else if (filtype == "DroppingPointR")
        dpf2 = dpf2 + val;
    else if (filtype == "BusCategoryR")
    	bcf2 = bcf2 + val;
}

function FilSearch(thisname, val, Checked, position) {
	var rSet = '.rSet';
    if (position === undefined || position == 1) var position = '';
	
	if(position == 2){ 
		rSet = rSet + "Return";
	} else {
		rSet = rSet + "Forward";
	}
	FILTER_TYPE = rSet;
    if (thisname != 'ClearAll') {
        if (Checked.substring(0, 4) == "CHKD") {
            if (position == '2')
                $("#ACTIVEFILTERS2").append('<span id="ActFil2' + Checked.substring(4) + val + '" class="' + Checked.substring(4) + 'Active" onclick="delFil(\'' + val + '\',\'' + Checked.substring(4) + '\',\'' + position + '\');" style="padding-right:10px; cursor: pointer; color:#000; padding:2px 5px;">' + thisname + '<span style="color:#FF0000;padding-left:3px;">x</span></span>&nbsp;');
            else
                $("#ACTIVEFILTERS").append('<span id="ActFil' + Checked.substring(4) + val + '" class="' + Checked.substring(4) + 'Active" onclick="delFil(\'' + val + '\',\'' + Checked.substring(4) + '\',\'' + position + '\');" style="padding-right:10px; cursor: pointer; color:#000; padding:2px 5px;">' + thisname + '<span style="color:#FF0000;padding-left:3px;">x</span></span>&nbsp;');
            if (position == '2')
                chekfils2(Checked.substring(4), 1);
            else
                chekfils(Checked.substring(4), 1);
        } else {
            if (position == '2') {
                if ($("#ActFil2" + Checked + val))
                    $("#ActFil2" + Checked + val).remove();
            } else {
                if ($("#ActFil" + Checked + val))
                    $("#ActFil" + Checked + val).remove();
            }
            if (position == '2')
                chekfils2(Checked, -1);
            else
                chekfils(Checked, -1);
        }
    }
    $("#seatSelect" + position).hide();
    var bustp_filter = "";
    var busc_filter = "";
    var travNm_filter = "";
    var brdpnts_filter = "";
    var drppnts_filter = "";
    $(".FilSearch").each(function() {
        tempval = '';
        if (position == '2') {
            if ($(this).attr("title") == "BustypesR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '') {
                    bustp_filter = bustp_filter + tempval + ",";
                }
            }
            if ($(this).attr("title") == "BusCategoryR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '') {
                	busc_filter = busc_filter + tempval + ",";
                }
            }
            if ($(this).attr("title") == "TravelsNameR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    travNm_filter = travNm_filter + tempval + ",";
            }
            if ($(this).attr("title") == "BoardingPointR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    brdpnts_filter = brdpnts_filter + tempval + ",";
            }
            if ($(this).attr("title") == "DroppingPointR") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    drppnts_filter = drppnts_filter + tempval + ",";
            }
        } else {
            if ($(this).attr("title") == "Bustypes") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '') {
                    bustp_filter = bustp_filter + tempval + ",";
                }
            }
            if ($(this).attr("title") == "BusCategory") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '') {
                	busc_filter = busc_filter + tempval + ",";
                }
            }
            if ($(this).attr("title") == "TravelsName") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    travNm_filter = travNm_filter + tempval + ",";
            }
            if ($(this).attr("title") == "BoardingPoint") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    brdpnts_filter = brdpnts_filter + tempval + ",";
            }
            if ($(this).attr("title") == "DroppingPoint") {
                tempval = (this.checked ? $(this).val() : "");
                if (tempval != '')
                    drppnts_filter = drppnts_filter + tempval + ",";
            }
        }
    });
    bustp_filter = bustp_filter.substring(0, bustp_filter.length - 1);
    travNm_filter = travNm_filter.substring(0, travNm_filter.length - 1);
    brdpnts_filter = brdpnts_filter.substring(0, brdpnts_filter.length - 1);
    drppnts_filter = drppnts_filter.substring(0, drppnts_filter.length - 1);
    busc_filter = busc_filter.substring(0, busc_filter.length - 1);
    
    var serviceDeduction = 0;
	var serviceToAdd = 0;
	var seatDeduction = 0;
	var seatToAdd = 0;
    
    $(rSet).each(function(i, service) {
		var totalServiceListlayout = $(rSet);
		var bps = $(service).attr('brdp');
		var dps = $(service).attr('drpp');
		var bt = $(service).attr('bt');
		var bc = $(service).attr('bc');
		var travNm = $(service).attr('tn');
		var stcount = $(service).attr('stcount');
		var updatecount = i;
		if(updatecount ===0) {
			serviceDeduction = 0;
			serviceToAdd = 0;
			seatDeduction = 0;
			seatToAdd = 0;
		}
		var show1 = true;
		var show2 = true;
		var show3 = true;
		var show4 = true;
		var show5 = true;
		
		if (bustp_filter != "") {
			var bty_filters = bustp_filter.split(",");
			var a = $.inArray(bt, bty_filters);
			if (a >= 0) {} else
				show1 = false;
		}
		if (busc_filter != "") {
			var bty_filters = busc_filter.split(",");
			var a = $.inArray(bc, bty_filters);
			if (a >= 0) {} else
				show5 = false;
		}
		if (travNm_filter != "") {
			var tnm_filters = travNm_filter.split(",");
			var a = $.inArray(travNm, tnm_filters);
			if (a >= 0) {} else
				show2 = false;
		}
		if (brdpnts_filter != "") {
			var bpoints_chek = bps.split(",");
			var a = 0;
			var brdpnts_filters = brdpnts_filter.split(",");
			for (var i = 0; i < brdpnts_filters.length; i++) {
				a = -1;
				a = $.inArray(brdpnts_filters[i], bpoints_chek);
				if (a >= 0)
					break;
			}
			if (a >= 0) {} 
				else show3 = false;
		}
		if (drppnts_filter != "") {
			var dpoints_chek = dps.split(",");
			var b;
			var drppnts_filters = drppnts_filter.split(",");
			for (var i = 0; i < drppnts_filters.length; i++) {
				b = -1;
				b = $.inArray(drppnts_filters[i], dpoints_chek);
				if (b >= 0)
					break;
			}
			if (b >= 0) {} else
				show4 = false;
		}
		if (show1 && show2 && show3 && show4 && show5) {
			if(this.style.display === "none") {
				seatToAdd = seatToAdd+Number(this.attributes[3].value);
				serviceToAdd = serviceToAdd+1;
			}
			$(this).show();
		}
		else {
			if(this.style.display != "none") {
				seatDeduction = seatDeduction+Number(this.attributes[3].value);
				serviceDeduction = serviceDeduction+1;
			}
			$(this).hide();
			
		}
		if(updatecount == (totalServiceListlayout.length - 1)) {
        	if(FILTER_TYPE ===".rSetForward") {
        		updateServicesAndSeatsCountFrwd(serviceToAdd, serviceDeduction,seatDeduction,seatToAdd);
        	} else {
        		updateServicesAndSeatsCountRetn(serviceToAdd, serviceDeduction,seatDeduction,seatToAdd);
        	}
		}

	});
    
    
    function updateServicesAndSeatsCountFrwd(serviceToAdd,serviceDeduction,seatDeduction,seatToAdd) {
    	var totalSeatAvailable = "";
		var totalAvailableService = document.getElementById('fwTotalServicesId').innerHTML;
		if(document.getElementById('fwTotalSeatsId')) {
			totalSeatAvailable = document.getElementById('fwTotalSeatsId').innerHTML;
		}
		
		totalAvailableService = Number(totalAvailableService)+serviceToAdd;
		totalAvailableService = Number(totalAvailableService)-serviceDeduction;
		totalSeatAvailable = Number(totalSeatAvailable)+seatToAdd;
		totalSeatAvailable = Number(totalSeatAvailable)-seatDeduction;
		document.getElementById('fwTotalServicesId').innerHTML = String(totalAvailableService);
		if(document.getElementById('fwTotalSeatsId')) {
			document.getElementById('fwTotalSeatsId').innerHTML = String(totalSeatAvailable);
		}
		

	}
    
    function updateServicesAndSeatsCountRetn(serviceToAdd,serviceDeduction,seatDeduction,seatToAdd) {
		var totalAvailableService = document.getElementById('retTotalServicesId').innerHTML;
		var totalSeatAvailable = document.getElementById('retTotalSeatsId').innerHTML;
		totalAvailableService = Number(totalAvailableService)+serviceToAdd;
		totalAvailableService = Number(totalAvailableService)-serviceDeduction;
		totalSeatAvailable = Number(totalSeatAvailable)+seatToAdd;
		totalSeatAvailable = Number(totalSeatAvailable)-seatDeduction;
		document.getElementById('retTotalServicesId').innerHTML = String(totalAvailableService);
		document.getElementById('retTotalSeatsId').innerHTML = String(totalSeatAvailable);

	}
    
    
    if (position == "2") {
        if (opf2 > 0 || btf2 > 0 || bpf2 > 0 || dpf2 > 0 || bcf2 > 0)
            $("#ACTIVEFILTERS2").show();
        else
            $("#ACTIVEFILTERS2").hide();
        if (opf2 > 0) {
            $("#OpFid2").css("background-color", "#ffd672 ");
            $(".TravelsNameRActive").css("background-color", "#ffd672 ");
        } else
            $("#OpFid2").css("background-color", "#FFFFFF");
        if (btf2 > 0) {
            $("#BtFid2").css("background-color", "#89d283");
            $(".BustypesRActive").css("background-color", "#89d283");
        } else
            $("#BtFid2").css("background-color", "#FFFFFF");
        if (bpf2 > 0) {
            $("#BpFid2").css("background-color", "#fdd2ff");
            $(".BoardingPointRActive").css("background-color", "#fdd2ff");
        } else
            $("#BpFid2").css("background-color", "#FFFFFF");
        if (dpf2 > 0) {
            $("#DpFid2").css("background-color", "#ffd672");
            $(".DroppingPointRActive").css("background-color", "#ffd672");
        } else
            $("#DpFid2").css("background-color", "#FFFFFF");
    } else {
        if (opf > 0 || btf > 0 || bpf > 0 || dpf > 0 || bcf > 0) {
            if ($("#ACTIVEFILTERS"))
                $("#ACTIVEFILTERS").show();
        } else {
            if ($("#ACTIVEFILTERS"))
                $("#ACTIVEFILTERS").hide();
        }
        if (opf > 0) {
            $("#OpFid").css("background-color", "#ffd672 ");
            $(".TravelsNameActive").css("background-color", "#ffd672 ");
        } else
            $("#OpFid").css("background-color", "#FFFFFF");
        if (btf > 0) {
            $("#BtFid").css("background-color", "#89d283");
            $(".BustypesActive").css("background-color", "#89d283");
        } else
            $("#BtFid").css("background-color", "#FFFFFF");
        if (bpf > 0) {
            $("#BpFid").css("background-color", "#fdd2ff");
            $(".BoardingPointActive").css("background-color", "#fdd2ff");
        } else
            $("#BpFid").css("background-color", "#FFFFFF");
        if (dpf > 0) {
            $("#DpFid").css("background-color", "#ffd672");
            $(".DroppingPointActive").css("background-color", "#ffd672");
        } else
            $("#DpFid").css("background-color", "#FFFFFF");
    }
}

function enableSelectBoxes(position) {
	var srvListDiv;
    if (position == 2) srvListDiv = "#ReturnAvailableServicesDiv ";
    else srvListDiv = "#ForwardAvailableServicesDiv ";
    $(srvListDiv + 'div.selectBoxs' + position).each(function() {

        $(this).children('span.selected').html($(this).children('div.selectOptions').find('span.Clear').attr("value"));
        $(this).attr('value', $(this).children('div.selectOptions').children('label.selectOption:first').attr('value'));
        $(this).children('span.selected,span.selectArrow').click(function() {
            if ($(this).parent().children('div.selectOptions').css('display') == 'none') {
                $(srvListDiv + 'div.selectOptions').css('display', 'none');
                $('.p1').show();
                $('.p2').hide();
                $(this).parent().children('div.selectOptions').css('display', 'block');
                $(this).parent().find('.p1').hide();
                $(this).parent().find('.p2').show();
            } else {
                $(this).parent().children('div.selectOptions').css('display', 'none');
                $(this).parent().find('.p1').show();
                $(this).parent().find('.p2').hide();
            }
        });
    });
    $(srvListDiv + ".FilSearch").change(function() {
        if ($(this).prop("checked"))
            var Checked = 'CHKD' + $(this).attr("title");
        else
            var Checked = $(this).attr("title");
        if ($(this).attr("position")) var pos = $(this).attr("position");
        else var pos = '';

        FilSearch($(this).attr("name"), $(this).val(), Checked, pos)
    });
}
function closeModifySearch(divId, fwDate, retDate) {
	showdiv('refineSearchId');
	document.getElementById('refineSearchId').setAttribute("style","display: flex;");
	hidediv('LinkTicketListDiv');
	hidediv('StartLinkListDiv');
	hidediv('EndLinkListDiv');
	hidediv(divId);
	var ob = document.getElementById("txtJourneyDate");
	if(ob != null && validateDate(fwDate)) {
		ob.value = fwDate;
		showdiv('ForwardAvailableServicesDiv');
		//showdiv('fwInfoLeftId');
		document.getElementById('fwInfoLeftId').setAttribute("style","visibility: visible;");
	}
	
	var ob = document.getElementById("txtReturnJourneyDate");
	if(ob != null && validateDate(retDate)) {
		ob.value = retDate;
		showdiv('ReturnAvailableServicesDiv');
		//showdiv('retInfoLeftId');
		document.getElementById('retInfoLeftId').setAttribute("style","visibility: visible;");
	}
	var uc = 'unSelectedDivCs';
	// addRemoveCss('fwInfoLeftId', uc, false);
	// addRemoveCss('retInfoLeftId', uc, true);
}

function setSelectedColor() {
	var ob = document.getElementById("billdesk");
	if(ob != null)
		ob.className = "pgw-css";
	
	ob = document.getElementById("axisBank");
	if(ob != null)
		ob.className = "pgw-css";
	
	ob = document.getElementById("iciciBank");
	if(ob != null)
		ob.className = "pgw-css";
	
	ob = document.getElementById("atom");
	if(ob != null)
		ob.className = "pgw-css";
	
	ob = document.getElementById("UPI");
	if(ob != null)
		ob.className = "pgw-css";
	
	ob = document.getElementById("payu");
	if(ob != null)
		ob.className = "pgw-css";
	
	ob = document.getElementById("PhenePe");
	if(ob != null)
		ob.className = "pgw-css";
	
	ob = document.getElementById("Gpay");
	if(ob != null)
		ob.className = "pgw-css";
	
	var cs = 'pgw-selected';
	var v = document.getElementById("pgId").value;
	if(v == '6' && document.getElementById("axisBank") != null) {
		document.getElementById("axisBank").className = cs;
		
	} else if(v == '5' && document.getElementById("billdesk") != null) {
		document.getElementById("billdesk").className = cs;
		
	} else if(v == '7' && document.getElementById("iciciBank") != null) {
		document.getElementById("iciciBank").className = cs;
	} else if(v == '8' && document.getElementById("atom") != null) {
		document.getElementById("atom").className = cs;
	} else if(v == '10' && document.getElementById("UPI") != null) {
		document.getElementById("UPI").className = cs;
	} else if(v == '2' && document.getElementById("payu") != null) {
		document.getElementById("payu").className = cs;
	} else if(v == '14' && document.getElementById("PhenePe") != null) {
		document.getElementById("PhenePe").className = cs;
	} else if(v == '12' && document.getElementById("Gpay") != null) {
		document.getElementById("Gpay").className = cs;
	}
}

function setSelectedPg(v) {
	document.getElementById("pgId").value = v;
	setSelectedColor();
}


function setPgwSelectedPg(v) {
	document.getElementById("pgId").value = v;
	var retTotalAmt=0, retBankTxnAmt=0,retHdfcBankTxnAmt=0,retPhonePeBankTxnAmt=0;
	var bankTxnAmt = parseFloat(document.getElementById("bankTxnAmountHid").value);
	var hdfcBankTxnAmt = parseFloat(document.getElementById("hdfcBankTxnAmountHid").value);
	var phonePeBankTxnAmt = parseFloat(document.getElementById("phonePeBankTxnAmountHid").value);
	var totalAmt =parseFloat(document.getElementById("totalAmountHid").value) ;
	if(document.getElementById("retBankTxnAmountHid")!= null){
		retBankTxnAmt = parseFloat(document.getElementById("retBankTxnAmountHid").value);
		 retHdfcBankTxnAmt = parseFloat(document.getElementById("retHdfcBankTxnAmountHid").value);
		 retPhonePeBankTxnAmt = parseFloat(document.getElementById("retPhonePeBankTxnAmountHid").value);
		retTotalAmt =parseFloat(document.getElementById("retTotalAmountHid").value) ;
	}
	if(document.getElementById("pgId").value == '2'){
		document.getElementById("totalAmtTd").innerHTML = totalAmt - bankTxnAmt + hdfcBankTxnAmt ;
		document.getElementById("grandTotalAmtTd").innerHTML = totalAmt - bankTxnAmt + hdfcBankTxnAmt ;
		document.getElementById("bankTxnAmountTd").innerHTML = hdfcBankTxnAmt ;
		if(document.getElementById("retBankTxnAmountHid")!= null){
			document.getElementById("returnTotalAmtTd").innerHTML = retTotalAmt - retBankTxnAmt + retHdfcBankTxnAmt ;
			document.getElementById("returnBankTxnAmountTd").innerHTML = retHdfcBankTxnAmt ;
			document.getElementById("grandTotalAmtTd").innerHTML = totalAmt - bankTxnAmt + hdfcBankTxnAmt + retTotalAmt - retBankTxnAmt + retHdfcBankTxnAmt ;
		}
	}else if(document.getElementById("pgId").value == '14') {
		document.getElementById("totalAmtTd").innerHTML = totalAmt - bankTxnAmt + phonePeBankTxnAmt ;
		document.getElementById("grandTotalAmtTd").innerHTML = totalAmt - bankTxnAmt + phonePeBankTxnAmt ;
		document.getElementById("bankTxnAmountTd").innerHTML = phonePeBankTxnAmt ;
		if(document.getElementById("retBankTxnAmountHid")!= null){
			document.getElementById("returnTotalAmtTd").innerHTML = retTotalAmt - retBankTxnAmt + retPhonePeBankTxnAmt ;
			document.getElementById("returnBankTxnAmountTd").innerHTML = retPhonePeBankTxnAmt ;
			document.getElementById("grandTotalAmtTd").innerHTML = totalAmt - bankTxnAmt + phonePeBankTxnAmt + retTotalAmt - retBankTxnAmt + retPhonePeBankTxnAmt ;
		}
	}else{
		document.getElementById("bankTxnAmountTd").innerHTML = bankTxnAmt;
		document.getElementById("totalAmtTd").innerHTML = totalAmt ;
		if(document.getElementById("retBankTxnAmountHid")!= null){
			document.getElementById("returnBankTxnAmountTd").innerHTML = retBankTxnAmt;
			document.getElementById("returnTotalAmtTd").innerHTML = retTotalAmt ;
		}
		document.getElementById("grandTotalAmtTd").innerHTML = totalAmt + retTotalAmt;

	}
	setSelectedColor();
}

function continueReturnBkg() {
	if(!validateSubmitBookingLayout()) {
		return false;
	}
	alert("Now, please select the return journey service.");
	
	 hidediv('ForwardAvailableServicesDiv');
	showdiv('ReturnAvailableServicesDiv');
	// alert("ssdf");
	var uc = 'unSelectedDivCs';
	 addRemoveCss('fwInfoLeftId', uc, true);
	 addRemoveCss('retInfoLeftId', uc, false);
	accomPrice=0;// For return set this one to zero value.
}

function continueEndBkg() {
	var linkPlaceId = "";
	if(!validateSubmitBookingLayout()) {
		return false;
	}
	alert("Now, please select the connecting Link Place journey service.");
	
	 hidediv('ForwardStartAvailableServicesDiv');
	showdiv('ForwardEndAvailableServicesDiv');
	// alert("ssdf");
	var uc = 'unSelectedDivCs';
	 addRemoveCss('fwInfoLeftId', uc, true);
	 addRemoveCss('retInfoLeftId', uc, false);
	accomPrice=0;// For link set this one to zero value.
	linkPlaceId = document.getElementById("selectedLinkPlaceId").value;
	if(document.getElementById("noServiceFound")) {
		hidediv("noServiceFound");
		showdiv("progressBarDivEndLink");
	}
	setTimeout(getLinkAvailableServiceList('1', '1', linkPlaceId), 10);
}


function addRemoveCss(divId, cssName, adOrR) {
	$( "#" + divId ).toggleClass( cssName, adOrR );
}

function validateMyTicket(formObj, fmId, path) {
	var isTranxSuccess;
	if(document.querySelectorAll('[id="home-tab"][class*="nav-link active"]').length==1){
		isTranxSuccess = 1;
	}else {
		isTranxSuccess = 0;
	}
	
	var v = document.getElementById("pnrPrefixWithTktNo").value;
	if(v == null || v == '' || v == '0') {
		alert("Please enter valid ticket number to continue.");
		return false;
	}
	
	if(!validateMobileNo(document.getElementById("mobileNo"))) {
		return false;
	}
	path = path + "?isTranxSuccess=" +isTranxSuccess;
	formObj.action = path;
	formObj.submit();
}


function getTranxDetails(formObj, fmId, path) {
	var isTranxSuccess;
	if(document.querySelectorAll('[id="home-tab"][class*="nav-link active"]').length==1){
		isTranxSuccess = 1;
	}else {
		isTranxSuccess = 0;
	}
	var v, bankRefNo = 0, mobileNo = 0, email= 0, tranxDate= 0;
	if(document.querySelectorAll('[href="#OB-reference"][class*="nav-link active"]').length==1){
		v = document.getElementById("bankRefNo");
		if(v == null || v.value == '' || v.value == '0') {
			alert("Please enter valid bankRefNo to continue.");
			return false;
		}else {
			bankRefNo = v.value;
		}		
	}else if(document.querySelectorAll('[href="#by-mobile"][class*="nav-link active"]').length==1){
		v = document.getElementById("tranxMobileNo");
		if(false){//!validateMobileNo(v)) {
			alert("Please enter valid mobileNo to continue.");
			return false;
		}else {
			mobileNo = v.value;
		}
		v = document.getElementById("tranxDate");
		if(v == null || v.value == '' || v.value == '0') {
			alert("Please enter valid transaction Date to continue.");
			return false;
		}else {
			tranxDate = v.value;
		}
	}else{
		v = document.getElementById("email");
		if(v == null || v.value == '' || v.value == '0' || !validEmail(v.value)) {
			alert("Please enter valid email to continue.");
			return false;
		}else {
			email = v.value;
		}
		v = document.getElementById("tranxDate1");
		if(v == null || v.value == '' || v.value == '0') {
			alert("Please enter valid transaction Date to continue.");
			return false;
		}else {
			tranxDate = v.value;
		}
	}

	path = path + "?isTranxSuccess=" +isTranxSuccess
				+ "&bankRefNo=" +bankRefNo
				+ "&mobileNo=" +mobileNo
				+ "&email=" +email
				+ "&tranxDate=" +tranxDate
				;
	formObj.action = path;
	formObj.submit();
}

function copyPrimaryPaxName() {
	var ob = document.getElementById("bookedByName");
	if(!validateAlphabet(ob, "Primary Passenger Name")) {
		return false;
	}
	if(document.getElementById(("passengerNameForward0")) != null) {
		if(document.getElementById(("passengerNameForward0")).value == ''){
			document.getElementById(("passengerNameForward0")).value = ob.value;
		}
	}
}
/** DOM PRINTER END * */

function calculateTotalFare(requestType) {
	var basic = 0, totFare = 0, acc = 0, dinner=0, totConc = 0, concCount = 0, retConc=0;
	
	var toll = parseFloat(document.getElementById(requestType + "TollsPrice").value);
	var srt = parseFloat(document.getElementById(requestType + "SrtFee").value);
	var aBasic = parseFloat(document.getElementById(requestType + "AdultFare").value);
	var cBasic = parseFloat(document.getElementById(requestType + "ChildFare").value);
	
	var aLevy = parseFloat(document.getElementById(requestType + "AdultLevyFare").value);
	var cLevy = parseFloat(document.getElementById(requestType + "ChildLevyFare").value);
	var bTxn = parseFloat(document.getElementById(requestType + "BnkTxnAmt").value);
	
	var conc = parseFloat(document.getElementById("concessionPercent").value);
	var concNo = parseFloat(document.getElementById("concNoPassengers").value);
	var concPrice = parseFloat(document.getElementById("concPrice"+requestType).value);
	if(document.getElementById('mTotPrice'+requestType) != null)
		dinner = parseFloat(document.getElementById('mTotPrice'+requestType).value);
	if(document.getElementById("retConc") != null)
		retConc = document.getElementById("retConc").value;
	var srvcConcPax = parseFloat(document.getElementById("srvcConcPax").value);
	
	var max = parseInt(document.getElementById("maxAgeCh").value);
	var ob;
	var aPax = 0, cPax = 0, totPax = 0;
	for(var i = 0; i < 20; i++) {
		ob = document.getElementById(("passengerAge" + requestType + i));
		if(ob != null) {
			if(!validateAgeField(ob, requestType, i)) {
				return false;
			}
		}
		
	}
	totPax = cPax + aPax;
	basic = (aBasic*aPax) + (cBasic*cPax);
	levies = (aLevy*aPax) + (cLevy*cPax);
	
	if(parseFloat(accomPrice) > 0){
		acc = parseFloat(totPax*accomPrice);
	}
	
	if(aPax>concNo) {
		concCount = concNo;
	} else {
		concCount = aPax;
	}
	// Card concessions
	totConc = Math.floor((aBasic*concCount*conc)/ 100 );
	
	//Group or Return concession
	if(( (totPax >= srvcConcPax) || (requestType == 'Return' && retConc == '1') )
			&& totConc == 0) {
		var aConc = 0, cConc = 0;

		aConc = Math.floor(aBasic*concPrice/ 100) * aPax;
		cConc = Math.floor(cBasic*concPrice/ 100) * cPax; 
		
		totConc = parseFloat(aConc) + parseFloat(cConc);
	}
		
	srt = (srt*totPax);
	toll = (toll*totPax);
	 
//	totFare = (basic + srt + toll + levies + acc + dinner) ;
	totFare = document.getElementById((requestType + "TotalAmount")).value ;
	totFare = parseFloat(totFare) * totPax;
	if(totConc > 0) {
		basic = basic-totConc;
		totFare = totFare - totConc;
	}
	//bTxn = parseFloat((parseFloat((totFare * bTxn ) / 100)).toFixed(0));
	bTxn = Math.ceil((totFare * bTxn ) / 100);
	totFare = totFare + bTxn;
	
	document.getElementById(requestType + "BasicFare").innerHTML = basic;
	document.getElementById(requestType + "SRT").innerHTML = srt;
	document.getElementById(requestType + "Toll").innerHTML = toll;
	document.getElementById(requestType + "Levies").innerHTML = levies;
	if(document.getElementById(requestType + "Accomdation") != null) {
		document.getElementById(requestType + "Accomdation").innerHTML = acc;
	}
	if(document.getElementById(requestType + "Dinner") != null) {
		document.getElementById(requestType + "Dinner").innerHTML = dinner;
	}
	
	if(document.getElementById(requestType + "Concession") != null) {
		document.getElementById(requestType + "Concession").innerHTML = totConc;
	}
	document.getElementById(requestType + "BankTransact").innerHTML = bTxn;
	
	document.getElementById(requestType+'totFare').innerHTML = totFare;
}

function calculateDinner(requestType,size) {	
	amt = 0;
	for(var i = 0; i < size; i++) { 
		if(document.getElementById('mQty'+requestType+i).value != ''){
			amt = amt + parseFloat(document.getElementById('mPrice'+requestType+i).value*
					document.getElementById('mQty'+requestType+i).value);
		}
	}
	document.getElementById('mTotPrice'+requestType).value = amt;
	calculateTotalFare(requestType);
}

function modifyTicket(formObj, fmId){
	submitFormAction(formObj.action, fmId);
}

function changeObRef(){
	//document.getElementById("isTranxSuccess_3").checked = false;
	//document.getElementById("isTranxSuccess_4").checked = true;
	//document.getElementById("isTranxSuccess_6").checked = false;
	///document.getElementById("TransactionStatus_1").checked = true;
	//hidediv('PnrDivId');
	//showdiv('ObRefDivId');
	//showdiv('ByObRefenceId');
	////hidediv('ByMobileNo');
	//hidediv('ByEmailId');
	//hidediv('ByServiceStatus');
}
function changepnrNo(){
	document.getElementById("isTranxSuccess_3").checked = false;
	document.getElementById("isTranxSuccess_2").checked = false;
	document.getElementById("isTranxSuccess_1").checked = true;
	showdiv('PnrDivId');
	hidediv('ObRefDivId');
	hidediv('ByObRefenceId');
	hidediv('ByMobileNo');
	hidediv('ByEmailId');
	hidediv('ByServiceStatus');
}
function searchTranxStatus(){
	document.getElementById("isTranxSuccess_1").checked = true;
	if(document.getElementById("TransactionStatus_1").checked == true){
		document.getElementById("TransactionStatus_1").checked = true;
		document.getElementById("TransactionStatus_2").checked = false;
		document.getElementById("TransactionStatus_3").checked = false;
		showdiv('ByObRefenceId');
		hidediv('ByMobileNo');
		hidediv('ByEmailId');
		
	}else if(document.getElementById("TransactionStatus_2").checked == true){
		document.getElementById("TransactionStatus_1").checked = false;
		document.getElementById("TransactionStatus_2").checked = true;
		document.getElementById("TransactionStatus_3").checked = false;
		hidediv('ByObRefenceId');
		showdiv('ByMobileNo');
		hidediv('ByEmailId');
		
	}else{
		document.getElementById("TransactionStatus_1").checked = false;
		document.getElementById("TransactionStatus_2").checked = false;
		document.getElementById("TransactionStatus_3").checked = true;
		hidediv('ByObRefenceId');
		hidediv('ByMobileNo');
		showdiv('ByEmailId');
		
	}
	
}
function searchServiceStatus(){
	if(document.getElementById("serviceStatus_1").checked == true){
		document.getElementById("serviceStatus_1").checked = true;
		document.getElementById("serviceStatus_2").checked = false;
		hidediv('ByTripcodeId');
		showdiv('ByServiceStatus');
		showdiv('ByPnrNoId');
		
	}else {
		document.getElementById("serviceStatus_1").checked = false;
		document.getElementById("serviceStatus_2").checked = true;
		hidediv('ByPnrNoId');
		showdiv('ByTripcodeId');
		
	}

}
function changeServiceStatus(){
	document.getElementById("isTranxSuccess_9").checked = true;
	document.getElementById("isTranxSuccess_7").checked = false;
	document.getElementById("isTranxSuccess_8").checked = false;
	document.getElementById("serviceStatus_1").checked = true;
	hidediv('PnrDivId');
	hidediv('ObRefDivId');
	hidediv('ByTripcodeId');
	showdiv('ByServiceStatus');
	showdiv('ByPnrNoId');
}
function getServiceDetails(formObj, fmId, path) {
	
	var v, pnrPrefixWithTktNo = 0, serviceCode = 0, txtDepartureDate;
	
	if((document.querySelectorAll('[href="#contact"][class*="nav-link active"]').length==1 ) && (document.querySelectorAll('[href="#PNR-number"][class*="nav-link active"]').length==1)){
		v = document.getElementById("pnrPrefixWithTktNo1");
		if(v == null || v.value == '' || v.value == '0') {
			alert("Please enter valid PNR Number to continue.");
			return false;
		}else {
			pnrPrefixWithTktNo = v.value;
		}		
	}else {
		v = document.getElementById("serviceCode");
		if(v == null || v.value == '' || v.value == '0') {
			alert("Please enter valid Trip code to continue.");
			return false;
		}else {
			serviceCode = v.value;
		}
		v = document.getElementById("txtDepartureDate");
		if(v == null || v.value == '' || v.value == '0') {
			alert("Please enter valid Departure Date to continue.");
			return false;
		}else {
			txtDepartureDate = v.value;
		}
	}

	path = path + "?pnrPrefixWithTktNo=" +pnrPrefixWithTktNo
				+ "&serviceCode=" + serviceCode
				+ "&txtDepartureDate=" + txtDepartureDate
				;
	formObj.action = path;
	formObj.submit();
}
function savaCancelRequest(path, btOb) {
	var formObj = btOb.form;
	var v = document.getElementById("tranxStatus");
	if(v == null || trim(v.value).length < 0) {
		alert("Please enter valid remarks to continue.");
		return false;
	}
	formObj.action = path;
	formObj.submit();
	document.getElementById("CancelReqSubmit").style="background-color:grey;cursor: default";
	document.getElementById("CancelReqSubmit").disabled = true;
}

function searchLinkTkt(divname) {
 	showdiv('SearchLinkTktDivID');
 	hidediv('refineSearchId');
 	hidediv('refineSearchDivID');
 	hidediv('favoritesDivID');
	hidediv('ForwardAvailableServicesDiv');
	hidediv('ReturnAvailableServicesDiv');
	
	if(document.getElementById("startPlaceId") != null)
		document.getElementById("startPlaceIdLink").value = document.getElementById("startPlaceId").value;
	
	if(document.getElementById("endPlaceId") != null)
		document.getElementById("endPlaceIdLink").value = document.getElementById("endPlaceId").value;
	
	if(document.getElementById("txtJourneyDate") != null)
		document.getElementById("txtJourneyDateLink").value  = document.getElementById("txtJourneyDate").value;
	
}

function copyLinkPrimaryPaxName() {
	var ob = document.getElementById("bookedByName");
	if(!validateAlphabet(ob, "Primary Passenger Name")) {
		return false;
	}
	if(document.getElementById(("passengerNameStart0")) != null) {
		document.getElementById(("passengerNameStart0")).value = ob.value;
	}
}

function populateLinkPaxDetails(chk) {
	var oj = 'Start';
	var rt = 'End';
	var indx = parseInt(document.getElementById("currSeatIndex" + rt).value);
    var curIdx = 0;    
	for(var i = 0; i < 10 ; i++) {
		if(document.getElementById("categoryCodeId" + rt + i) != null
			&& document.getElementById("categoryCodeId" + oj + i) != null) {
			if(chk == true) {
				document.getElementById("categoryCodeId" + rt + i).value = document.getElementById("categoryCodeId" + oj + i).value;
				document.getElementById("genderCodeId" + rt + i).value = document.getElementById("genderCodeId" + oj + i).value;
				document.getElementById("passengerName" + rt + i).value = document.getElementById("passengerName" + oj + i).value;
				document.getElementById("passengerAge" + rt + i).value = document.getElementById("passengerAge" + oj + i).value;				
			}  else {
				document.getElementById("passengerName" + rt + i).value = "";
				document.getElementById("passengerAge" + rt + i).value = "";
				
			}
			document.getElementById("categoryCodeId" + rt + i).value = document.getElementById("categoryCodeId" + oj + i).value;
			curIdx++;
		}
		if(curIdx == indx)  {
			break;
		}
	}//  end of for loop
	// calculateTotalFare(rt);
}

function validateSubmitLinkBookingLayout() {
	// validate Mobile number
	var txtObj = document.getElementById("mobileNo");
	var val = "";
	var msg = "";
	
	if(!validateMobileNo(txtObj)) {
		return false;
	}
	
	// validate Passenger Name for 150 characters
	txtObj = document.getElementById("bookedByName");
	val = txtObj.value;
	if(val.length > 100) msg = "The Passenger Name   can not be more than 100 characters.";
	else if(LTrim(RTrim(val)).length < 1) 
		msg = "Please enter valid Passenger Name.";
	
	if(msg != "") {
		alert(msg);
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("email");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter valid email address.");
		txtObj.focus();
		return false;
	}
	
	// validate Address field for 100 characters
	txtObj = document.getElementById("address");
	if(txtObj != null) {
		val = txtObj.value;
		msg = "Address can not be more than 100 characters.";
		if(val.length > 100) {
			alert(msg);
			txtObj.focus();
			return false;
		}
	}
	txtObj = document.getElementById("cardNumber");
	if(txtObj != null && RTrim(LTrim(txtObj.value)) == "") {
		alert("Please enter card number.");
		txtObj.focus();
		return false;
	}
	if(!validateBookingForm("Start")) return false;
	
	if(!checkWLSeatsOrder("Start")) return false;
	
	var txtObj = document.getElementById("totalAmount");
	if(txtObj != null) {
		document.getElementById("oldBookingAmt").value = txtObj.value;
		var grandTotal = parseFloat(document.getElementById("grandTotal").value);
		grandTotal = grandTotal - parseFloat(txtObj.value);
		document.getElementById("collectedAmt").value = grandTotal.toFixed(2);
	}
	
	
	var fwCurIdx = 0,  rtCurIdx = 0;
	
	fwCurIdx = parseInt(document.getElementById("currSeatIndexStart").value);
	if(document.getElementById("currSeatIndexEnd") != null) {
		rtCurIdx = parseInt(document.getElementById("currSeatIndexEnd").value);
		
		if(!checkWLSeatsOrder("End")) return false;
		
		if(!validateBookingForm("End")) {
			return false;
		}
		if(fwCurIdx != rtCurIdx) {
			alert("Please select same number of seats in start and end journey.");
			return false;
		}
	}
	return true;
}

function linkBookingFormSubmitAction(path, formObj) {
	if(!validateSubmitLinkBookingLayout()) {
		return false;
	}
	setLinkTktDetails();
 	var ob = document.getElementById("copyPaxChk");
 	if(ob != null) {
 		populateLinkPaxDetails(true);
	}
	formObj.action = path;
	formObj.submit();
}

function setLinkTktDetails(){
	var txtLinkJourneyDate = "";

	if(document.getElementById("txtJourneyDateEnd") != null)
		txtLinkJourneyDate = document.getElementById("txtJourneyDateEnd").value;

	document.getElementById("txtLinkJourneyDate").value = txtLinkJourneyDate;


	var seatDetails = document.getElementsByName("seatDetails");
	var seatDetailsLength = parseInt(seatDetails.length/2);
	var startSeatNos = new Array();
	var endSeatNos = new Array();

	for(var i = 0; i < seatDetails.length; i++){
		if(document.getElementById("seatDetailsStart" + i) != null){
			startSeatNos[i] = document.getElementById("seatDetailsStart" + i).value; 

		}else if(document.getElementById("seatDetailsEnd" + parseInt(i - seatDetailsLength))){
			endSeatNos[parseInt(i - seatDetailsLength)] = document.getElementById("seatDetailsEnd" + parseInt(i - seatDetailsLength)).value; 

		}
	}
	document.getElementById("seatDetailStLink").value = startSeatNos;
	document.getElementById("seatDetailEdLink").value = endSeatNos;
}
function displaySelectedLinkSearchPage(val) {
	autocompletePlace("#fromPlaceNameLink","#startPlaceIdLink");
	autocompletePlace("#toPlaceNameLink","#endPlaceIdLink");
	
	$('#txtJourneyDateLink').datepicker({ numberOfMonths: 1
			, dateFormat: 'dd/mm/yy'
			, minDate: '0'
			, maxDate: "+30d"
			,  onSelect: function(selected) {$("#txtReturnJourneyDate").datepicker("option","minDate", selected);}
			}).val();
	

	
	setHelpText('Leaving From:', 'fromPlaceNameLink');
	setHelpText('Going To:', 'toPlaceNameLink');
}
function setHideLinkDivs() {
	hidediv('LinkTicketListDiv');
	hidediv('StartLinkListDiv');
	hidediv('EndLinkListDiv');
}
function resetLinkTxt(o, v) {
	if(o != null) {
		o.value = v;
	}
	$('#txtJourneyDateLink').datepicker({ numberOfMonths: 2
		, dateFormat: 'dd/mm/yy'
		, minDate: '0'
		, maxDate: "+30d"
		}).val();
}

function getLinkSingleLady() {
	var slady = "";
	
	var sob = document.getElementById("singleLadyLink");
	
	if(sob != null && sob.value != '' && sob.checked == true) {
		sob.value = "1";
		slady = sob.value;
		if(document.getElementById("adultMale") != null) 
			document.getElementById("adultMale").value = 0;
		if(document.getElementById("adultFemale") != null)
			document.getElementById("adultFemale").value = o.value;
		if(document.getElementById("childMale") != null)
			document.getElementById("childMale").value = 0;
		if(document.getElementById("childFemale") != null)
			document.getElementById("childFemale").value = 0;
	} else if(sob != null) {
		sob.value = "0";
	}
	return slady;
}

function validateSeniorSitizenCon() {
	var obj;
	obj = document.getElementById("concessionId");
	var concessionId;
	if (obj != null && obj.value != '') {
		concessionId = obj.value;
		if (concessionId == 1468092614493) {
			alert("Senior Citizen concession allowed for residents of Kerala State only. While travelling, produce original ID proof like Passport/ Voter ID/ Aadhaar/ Driving License/ Identity Card of PSUs of GOI/ NREGA card/ Identity Card of PSUs of GOK/ Identity card  of Senior Citizens Welfare Directorate/ Senior citizen Identity Card issued by KERALA RTC.");
			return true;
		} 
	}
}

function loginGuestUser(value){
		if(value == 0) {
			showdiv("GuestDivID");
			hidediv("GuestLoginDivID");
			document.getElementById("guestLogin_1").checked = true;
			document.getElementById("guestLogin_2").checked = false;
			if(document.getElementById("GuestRadioBtn")){
				document.getElementById("GuestRadioBtn").style.display = "";
			}
			if(document.getElementById("GuestRadioBtn1")){
				document.getElementById("GuestRadioBtn1").style.display = "none";
			}
		} else {
			hidediv("GuestDivID");
			hidediv("GuestLoginRespDivID");
			showdiv("GuestLoginDivID");
			if(document.getElementById("GuestRadioBtn")){
				document.getElementById("GuestRadioBtn").style.display = "none";
			}
			if(document.getElementById("GuestRadioBtn1")){
				document.getElementById("GuestRadioBtn1").style.display = "";
			}
			document.getElementById("guestLogin_3").checked = false;
			document.getElementById("guestLogin_4").checked = true;
		}
}

function papulateGuestUsrLogin(){
	showdiv("GuestDivID");
	hidediv("GuestLoginDivID");
	hidediv("GuestRadioBtn");
	document.getElementById("guestLogin_1").checked = false;
	document.getElementById("guestLogin_2").checked = true;
	document.getElementById("bookedByName").value = document.getElementById("bookedByNameResp").value;
	document.getElementById("mobileNo").value = document.getElementById("mobileNoResp").value;
	document.getElementById("email").value = document.getElementById("emailResp").value;
}

function trackTransandItem(bankRefNo, revenue, name, affiliation, tax, category, sku, quantity) {

	ga('require', 'ecommerce');
	var transaction = {
	          'id': bankRefNo,  // Transaction ID.
	          'affiliation': affiliation,  // Affiliation or store name.
	          'revenue': revenue,		// Grand Total.
	          'tax': tax              
	        };
	
	var additems ={
			'id': bankRefNo, 
			'name': name,
			'category': category,
			'sku': sku,  
			'price': revenue/quantity,
			'quantity': quantity   //Quantity 
		};
	ga('ecommerce:addTransaction', transaction);
	ga('ecommerce:addItem', additems);
	ga('ecommerce:send');

}



// Related to Pkg Tours

function showPkgToursCancelTicket(formObj,path) {
	
	var divName = 'BookedToursTicketsDivId';
	hideMessages();
	var pnr = "";
	var id = "";
	if(document.getElementById("tourBookingId") != null) {
		pnr = document.getElementById("tourBookingId").value;
	}
	var path =  path+ "?bookingId=" + pnr
				+ "&uidNumber=" + document.getElementById("tourUidNumber").value
				+ "&mobileNo=" + document.getElementById("tourMobileNo").value
				;
	var txtObj = document.getElementById("tourBookingId");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Ticket Number");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("tourUidNumber");
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Txn. Password");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("tourMobileNo");
	if(!validateMobileNo(txtObj)) {
		return false;
	}
	showdiv("progressBarDiv");
	formObj.action = path;
	formObj.submit();
	//ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}


function validatepkgToursTicket(formObj, fmId, path) {
	
	var v = document.getElementById("bookingId").value;
	if(v == null || v == '' || v == '0') {
		alert("Please enter valid ticket number to continue.");
		return false;
	}
	
	if(!validateMobileNo(document.getElementById("tourmobileNo"))) {
		return false;
	}
	formObj.action = path;
	formObj.submit();
}

var referenceWin = null;
function loadMore(url){
	try{
		if ((referenceWin == null) || (referenceWin.closed == true)){
			referenceWin = window.open(url, '', 'toolbar=false,statusbar=false,scrollbars=1,addressbar=false,resize=false,width=1000,height=600,left=10,top=10');
			referenceWin.focus();
		}else{
			referenceWin.focus();
		}
	}catch(e){
		console.log("Error in loadMore "+e);
	}
}

function swapValues() {
	var temp = document.getElementById("fromPlaceName").value;
	var tempStartPlcId = document.getElementById("startPlaceId").value;
	var tempStartPlcCode = document.getElementById("startPlaceId").value;
	
	if(document.getElementById("toPlaceName").value != 'Going To:'){
		document.getElementById("fromPlaceName").value = document.getElementById("toPlaceName").value ;
		document.getElementById("startPlaceId").value = document.getElementById("endPlaceId").value ;
		document.getElementById("fromPlaceCode").value = document.getElementById("toPlaceCode").value ;
	} else{
		document.getElementById("fromPlaceName").value = 'Leaving From:';
		document.getElementById("startPlaceId").value = '' ;
		document.getElementById("fromPlaceCode").value = '' ;
	}
	if(temp != "" &&  temp != 'Leaving From:'){
		document.getElementById("toPlaceName").value = temp;
		document.getElementById("endPlaceId").value = tempStartPlcId;
		document.getElementById("toPlaceCode").value = tempStartPlcCode;
	} else{
		document.getElementById("toPlaceName").value = 'Going To:';
	}
}

function getWalletCash(divName){
	var walletObj;
	walletObj = document.getElementById("addWalletAmount");
	var amount;
	if(walletObj != null){
		if(Number(document.getElementById("addWalletAmount").value) <100) {
			alert("Minimum amount to be add in wallet is 100.Please enter correct amount");
			return false;
		}
		amount = walletObj.value;
		walletObj.readOnly = true;
		walletObj.style="background-color: #E4E4E4";
	} else{
		walletObj.readOnly = false;
	}
	var path =  "/wallet/addPaymentList.do?addWalletAmount=" + amount;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function pgWalletSubmitAction(path, formObj) {
	var pgObj;
	var pgchk = false;
	for(var i=1; i<=3; i++) {
		pgObj = document.getElementById(("pgId"+i));
		if(pgObj == null) {
			break;
		} else if(pgObj.checked == true) {
			pgchk = true;
			break;
		}
	}
	if(pgchk) {
		alert("Please select payment gateway to continue.");
		return false;
	}
	if(document.getElementById("termsChk").checked == false) {
		alert("Please accept terms and conditions.");
		return false;
	}
	path = path +"?addWalletAmount=" + document.getElementById("addWalletAmount").value;
	
	formObj.action = path;
	formObj.submit();
}

function cancelCouponUsage(divName){
	var couponUsageIdObj;
	var cashbackCoupon;
	couponUsageObj = document.getElementById("couponUsageId");
	if(couponUsageObj != null){
		couponUsageId = couponUsageObj.value;
	}
	var path =  "/ajax/wallet/couponUsage/cancel.do?couponUsageId=" + couponUsageId;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
}

function isValidNumber(txtObj) {
	var val = txtObj.value;
	if(txtObj.value == "0.00") {
		return false;
	}
	if(validNumber(val)) {
		return true;
	} else {
		txtObj.value = "0";
		txtObj.focus();
		alert("Please enter valid number.");
		return false;
	}
}


function saveform(formObj, fmId) {
	var txtObj=document.getElementById('referenceType_4');
	if(txtObj!=null){
		if(txtObj.checked){
			var refObj=document.getElementById('referenceNo');
			if(refObj!=null && refObj.value==''){
				alert('Please enter franchise login name');
				return false;
			}
		}
	}
	submitFormAction(formObj.action, fmId);
}


function validateMobileNo(ob)  {
	var msg = "";
	var val = ob.value;
	if(val.length != 10) msg = "Please enter valid 10 digits mobile number.";
	else if(val.charAt(0) != '6' && val.charAt(0) != '7' && val.charAt(0) != '8' && val.charAt(0) != '9')
		msg = "Mobile number must start with 6 or 7 or 8 or 9.";
	if(msg != "") {
		alert(msg);
		ob.value = "";
		//ob.focus();
		return false;
	}
	if(val && val.length == 10 && !val.match("^[0-9]{10}$")) {
		alert("Please enter valid Contact Number.");
		ob.value = "";
		return false;
	}
	return true;
}

function showWalletDetails(walBal){
	
	var bookingAmt = 0.0, onwardTotalAmt = 0.0, retTotalAmt = 0.0;
	var bankTranxAmt = 0.0, onwardBanTranxAmt = 0.0, retBankTranxAmt = 0.0;
	var walletSavedAmt = 0.0;
	if(document.getElementById("totalAmountHid") != null)
		onwardTotalAmt = parseFloat(document.getElementById("totalAmountHid").value);
	
	if(document.getElementById("retTotalAmountHid") != null)
		retTotalAmt = parseFloat(document.getElementById("retTotalAmountHid").value);
	
	bookingAmt = onwardTotalAmt + retTotalAmt;
	
	if(document.getElementById("bankTxnAmountHid") != null)
		onwardBanTranxAmt = parseFloat(document.getElementById("bankTxnAmountHid").value);
	
	if(document.getElementById("retBankTxnAmountHid") != null)
		retBankTranxAmt = parseFloat(document.getElementById("retBankTxnAmountHid").value);
	
	if(document.getElementById("walletSavedAmt") != null)
		walletSavedAmt = parseFloat(document.getElementById("walletSavedAmt").value);
	
	bankTranxAmt = onwardBanTranxAmt + retBankTranxAmt;
	
	document.getElementById('termsChk').checked = true;
	
	if(document.getElementById('walletChk') !=null
			&& document.getElementById('walletChk').checked == true) {
		if(parseFloat(walBal) >= parseFloat(bookingAmt) ) {//wallet
			showdiv("walletid");
			hidediv("pggwid");
			bookingAmt = parseFloat(bookingAmt) - parseFloat(bankTranxAmt);
			var walletSaveAmt = bankTranxAmt;
			var displayAmt = bookingAmt;
			document.getElementById("walletBkngAmt").innerHTML = '<table class = "cashbackInnerTable"><tr><td>You Saved Amount:&nbsp;</td><td><h3><span class="couponSuccessMsg">'
				+parseFloat(walletSaveAmt).toFixed(2) +'</span></h3></td></tr><tr><td>'
				+'From Wallet :&nbsp;</td><td><h3>'+ Math.ceil(displayAmt).toFixed(2)+'</h3></tr></table>';
		} else {
			showdiv("walletid");
			showdiv('pggwid');
			var walletSaveAmt = walletSavedAmt;
			var walletAndSaveAmt = parseFloat(parseFloat(walBal) +  parseFloat(walletSaveAmt));
			var displayAmt = 0;
			if(parseFloat(bookingAmt) > parseFloat(walletAndSaveAmt)){
				displayAmt = parseFloat(parseFloat(bookingAmt) - parseFloat(walletAndSaveAmt));
				document.getElementById("walletBkngAmt").innerHTML = '<table class = "cashbackInnerTable"><tr><td>You Saved Amount:&nbsp;</td><td><h3> <span class="couponSuccessMsg">'
					  + parseFloat(walletSaveAmt).toFixed(2) +'</span></h3></td></tr><tr><td>'
					  +'From Wallet :&nbsp;</td><td><h3>'+ parseFloat(walBal).toFixed(2) +'</h3></tr>'
					  +'<tr><td>From Payment Gateway:&nbsp;</td><td><h3>'+parseFloat(displayAmt).toFixed(2)
					  +'</h3></td></tr></table>';
			} else {
				displayAmt = parseFloat(parseFloat(bookingAmt) - parseFloat(walBal));
				walBal = parseFloat(parseFloat(walBal) - parseFloat(walletSaveAmt)); 
				document.getElementById("walletBkngAmt").innerHTML = '<table class = "cashbackInnerTable"><tr><td>You Saved Amount:&nbsp;</td><td><h3> <span class="couponSuccessMsg">'
					  + parseFloat(walletSaveAmt).toFixed(2) +'</span></h3></td></tr><tr><td>'
					  +'From Wallet :&nbsp;</td><td><h3>'+ parseFloat(walBal).toFixed(2) +'</h3></tr>'
					  +'<tr><td>From Payment Gateway:&nbsp;</td><td><h3>'+parseFloat(displayAmt).toFixed(2)
					  +'</h3></td></tr></table>';
			}		
		}		
		
	} else {
			showdiv("walletid");
			showdiv("pggwid");
			document.getElementById("walletBkngAmt").innerHTML = '';
	}
}

function trackPKGObRef(){
	document.getElementById("isTranxSuccess_4").checked = true;
	document.getElementById("TransactionStatus_1").checked = true;
	hidediv('PnrDivId');
	showdiv('ObRefDivId');
	showdiv('ByObRefenceId');
	hidediv('ByMobileNo');
	hidediv('ByEmailId');
}
function refineOfflineSearchResults(days) {
	var contextPath = document.getElementById("contextPath").value;
	var path = contextPath + '/avail/offline/services.do';
	
	var ob = document.getElementById("txtJourneyDate");
	formObj = ob.form;
	
	var t = "";
	if(ob != null) {
		t = addDay(ob.value, days);
		
		if(t == null) {
			return false;
		}
		ob.value = t;
	}

	validateBookingSearch(formObj, path);
}


function clearCCRequest() {
	document.getElementById("idNo").value = document.getElementById("idNo").value;
	document.getElementById("vehicleNo").value = "";
	document.getElementById("serviceTypeId").value = 0;
	document.getElementById("fromPlaceName").value = "";
	document.getElementById("toPlaceName").value = "";
	document.getElementById("txtFromDate").value = "";
	document.getElementById("startTime").value = "0000";
	document.getElementById("txtToDate").value = "" ;
	document.getElementById("endTime").value = "0000";
	document.getElementById("adults").value = "";
	document.getElementById("childs").value = "";
	document.getElementById("hours").value = "";
	document.getElementById("otherCharges").value = "";
}

function editCCRequestDetails(idNo,vehicleNo, fromPlaceName, toPlaceName, startDate,startTime ,endDate
		, endTime,  adults, childs, hours, otherCharges, bkgDetailsID,srvCatId) {

	if(document.getElementById("editIconDiv")!=null)
		document.getElementById("editIconDiv").style = "display: block;";
	
	if(document.getElementById("addIconDiv")!=null)
		document.getElementById("addIconDiv").style = "display: none;";
	
	document.getElementById("idNo").value = idNo;
	document.getElementById("vehicleNo").value = vehicleNo;
	document.getElementById("fromPlaceName").value = fromPlaceName;
	document.getElementById("toPlaceName").value = toPlaceName;
	document.getElementById("txtFromDate").value = startDate;
	document.getElementById("startTime").value = startTime;
	document.getElementById("txtToDate").value = endDate ;
	document.getElementById("endTime").value = endTime;
	document.getElementById("adults").value = adults;
	document.getElementById("childs").value = childs;
	document.getElementById("hours").value = hours;
	document.getElementById("otherCharges").value = otherCharges;
	document.getElementById("bkgDetailsId").value = bkgDetailsID;
	document.getElementById("serviceTypeId").value = srvCatId;
	document.getElementById("UpdateBtn").disabled="";
}


function validateCCTicket(formObj, fmId) {
	var v = document.getElementById("pnrPrefixWithTktNo").value;
	if(v == null || v == '' || v == '0') {
		alert("Please enter valid ticket number to continue.");
		return false;
	}
	txtObj = document.getElementById("passengerMobile");
	if(!validateMobileNo(txtObj)) {
		return false;
	}	
	formObj.submit();
}





function validateCCRequestBooking(formObj, fmId) {
	var txtObj,  nm;	
	txtObj = document.getElementById("passengerEmail");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter valid email address.");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("passengerMobileNo");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter Mobile No.");
		txtObj.focus();
		return false;
	}
	 if (!validateMobileNo(txtObj)) {
			return false;
	 }
	nm =document.getElementById("passengerName");
	if(nm.value == "") {
		alert("Please enter Passenger Name");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("pickupPoint");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter Boarding Point");
		txtObj.focus();
		return false;
	}
	

	txtObj = document.getElementById("address");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter Address");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("journeyDetails");
	if(txtObj != null && txtObj.value == "") {
		alert("Please enter Journey Details");
		txtObj.focus();
		return false;
	}
	
	 if(document.getElementById("listDiv") == null){
		 alert("Please add atleast One bus to submit"); 
	 	 return false;
	 }
	 submitCCForm(formObj);
	//formObj.submit();
}


function showCasualContractCancelTicket(formObj,path) {
	var divName = 'BookedCCTicketsDivId';
	hideMessages();
	var pnr = "";
	var id = "";
	var txtObj = document.getElementById("pnrPrefixWithTkt");
	if(txtObj != null) {
		pnr = txtObj.value;
	}
	if(txtObj.value == "" || txtObj.value == "0") {
		alert("Please enter Valid Booking Id");
		txtObj.focus();
		return false;
	}
	
	txtObj = document.getElementById("passengerMbleNo");
	if(!validateMobileNo(txtObj)) {
		return false;
	}
	var path =  path+ "?pnrPrefixWithTktNo=" + pnr
			+ "&passengerMobileNo=" + document.getElementById("passengerMbleNo").value
	;
	ajaxCommonActionSubmit(path, divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
	return true;
}



function displayCCSelectedPage(val,minDays,maxDays){
   var dateToday = new Date(); 
   minDays = parseInt(minDays);
  dateToday.setDate(dateToday.getDate() + minDays);
//  dateMaxDay.setDate(dateToday.getDate() + maxDays);

var dates = $("#txtFromDate").datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    minDate: dateToday
   // maxDate: dateMaxDay  
})
}


function isGeneralLadyBooking(requestType, tdId, seatIndx, currentIdx, seatType, tblId) {
	try{
		if(currentIdx > 0) {
			return false;
		}
		if(document.getElementById(("genderCodeId" + requestType + currentIdx)).value == MALE_ID){
			var fvs = document.getElementById("femaleSeatSpanId" + requestType);
			if(fvs != null) {
				fvs.style.display = "none";
				fvs.innerHTML = "";
			}
			return false;
		}
		
		if(document.getElementById(("genderCodeId" + requestType + currentIdx)).value == FEMALE_ID){
			showActionMsg(tdId,seatType,requestType,currentIdx, tblId,seatIndx);
		}
	}catch(e){
		
	}
	return false;
}


function showActionMsg(tdId,seatType,requestType,indx, tblId, seatIndx){
	try{
		document.getElementById((requestType + seatIndx)).className = "selectedSeatClass" + seatType;
		var tmsg =  "You are trying to book a seat as General Lady. " +
		            "There may be a possibility that male can also book seat beside you. " +
		            "Please choose OK (or) Continue to proceed further or else book the ticket using Single Lady option by using modify search." +
		            "\n  If you want to book as single lady please goto home page select single lady and re-book."
		            ;
		var b = confirm(tmsg);
		// if not confirmed then do not allow the user to continue the seat selection.
		if(!b) {
			document.getElementById((requestType + seatIndx)).className = "availSeatClass" + seatType;
			document.getElementById(("seatDetails" + requestType + indx)).value = "";
			document.getElementById(("genderCodeId" + requestType + indx)).value = "";
			document.getElementById(("passengerName" + requestType + indx)).value = "";
			document.getElementById(("passengerAge" + requestType + indx)).value = "";
			removePaxRow(requestType, indx, tblId);
			document.getElementById("currSeatIndex" + requestType).value = indx;
			return false;
		}
		var fvs = document.getElementById("femaleSeatSpanId" + requestType);
		if(fvs != null) {
			if(fvs.style.display == "none"){
				fvs.style.display = "";
			}
			fvs.innerHTML = tmsg;
			fvs.className = "errormsg";
		}
	}catch(e){
		
	}
}

function calendarMnYrSelectCC(id,minDays,maxDays,advDays) {
	$('#'+id).datepicker("destroy");
	var stateCode  = document.getElementById("stateCode").value;
	if(stateCode =='KA' ){
		var advDays = parseInt(advDays)+parseInt(minDays);
		$('#'+id).datepicker({ numberOfMonths: 1,minDate: +minDays,maxDate: advDays, dateFormat: 'dd/mm/yy', changeMonth: true
			, changeYear: true, yearRange: '1945:2030'}).val();
	}else{
		var advDays = parseInt(advDays)+parseInt(maxDays);
		$('#'+id).datepicker({ numberOfMonths: 1,minDate: +maxDays,maxDate: advDays, dateFormat: 'dd/mm/yy', changeMonth: true
			, changeYear: true, yearRange: '1945:2030'}).val();
	}
	
	
	
}

function resetDates() {
	document.getElementById("txtFromDate").value='';
	document.getElementById("txtToDate").value='';
	
}

function validateCCForm(onLoad){
	 var txtObj = null;
	 if(onLoad =='Y'){
		 var idNo = document.getElementById("idNo").value
		 txtObj = document.getElementById("serviceTypeId");
		 if( txtObj == null || txtObj.value == "0"){
			 alert("Please select a Service Type"); 
			 txtObj.focus();
		 	 return false;
		 }
		 else {
			 if(document.getElementById("selectedServiceTypeID") != null){
				 if(document.getElementById("selectedServiceTypeID").value == ""){
					 document.getElementById("selectedServiceTypeID").value=txtObj.value;
				 }else if(idNo == 1){
					 txtObj = document.getElementById("serviceTypeId");
					 document.getElementById("selectedServiceTypeID").value = txtObj.value;
				 }
				 else if(document.getElementById("selectedServiceTypeID").value != txtObj.value){
					 alert("Please select same Service Type");
					 txtObj.focus();
				 	 return false;
				 }
				 else if(document.getElementById("selectedServiceTypeID").value != txtObj.value){
					 alert("Please select same Service Type");
					 txtObj.focus();
				 	 return false;
				 }
			 }
			 
		 }
		 
		 txtObj = document.getElementById("fromPlaceName");
		 if( txtObj == null || txtObj.value == ""){
			 alert("Please enter From Place Name"); 
			 txtObj.focus();
		 	 return false;
		 }
		 txtObj = document.getElementById("toPlaceName");
		 if( txtObj == null || txtObj.value == ""){
			 alert("Please enter To Place Name"); 
			 txtObj.focus();
		 	 return false;
		 }
		 txtObj = document.getElementById("txtFromDate").value;
		 if( txtObj == null || txtObj == ""){
			 alert("Please select From Date"); 
			 txtObj.focus();
		 	 return false;
		 }
		 txtObj1 = document.getElementById("txtToDate").value;
		 if( txtObj1 == null || txtObj1 == ""){
			 alert("Please select To Date"); 
			 txtObj1.focus();
		 	 return false;
		 }
		 
		 var frmArr = txtObj.split("/");
		 var toArr = txtObj1.split("/");
		 
		 var f = new Date(frmArr[2], frmArr[1] - 1, frmArr[0]);
		 var t = new Date(toArr[2], toArr[1] - 1, toArr[0]);
		 
		 //var stDate = f.getDate() + "/" + (f.getMonth()+1) + "/" + f.getFullYear();
		// var enDate =  t.getDate() + "/" + (t.getMonth()+1) + "/" +  t.getFullYear();
		 
		 var stDate = new Date(f.getFullYear(),(f.getMonth()+1),f.getDate());
		 var enDate = new Date(t.getFullYear(),(t.getMonth()+1), t.getDate());
		 
		 //var date1 = new Date(stDate);
		 //var date2 = new Date(enDate);
		
		 
		 if(stDate > enDate){
			 alert(" To Date should be greater than From Date"); 
			 txtObj1.focus();
		 	 return false;
		 }
		 
		 txtObj3 = document.getElementById("startTime");
		 if( txtObj3 == null || txtObj3.value == "" || txtObj3.value == "0000" || txtObj3.value.length !=4){
				alert("Please Enter valid Start Time");
				txtObj3.focus();
				return false;
		 }
		 
		 txtObj4 = document.getElementById("endTime");
		 if( txtObj4 == null || txtObj4.value == "" || txtObj4.value == "0000" || txtObj4.value.length !=4){
				alert("Please Enter valid End Time");
				txtObj4.focus();
				return false;
		 }
		 
		 if(stDate.getTime() == enDate.getTime()){
		 if(txtObj3.value >= txtObj4.value){
			 alert(" End Time should be greater than Start Time"); 
			 txtObj4.focus();
		 	 return false;
		 }
		 }
		 txtObj = document.getElementById("stateCode");
		 if( txtObj == null || txtObj.value == ""){
			 alert("Please enter State"); 
			 txtObj.focus();
		 	 return false;
		 }
		 txtObj1 = document.getElementById("adults");
		 if( txtObj1.value != 0 && txtObj.value != 'KA'){
			 alert("Extra Passenger are allowed only within Kerala State"); 
			 txtObj1.focus();
		 	 return false;
		 }
	 } 
	 return true;
}

function validAlphabetCc(val) {
	return (/^[a-zA-Z ]*$/).test(val.toString());
	}

function validateAlphabetCC(txtObj, fieldName) {
	if(txtObj.value == "" || validAlphabetCc(txtObj.value)) {
		return true;
	} else {
		alert("Please enter valid " + fieldName);
		txtObj.value = "";
		txtObj.focus();
		return false;
	}
}

function validateBusRequest(obj){
	if(obj != null && obj.value != ''){
		if(obj.value == '9018' ){
			document.getElementById("showFromLabelDIV").style.display = "";
		}else{
			hidediv('showFromLabelDIV');
		}
		
	}
}


function submitCCForm(formObj){
	var agree = confirm("Are you sure you want to continue..");
	if (agree){
		formObj.submit();
	}
}	

function validTimeInterval(txtObj){
	if(txtObj.value.length!=4){
	alert("Please enter the time should be HHMM");
	txtObj.focus();
	   txtObj.value='0000';
	return false;
	}
	if(txtObj!=null){
	var startTime=txtObj.value;
	var hours=parseInt(txtObj.value.substring(0,2));
	var min=parseInt(txtObj.value.substring(2,5));
	if(hours>23){
	alert("Please enter the time should be less than 2359(HH:MM)");
	txtObj.focus();
	txtObj.value='0000';
	return false;
	}
	if(min>59){
	alert("Please enter the time should be less than 2359(HH:MM)");
	txtObj.focus();
	txtObj.value='0000';
	return false;
	}
	}
	}


function checkUserLoggedIn(fbType,feedBackCount,fromPlace,toPlace){
	 updateFeedBackStatus(fbType,feedBackCount,fromPlace,toPlace);
}

function updatePasswordNew(formObj){
	newPwd = document.getElementById("newPassword");
	 if( newPwd == null || newPwd.value == ""){
		 alert("Please enter Password"); 
		 newPwd.focus();
	 	 return false;
	 }
	 rePassword = document.getElementById("rePassword");
	 if( rePassword == null || rePassword.value == ""){
		 alert("Please enter Confirm Password"); 
		 rePassword.focus();
	 	 return false;
	 }
	 if( newPwd.value != rePassword.value){
		 alert("Password and Confrim Password must be same"); 
		 rePassword.focus();
		 return false;
	 }
	 formObj.submit();	 
	 
	 
}

function validatePkgBookingSearch(formObj, path,startPlaceId,endPlaceId,startPlaceName,endPlaceName) {
	if(startPlaceId == "" || startPlaceId == "0") {
		alert("Please select start place.");
		return false;
	}
	if(endPlaceId == "" || endPlaceId == "0") {
		alert("Please select end place.");
		return false;
	}
	if(startPlaceId == endPlaceId) {
		alert("End Place cannot be same as Start Place.");
		return false;
	}
	document.getElementById("startPlaceId").value = startPlaceId;
	document.getElementById("endPlaceId").value=endPlaceId;
	document.getElementById("fromPlaceName").value = startPlaceName;
	document.getElementById("toPlaceName").value = endPlaceName;

	formObj.action = path;
	formObj.submit();
}

function tatkalValidation(){
	var tatkalFlag = false;
	var isTatkalEnabled=document.getElementById("isTatkalEnabled").value;
	if(isTatkalEnabled=='true'){
		var tatkalFlag = document.getElementById("tatkalFlag").checked ;
	}
	
	if(tatkalFlag){
		document.getElementById("txtReturnJourneyDate").setAttribute("style","opacity: 0.5;pointer-events: none;cursor: default;");	
		document.getElementById("txtReturnJourneyDate").value = null;
		
	}	else
		document.getElementById("txtReturnJourneyDate").removeAttribute("style");

}

function hideConcessionTatkalBooking(){
	var tatkal = false;
	var isTatkalEnabled=document.getElementById("isTatkalEnabled").value;
	if(isTatkalEnabled=='true'){
		tatkal = document.getElementById("tatkalFlag").checked;
	}
	if(tatkal){
		document.getElementById("concessionId").setAttribute("style","opacity: 0.5;pointer-events: none;cursor: default;");	
	}else{
		document.getElementById("concessionId").removeAttribute("style");
	}
}

function validAlphabetOnly(val) {
	var reg = /^[a-zA-Z]+$/;
	return reg.test(val);
}

function enableSelectBoxesLink(position) {
	var srvListDiv;
	if (position == 2)
		srvListDiv = "#ForwardEndAvailableServicesDiv ";
	else
		srvListDiv = "#ForwardStartAvailableServicesDiv ";
	$(srvListDiv + 'div.selectBoxs' + position).each(
			function() {

				$(this).children('span.selected').html(
						$(this).children('div.selectOptions')
								.find('span.Clear').attr("value"));
				$(this).attr(
						'value',
						$(this).children('div.selectOptions').children(
								'label.selectOption:first').attr('value'));
				$(this).children('span.selected,span.selectArrow').click(
						function() {
							if ($(this).parent().children('div.selectOptions')
									.css('display') == 'none') {
								$(srvListDiv + 'div.selectOptions').css(
										'display', 'none');
								$('.p1').show();
								$('.p2').hide();
								$(this).parent().children('div.selectOptions')
										.css('display', 'block');
								$(this).parent().find('.p1').hide();
								$(this).parent().find('.p2').show();
							} else {
								$(this).parent().children('div.selectOptions')
										.css('display', 'none');
								$(this).parent().find('.p1').show();
								$(this).parent().find('.p2').hide();
							}
						});
			});
	$(srvListDiv + ".FilSearch").change(function() {
		if ($(this).prop("checked"))
			var Checked = 'CHKD' + $(this).attr("title");
		else
			var Checked = $(this).attr("title");
		if ($(this).attr("position"))
			var pos = $(this).attr("position");
		else
			var pos = '';

		FilSearch($(this).attr("name"), $(this).val(), Checked, pos)
	});
}

function validateLinkBookingSearch(formObj, path, linkPlaceId) {
	var txtObj;
	var t;
	txtObj = document.getElementById("fromPlaceName");
	if(txtObj.value == "" || txtObj.value == "0" || txtObj.value == "Leaving From:") {
		alert("Please select start place.");
		return false;
	}
	var sLady = getSingleLady();
	t = txtObj.value;
	txtObj = document.getElementById("toPlaceName");
	if(txtObj.value == "" || txtObj.value == "0" || txtObj.value == "Going To:") {
		alert("Please select end place.");
		return false;
	}
	
	if(t == txtObj.value) {
		alert("End Place cannot be same as Start Place.");
		return false;
	}
	if(document.getElementById("adultMale") != null)
		adultMale = document.getElementById("adultMale").value;
	
	if(document.getElementById("txtJourneyDate") != null)
		t = document.getElementById("txtJourneyDate").value;
	
	if(t != null && t != "" && !validateDate(t)) {
		// alert("Please select a valid Journey Date to continue.");
		$('#txtJourneyDate').datepicker("show");
		return false;
	}
	
	formObj.action = path+"?linkPlaceId="+linkPlaceId+"&linkType="+ "Start";
	formObj.submit();
}

var minutes =0, seconds = 0, xTm = 0, timer=0, timerLastRunDate, timerTimeGapToRun, timerCurrentCount, timerMaxRunCount;
function displayCounterTime(timerDv, actDiv, formObj, divName) {
	var momentTimerLastRunDate,momentTimerNextRunDate,momentCurrentDate;
	if(timerLastRunDate) {
		momentTimerLastRunDate = moment(new Date(timerLastRunDate));
		momentTimerNextRunDate = moment(momentTimerLastRunDate).add(Number(timerTimeGapToRun), 'seconds');
		momentCurrentDate = moment();
	}
  document.getElementById(timerDv).innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  // Time minutes and seconds
  if(seconds <= 1) {
  	seconds = 59;
    minutes--;
  }  else {
    seconds--;
  }
  if(!formObj) {
	  formObj = document.getElementById('phonePeTxnTimer');

  }
  //// first time default call check transation status for phonePe
  if(timer ==0) {
	  timer=timer+1;
	  path = formObj.action;
	  ajaxCommonActionSubmit('/booking/pg/resp/phonepe/pending.do?', divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
  }
 

  if(timerLastRunDate && momentCurrentDate && momentTimerNextRunDate && momentCurrentDate.isAfter(momentTimerNextRunDate)) {
	  console.log("condition pass running again");
	  path = formObj.action;
	  ajaxCommonActionSubmit('/booking/pg/resp/phonepe/pending.do?', divName, DIV_DEFAULT_WIDTH, DIV_DEFAULT_HEIGHT);
  }
  // If the count down is over, action on what to do next
  if (minutes < 0) {
    clearInterval(xTm);
    showdiv(actDiv);
    hidediv(timerDv);
    formObj.action=document.getElementById("contextPath").value+"/booking/pg/resp/phonepe/final/status.do";
    console.log("timer over");
    formObj.submit();
  }
}

function submitPhoneSuccessResponse(formObj) {
	formObj = document.getElementById('phonePeTxnFinalStatus');
	formObj.submit();
}
function setSelectedPg(v) {
	document.getElementById("pgId").value = v;
	setSelectedColor();
}

function validateFeedbackForm(formObj, path) {
	if (document.getElementById("name").value == "") {
		alert("Enter Full Name");
		document.getElementById("name").focus();
		return false;
	}
	if (Number(document.getElementById("mobileNo").value) == 0 || document.getElementById("mobileNo").value == "") {
		alert("Enter Contact Number");
		return false;
	}
	if (document.getElementById("email").value == "") {
		alert("Enter eMail");
		document.getElementById("email").focus();
		return false;
	}
	if (document.getElementById("pnrPrefixWithTktNo").value == "") {
		alert("Enter Ticket No");
		document.getElementById("pnrPrefixWithTktNo").focus();
		return false;
	}
	if (document.getElementById("serviceCode").value == "") {
		alert("Enter Service Code");
		document.getElementById("serviceCode").focus();
		return false;
	}
	if (document.getElementById("txtJourneyDate").value == "") {
		alert("Enter Journey Date");
		document.getElementById("txtJourneyDate").focus();
		return false;
	}
	if (document.getElementById("feedbackOrComplaint_feedback").checked == false && document.getElementById("feedbackOrComplaint_Complaint").checked == false) {
		alert("Select Feedback/Complaint");
		document.getElementById("feedbackOrComplaint_feedback").focus();
		return false;
	}
	if (document.getElementById("feedbackOrComplaint_feedback").checked == true) {
		if (document.getElementById("departPunctuality").value == "0" || document.getElementById("departPunctuality").value == "") {
			alert("Give Rating for Departure Punctuality");
			return false;
		}
		if (document.getElementById("arrivalPunctuality").value == "0" || document.getElementById("arrivalPunctuality").value == "") {
			alert("Give Rating for Arrival Punctuality");
			return false;
		}
		if (document.getElementById("upkeepBus").value == "0" || document.getElementById("upkeepBus").value == "") {
			alert("Give Rating for Upkeep of Bus");
			return false;
		}
		if (document.getElementById("busFacilities").value == "0" || document.getElementById("busFacilities").value == "") {
			alert("Give Rating for Facilities in the bus");
			return false;
		}
		if (document.getElementById("crewBehavior").value == "0" || document.getElementById("crewBehavior").value == "") {
			alert("Give Rating for Crew Behaviour");
			return false;
		}
		if (document.getElementById("ticketBooking").value == "0" || document.getElementById("ticketBooking").value == "") {
			alert("Give Rating for Online Ticket booking experience");
			return false;
		}
		if (document.getElementById("tripSafety").value == "0" || document.getElementById("tripSafety").value == "") {
			alert("Give Rating for Trip Safety");
			return false;
		}
		if (document.getElementById("ovarallRating").value == "0" || document.getElementById("ovarallRating").value == "") {
			alert("Give Rating for Overall Rating");
			return false;
		}
	}
	if (document.getElementById("feedbackOrComplaint_Complaint").checked == true) {
		if (document.getElementById("feedBackTypeId").value == "") {
			alert("Select Complaint Category");
			document.getElementById("feedBackTypeId").focus();
			return false;
		}
	}
	if (document.getElementById("suggestions").value == "") {
		alert("Enter Remarks / Suggestions");
		document.getElementById("suggestions").focus();
		return false;
	}
	formObj.action = path;
	formObj.submit();
}

function displayFeedbackDetails(){
	if(document.getElementById("feedbackOrComplaint_feedback").checked == true) {
		document.getElementById("complaints_category_tr").style.display = "none";
		document.getElementById("feedback_details_tr1").style.display = "";
		document.getElementById("feedback_details_tr2").style.display = "";
		document.getElementById("feedback_details_tr3").style.display = "";
		document.getElementById("feedback_details_tr4").style.display = "";
		document.getElementById("feedback_details_tr5").style.display = "";
		document.getElementById("feedback_details_tr6").style.display = "";
		document.getElementById("feedback_details_tr7").style.display = "";
		document.getElementById("feedback_details_tr8").style.display = "";
		document.getElementById("feedback_details_tr9").style.display = "";
	} else {
		document.getElementById("complaints_category_tr").style.display = "";
		document.getElementById("feedback_details_tr1").style.display = "none";
		document.getElementById("feedback_details_tr2").style.display = "none";
		document.getElementById("feedback_details_tr3").style.display = "none";
		document.getElementById("feedback_details_tr4").style.display = "none";
		document.getElementById("feedback_details_tr5").style.display = "none";
		document.getElementById("feedback_details_tr6").style.display = "none";
		document.getElementById("feedback_details_tr7").style.display = "none";
		document.getElementById("feedback_details_tr8").style.display = "none";
		document.getElementById("feedback_details_tr9").style.display = "none";
	}
}

function storeRating(ratingFor, rating, obj) {
	var objForm = document.forms[0];
	if(ratingFor =="ticketBooking") {
		for(var i=0;i<=4;i++) {
			document.getElementById("ticketBooking"+i).style.color = "";
			document.getElementById("ticketBooking"+i).className  = "fa fa-star-o fa-lg";
		}
		for(var i=0;i<=rating;i++) {
			document.getElementById("ticketBooking"+i).className  = "fa fa-star fa-lg";
			document.getElementById("ticketBooking"+i).style.color = "#ffcc00";
		}
		PUNC_OVERALL_RATING = rating+1;
		document.getElementById("ticketBooking").value = PUNC_OVERALL_RATING;
		
	}
	else if(ratingFor =="departPunctuality") {
		for(var i=0;i<=4;i++) {
			document.getElementById("departPunctuality"+i).style.color = "";
			document.getElementById("departPunctuality"+i).className  = "fa fa-star-o fa-lg";
		}
		for(var i=0;i<=rating;i++) {
			document.getElementById("departPunctuality"+i).className  = "fa fa-star fa-lg";
			document.getElementById("departPunctuality"+i).style.color = "#ffcc00";
		}
		PUNC_OVERALL_RATING = rating+1;
		document.getElementById("departPunctuality").value = PUNC_OVERALL_RATING;
		
	}
	else if(ratingFor =="arrivalPunctuality") {
		for(var i=0;i<=4;i++) {
			document.getElementById("arrivalPunctuality"+i).style.color = "";
			document.getElementById("arrivalPunctuality"+i).className  = "fa fa-star-o fa-lg";
		}
		for(var i=0;i<=rating;i++) {
			document.getElementById("arrivalPunctuality"+i).className  = "fa fa-star fa-lg";
			document.getElementById("arrivalPunctuality"+i).style.color = "#ffcc00";
		}
		PUNC_OVERALL_RATING = rating+1;
		document.getElementById("arrivalPunctuality").value = PUNC_OVERALL_RATING;
		
	}
	else if(ratingFor =="upkeepBus") {
		for(var i=0;i<=4;i++) {
			document.getElementById("upkeepBus"+i).style.color = "";
			document.getElementById("upkeepBus"+i).className  = "fa fa-star-o fa-lg";
		}
		for(var i=0;i<=rating;i++) {
			document.getElementById("upkeepBus"+i).style.color = "#ffcc00";
			document.getElementById("upkeepBus"+i).className  = "fa fa-star fa-lg";
		}
		PUNC_OVERALL_RATING = rating+1;
		document.getElementById("upkeepBus").value = PUNC_OVERALL_RATING;
		
	}
	else if(ratingFor =="busFacilities") {
		for(var i=0;i<=4;i++) {
			document.getElementById("busFacilities"+i).style.color = "";
			document.getElementById("busFacilities"+i).className  = "fa fa-star-o fa-lg";
		}
		for(var i=0;i<=rating;i++) {
			document.getElementById("busFacilities"+i).style.color = "#ffcc00";
			document.getElementById("busFacilities"+i).className  = "fa fa-star fa-lg";
		}
		PUNC_OVERALL_RATING = rating+1;
		document.getElementById("busFacilities").value = PUNC_OVERALL_RATING;
		
	}
	else if(ratingFor =="crewBehavior") {
		for(var i=0;i<=4;i++) {
			document.getElementById("crewBehavior"+i).style.color = "";
			document.getElementById("crewBehavior"+i).className  = "fa fa-star-o fa-lg";
		}
		for(var i=0;i<=rating;i++) {
			document.getElementById("crewBehavior"+i).style.color = "#ffcc00";
			document.getElementById("crewBehavior"+i).className  = "fa fa-star fa-lg";
		}
		PUNC_OVERALL_RATING = rating+1;
		document.getElementById("crewBehavior").value = PUNC_OVERALL_RATING;
		
	}
	else if(ratingFor =="tripSafety") {
		for(var i=0;i<=4;i++) {
			document.getElementById("tripSafety"+i).style.color = "";
			document.getElementById("tripSafety"+i).className  = "fa fa-star-o fa-lg";
		}
		for(var i=0;i<=rating;i++) {
			document.getElementById("tripSafety"+i).style.color = "#ffcc00";
			document.getElementById("tripSafety"+i).className  = "fa fa-star fa-lg";
		}
		PUNC_OVERALL_RATING = rating+1;
		document.getElementById("tripSafety").value = PUNC_OVERALL_RATING;
		
	}
	else if(ratingFor =="ovarallRating") {
		for(var i=0;i<=4;i++) {
			document.getElementById("ovarallRating"+i).style.color = "";
			document.getElementById("ovarallRating"+i).className  = "fa fa-star-o fa-lg";
		}
		for(var i=0;i<=rating;i++) {
			document.getElementById("ovarallRating"+i).style.color = "#ffcc00";
			document.getElementById("ovarallRating"+i).className  = "fa fa-star fa-lg";
		}
		PUNC_OVERALL_RATING = rating+1;
		document.getElementById("ovarallRating").value = PUNC_OVERALL_RATING;
		
	}
}

function resetRating(formObj) {
	document.getElementById("ticketBooking").value = "";
	document.getElementById("ovarallRating").value = "";
	document.getElementById("crewBehavior").value = ""
	document.getElementById("busFacilities").value = "";
	document.getElementById("departPunctuality").value = "";
	document.getElementById("arrivalPunctuality").value = "";
	document.getElementById("upkeepBus").value = "";
	document.getElementById("tripSafety").value = "";
	for(var i=0;i<=4;i++) {
		document.getElementById("ticketBooking"+i).style.color = "";
		document.getElementById("ovarallRating"+i).style.color = "";
		document.getElementById("crewBehavior"+i).style.color = "";
		document.getElementById("busFacilities"+i).style.color = "";
		document.getElementById("departPunctuality"+i).style.color = "";
		document.getElementById("arrivalPunctuality"+i).style.color = "";
		document.getElementById("upkeepBus"+i).style.color = "";
		document.getElementById("tripSafety"+i).style.color = "";
	}
}// end of resetRating()

function isValidPnrNumber(txtObj) {
	var val = txtObj.value;
	if(!val.match("^[a-zA-Z][0-9]+$")) {
		alert("Please enter valid Pnr no.");
	}
}
function isValidName(id) {
	var val = document.getElementById(id).value;
	if(!val) {
		alert("Please enter Full Name.");
		return false;
	}
	if(!val.match("^[a-zA-Z ]*$")) {
		alert("Please enter valid Full Name.");
		document.getElementById(id).value = "";
		document.getElementById(id).focus();
		return false;
	}
}
function isValidTripCode(obj) {
	var val = obj.value;
	if(!val.match("^[A-Za-z0-9]*$")) {
		alert("Please enter valid Trip Code.");
		obj.value = "";
		obj.focus();
		return false;
	}
}
function getTicketBookingDetails(path, id, encryptedId) {
	var formObj = document.getElementById(id);
	if(document.getElementById("encryptedBookingId") && encryptedId) {
		document.getElementById("encryptedBookingId").value = encryptedId;
	}
	formObj.action = path;
	formObj.submit();
}

