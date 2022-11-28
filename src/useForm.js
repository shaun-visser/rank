import { useEffect, useMemo, useState } from "react";
import validateInfo from "./validateInfo";
import validateCountries from "./validateCountries";
import countryList from "react-select-country-list";

const useForm = () => {
  const [values, setValues] = useState({
    cardName: "",
    cardNumber: "",
    cardExpiration: "",
    cardSecurityCode: "",
    country: "",
    validCards: [],
    bannedCountries: [],
    addCountry: "",
    focus: "",
  });

  const options = useMemo(() => countryList().getData(), []);

  const [errors, setErrors] = useState({});
  const [blacklistErrors, setBlacklistErrors] = useState({});

  const handleFocus = (e) => {
    setValues({
      ...values,
      focus: e.target.name === "cardSecurityCode" ? "cvc" : e.target.name,
    });
  };

  const handleChange = (e) => {
    let name = "";
    let value = "";
    if (e.target) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = "country";
      value = e.label;
    }
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAddChange = (e) => {
    setValues({
      ...values,
      addCountry: e.label,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validateInfo(values));
  };

  const addCountry = (e) => {
    e.preventDefault();
    setBlacklistErrors(validateCountries(values));
  };

  const removeCountry = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      bannedCountries: [
        ...values.bannedCountries.filter((item) => item !== values.addCountry),
      ],
    });
  };

  useEffect(() => {
    if (errors.message === "Credit Card is valid") {
      setValues({
        ...values,
        validCards: [...values.validCards, values.cardNumber],
      });
    }
    // eslint-disable-next-line
  }, [errors]);

  useEffect(() => {
    if (blacklistErrors.blackListExists) {
      setValues({
        ...values,
        bannedCountries: [...values.bannedCountries, values.addCountry],
      });
    }
    // eslint-disable-next-line
  }, [blacklistErrors]);

  return {
    handleChange,
    handleFocus,
    handleSubmit,
    addCountry,
    removeCountry,
    handleAddChange,
    values,
    options,
    errors,
    blacklistErrors,
  };
};

export default useForm;
