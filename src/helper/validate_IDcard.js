validThaiID = (idCardNumber) => {
  const regex = /^[0-9]\d*$/;
  if (
    idCardNumber.length === 13 &&
    idCardNumber.match(regex) &&
    idCardNumber !== null &&
    idCardNumber !== "undefined"
  ) {
    // Check valid id card number
    return idCardCheck(idCardNumber);
  } else {
    return false;
  }
};

idCardCheck = (idCardNumber) => {
  let sum = 0;
  for (let i = 0; i < idCardNumber.length - 1; i++) {
    sum += parseInt(idCardNumber[i]) * (13 - i);
  }

  let checkDigit = (11 - (sum % 11)) % 10;

  if (checkDigit == idCardNumber[12]) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  validThaiID,
};
