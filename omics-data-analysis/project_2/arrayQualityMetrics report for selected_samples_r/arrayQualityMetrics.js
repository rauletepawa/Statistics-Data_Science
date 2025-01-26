// (C) Wolfgang Huber 2010-2011

// Script parameters - these are set up by R in the function 'writeReport' when copying the 
//   template for this script from arrayQualityMetrics/inst/scripts into the report.

var highlightInitial = [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false ];
var arrayMetadata    = [ [ "1", "GSM330532.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "01/24/06 15:27:13" ], [ "2", "GSM330559.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "02/09/06 13:42:02" ], [ "3", "GSM330566.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "03/21/06 12:54:21" ], [ "4", "GSM330571.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "01/05/06 11:53:12" ], [ "5", "GSM330580.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "10/28/05 13:47:24" ], [ "6", "GSM330584.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "03/21/06 16:22:10" ], [ "7", "GSM330593.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "03/28/06 12:30:01" ], [ "8", "GSM330603.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "02/09/06 12:02:45" ], [ "9", "GSM330611.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "11/17/05 20:02:47" ], [ "10", "GSM330612.CEL", "AML", "Acute Myelogenous Leukemia", "AML with normal karyotype and other abnormalities", "12/02/05 12:26:56" ], [ "11", "GSM331377.CEL", "CML", "Chronic Myelogenous Leukemia", "", "03/02/06 18:54:30" ], [ "12", "GSM331378.CEL", "CML", "Chronic Myelogenous Leukemia", "", "12/20/05 12:15:54" ], [ "13", "GSM331381.CEL", "CML", "Chronic Myelogenous Leukemia", "", "02/21/06 17:24:10" ], [ "14", "GSM331382.CEL", "CML", "Chronic Myelogenous Leukemia", "", "12/14/06 11:26:34" ], [ "15", "GSM331386.CEL", "CML", "Chronic Myelogenous Leukemia", "", "01/05/06 12:40:24" ], [ "16", "GSM331387.CEL", "CML", "Chronic Myelogenous Leukemia", "", "11/16/05 13:06:54" ], [ "17", "GSM331389.CEL", "CML", "Chronic Myelogenous Leukemia", "", "01/13/06 12:19:54" ], [ "18", "GSM331390.CEL", "CML", "Chronic Myelogenous Leukemia", "", "02/03/06 12:50:50" ], [ "19", "GSM331392.CEL", "CML", "Chronic Myelogenous Leukemia", "", "12/07/06 11:31:07" ], [ "20", "GSM331393.CEL", "CML", "Chronic Myelogenous Leukemia", "", "01/25/06 11:06:27" ], [ "21", "GSM331660.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "11/29/05 18:49:28" ], [ "22", "GSM331661.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "03/02/06 21:16:20" ], [ "23", "GSM331663.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "11/29/05 16:55:12" ], [ "24", "GSM331666.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "11/29/05 17:59:40" ], [ "25", "GSM331671.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "01/13/06 17:17:33" ], [ "26", "GSM331672.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "02/16/06 11:54:36" ], [ "27", "GSM331673.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "10/06/05 13:26:10" ], [ "28", "GSM331674.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "01/17/06 14:57:22" ], [ "29", "GSM331675.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "02/10/06 18:49:56" ], [ "30", "GSM331677.CEL", "NoL", "Non-leukemia and healthy bone marrow", "", "11/29/05 17:07:42" ] ];
var svgObjectNames   = [ "pca", "dens" ];

var cssText = ["stroke-width:1; stroke-opacity:0.4",
               "stroke-width:3; stroke-opacity:1" ];

// Global variables - these are set up below by 'reportinit'
var tables;             // array of all the associated ('tooltips') tables on the page
var checkboxes;         // the checkboxes
var ssrules;


function reportinit() 
{
 
    var a, i, status;

    /*--------find checkboxes and set them to start values------*/
    checkboxes = document.getElementsByName("ReportObjectCheckBoxes");
    if(checkboxes.length != highlightInitial.length)
	throw new Error("checkboxes.length=" + checkboxes.length + "  !=  "
                        + " highlightInitial.length="+ highlightInitial.length);
    
    /*--------find associated tables and cache their locations------*/
    tables = new Array(svgObjectNames.length);
    for(i=0; i<tables.length; i++) 
    {
        tables[i] = safeGetElementById("Tab:"+svgObjectNames[i]);
    }

    /*------- style sheet rules ---------*/
    var ss = document.styleSheets[0];
    ssrules = ss.cssRules ? ss.cssRules : ss.rules; 

    /*------- checkboxes[a] is (expected to be) of class HTMLInputElement ---*/
    for(a=0; a<checkboxes.length; a++)
    {
	checkboxes[a].checked = highlightInitial[a];
        status = checkboxes[a].checked; 
        setReportObj(a+1, status, false);
    }

}


function safeGetElementById(id)
{
    res = document.getElementById(id);
    if(res == null)
        throw new Error("Id '"+ id + "' not found.");
    return(res)
}

/*------------------------------------------------------------
   Highlighting of Report Objects 
 ---------------------------------------------------------------*/
function setReportObj(reportObjId, status, doTable)
{
    var i, j, plotObjIds, selector;

    if(doTable) {
	for(i=0; i<svgObjectNames.length; i++) {
	    showTipTable(i, reportObjId);
	} 
    }

    /* This works in Chrome 10, ssrules will be null; we use getElementsByClassName and loop over them */
    if(ssrules == null) {
	elements = document.getElementsByClassName("aqm" + reportObjId); 
	for(i=0; i<elements.length; i++) {
	    elements[i].style.cssText = cssText[0+status];
	}
    } else {
    /* This works in Firefox 4 */
    for(i=0; i<ssrules.length; i++) {
        if (ssrules[i].selectorText == (".aqm" + reportObjId)) {
		ssrules[i].style.cssText = cssText[0+status];
		break;
	    }
	}
    }

}

/*------------------------------------------------------------
   Display of the Metadata Table
  ------------------------------------------------------------*/
function showTipTable(tableIndex, reportObjId)
{
    var rows = tables[tableIndex].rows;
    var a = reportObjId - 1;

    if(rows.length != arrayMetadata[a].length)
	throw new Error("rows.length=" + rows.length+"  !=  arrayMetadata[array].length=" + arrayMetadata[a].length);

    for(i=0; i<rows.length; i++) 
 	rows[i].cells[1].innerHTML = arrayMetadata[a][i];
}

function hideTipTable(tableIndex)
{
    var rows = tables[tableIndex].rows;

    for(i=0; i<rows.length; i++) 
 	rows[i].cells[1].innerHTML = "";
}


/*------------------------------------------------------------
  From module 'name' (e.g. 'density'), find numeric index in the 
  'svgObjectNames' array.
  ------------------------------------------------------------*/
function getIndexFromName(name) 
{
    var i;
    for(i=0; i<svgObjectNames.length; i++)
        if(svgObjectNames[i] == name)
	    return i;

    throw new Error("Did not find '" + name + "'.");
}


/*------------------------------------------------------------
  SVG plot object callbacks
  ------------------------------------------------------------*/
function plotObjRespond(what, reportObjId, name)
{

    var a, i, status;

    switch(what) {
    case "show":
	i = getIndexFromName(name);
	showTipTable(i, reportObjId);
	break;
    case "hide":
	i = getIndexFromName(name);
	hideTipTable(i);
	break;
    case "click":
        a = reportObjId - 1;
	status = !checkboxes[a].checked;
	checkboxes[a].checked = status;
	setReportObj(reportObjId, status, true);
	break;
    default:
	throw new Error("Invalid 'what': "+what)
    }
}

/*------------------------------------------------------------
  checkboxes 'onchange' event
------------------------------------------------------------*/
function checkboxEvent(reportObjId)
{
    var a = reportObjId - 1;
    var status = checkboxes[a].checked;
    setReportObj(reportObjId, status, true);
}


/*------------------------------------------------------------
  toggle visibility
------------------------------------------------------------*/
function toggle(id){
  var head = safeGetElementById(id + "-h");
  var body = safeGetElementById(id + "-b");
  var hdtxt = head.innerHTML;
  var dsp;
  switch(body.style.display){
    case 'none':
      dsp = 'block';
      hdtxt = '-' + hdtxt.substr(1);
      break;
    case 'block':
      dsp = 'none';
      hdtxt = '+' + hdtxt.substr(1);
      break;
  }  
  body.style.display = dsp;
  head.innerHTML = hdtxt;
}
