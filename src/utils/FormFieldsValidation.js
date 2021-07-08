export function checkTextField(fieldValue) {
  if (typeof fieldValue === undefined || fieldValue === "") {
    return false;
  }
  return true;
}

export function checkDateField(fieldValue) {
  if (typeof fieldValue !== undefined && fieldValue !== "") {
    var isValid = isValidDate(fieldValue);
    if (!isValid) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

function isValidDate(dateValue) {
  try {
    var inputDate = new Date(dateValue);
    console.log("Input date: ", inputDate);
    return true;
  } catch (error) {
    return false;
  }
}

export function greaterThanCurrentDate(dateValue) {
  var inputDate = new Date(dateValue);
  var currentDate = new Date();
  if (inputDate > currentDate) {
    return false;
  } else {
    return true;
  }
}

export function greaterThanFirstDate(dateValue1, dateValue2) {
  var inputDate1 = new Date(dateValue1);
  var inputDate2 = new Date(dateValue2);
  if (inputDate2 > inputDate1) {
    return false;
  } else {
    return true;
  }
}

export function checkNumberField(fieldValue) {
  const numberValue = parseFloat(fieldValue);
  if (isNaN(numberValue)) {
    return false;
  }
  return true;
}
