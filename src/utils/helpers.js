/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

function renderClassName() {
  return [...arguments].filter((value) => Boolean(value)).join(" ");
}

function renderStyle() {
  return Object.assign({}, ...arguments);
}

const offset = (element) => {
  const { top, left, height, width } = element.getBoundingClientRect();

  return { top, left, height, width };
};

const useMedia = (mediaQuery) => {
  const newMediaQuery = mediaQuery ? mediaQuery.replace("@media ", "") : "";
  const mediaQueryList = window.matchMedia(newMediaQuery);

  const getValue = () => {
    return mediaQueryList.matches;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryList.addListener(handler);

    return () => mediaQueryList.removeListener(handler);
  }, []);

  return value;
};

const validateEmail = (email) => {
  const regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  return regEx.test(email);
};

const validateNotEmptyString = (string) => {
  return (string || string === 0) && Boolean(String(string).trim());
};

const validatePhoneNumber = (phoneNumber) => {
  const phone = phoneNumber.replace(/^\+62/, "0");
  const regEx = /^[0]+\d{9,12}$/;

  return regEx.test(phone);
};

const validateURL = (url) => {
  const regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

  return regEx.test(url);
};

export {
  renderClassName,
  renderStyle,
  offset,
  useMedia,
  validateEmail,
  validateNotEmptyString,
  validatePhoneNumber,
  validateURL,
};
