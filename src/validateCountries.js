export default function validateCountries(values) {
  let errors = {};
  errors.show = true;
  errors.variant = "danger";
  errors.message = "An unknown error occured. Please try again later";
  errors.empty = false;
  errors.blackListExists = false;

  const countryExists = values.bannedCountries.some((country) => {
    if (country === values.addCountry) {
      return true;
    }
    return false;
  });
  if (values.addCountry.trim() === "") {
    errors.message = "Select a country";
  } else {
    errors.empty = true;
  }
  if (countryExists) {
    errors.message = "This country has already been blacklisted";
  } else {
    errors.blackListExists = true;
  }

  if (errors.blackListExists && errors.empty) {
    errors.variant = "success";
    errors.message = "Country list updated";
  }

  return errors;
}
