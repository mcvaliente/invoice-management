export function checkTextField(fieldValue) {
  if (typeof fieldValue === undefined || fieldValue === "") {
    return false;
  }
  return true;
}

export function checkDateField(fieldValue) {
  if (typeof fieldValue !== undefined && fieldValue !== "") {
    //Check that the field is dd/mm/aaaa
    var isValid = isValidDate(fieldValue);
    if (!isValid) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

//Expected input dd/mm/yyyy or dd.mm.yyyy or dd-mm-yyyy
//We program it only for dd/mm/yyyy
function isValidDate(dateValue) {
  //First we check that we have 10 characters (dd/mm/yyyy)
  if (dateValue.length !== 10) {
    return false;
  } else {
    //var separators = ['\\.', '\\-', '\\/'];
    var separators = ["\\/"];
    var dateParts = dateValue.split(new RegExp(separators.join("|"), "g"));
    //console.log("DateParts[0]: " + dateParts[0]);
    //console.log("DateParts[1]: " + dateParts[1]);
    //console.log("DateParts[2]: " + dateParts[2]);
    var inputDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    //console.log("Input Date: " + inputDate);
    var dateMonth = parseInt(inputDate.getMonth()) + 1;
    //console.log("dateMonth: " + dateMonth);
    //console.log("fullYear: " + inputDate.getFullYear());
    var strDateMonth = dateMonth.toString();
    var strZero = "0";
    return (
      inputDate.getFullYear().toString() === dateParts[2] &&
      (strDateMonth === dateParts[1] ||
        strZero.concat(strDateMonth) === dateParts[1])
    );
  }
}

export function greaterThanCurrentDate(dateValue) {
  //dateValue with the format dd/mm/aaaa
  var separators = ["\\/"];
  var dateParts = dateValue.split(new RegExp(separators.join("|"), "g"));
  var inputDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  var currentDate = new Date();
  if (inputDate > currentDate) {
    return false;
  } else {
    return true;
  }
}
