import valid from "card-validator";

export default function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.cardNumber);

  creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
  creditCard.cvv = valid.cvv(values.cardSecurityCode);
  creditCard.cardholderName = valid.cardholderName(values.cardName);

  errors.show = true;
  errors.variant = "danger";
  errors.message = "An unknown error occured. Please try again later";
  errors.cname = false;
  errors.cnumber = false;
  errors.cexp = false;
  errors.ccvv = false;
  errors.country = false;
  errors.existingCard = false;
  errors.bannedCountry = false;

  //Card CVV expiration
  if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
    errors.message = "Credit card CVC is not complete";
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message = "Credit card CVC is invalid";
  }

  //Card Expiration Verification
  if (values.cardExpiration === null || !values.cardExpiration.trim()) {
    errors.message = "Credit card expiration date is not complete";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Credit card expiration date is invalid";
  }

  //Card Number Verification
  if (values.cardNumber === null || !values.cardNumber.trim()) {
    errors.message = "Credit card number is not complete";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
  }

  //Cardholder Name Verification
  if (values.cardName === null || !values.cardName.trim()) {
    errors.message = "Cardholder name is not complete";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Cardholder name is invalid";
  }

  const countryExists = values.bannedCountries.some((country) => {
    if (country === values.country) {
      return true;
    }
    return false;
  });

  //Country Verification
  if (values.country.trim() === "") {
    errors.message = "Country is not complete";
  } else {
    errors.country = true;
  }

  if (countryExists) {
    errors.message = "Country is blacklisted";
  } else {
    errors.bannedCountry = true;
  }

  const cardExists = values.validCards.some((card) => {
    if (card === values.cardNumber) {
      return true;
    }
    return false;
  });
  if (cardExists) {
    errors.message = "This card has already been added";
  } else {
    errors.existingCard = true;
  }

  if (
    errors.cname &&
    errors.cnumber &&
    errors.cexp &&
    errors.ccvv &&
    errors.country &&
    errors.existingCard &&
    errors.bannedCountry
  ) {
    errors.variant = "success";
    errors.message = "Credit Card is valid";
  }

  return errors;
}
