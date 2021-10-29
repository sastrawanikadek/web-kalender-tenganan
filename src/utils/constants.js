const DISPATCH_SET_VALUE = "SET_VALUE";
const DISPATCH_SET_BULK_VALUE = "SET_BULK_VALUE";
const DISPATCH_SET_TOAST = "SET_TOAST";
const DISPATCH_SET_CLOSE_TOAST = "SET_CLOSE_TOAST";

const INVALID_EMAIL_MESSAGE =
  "Mohon masukkan alamat email yang valid.\nContoh: user@example.com";
const INVALID_PHONE_NUMBER_MESSAGE =
  "Please input valid phone number.\nExample: 0812345678 or +62812345678";
const INVALID_URL_MESSAGE =
  "Please input valid URL.\nExample: https://example.com";
const INVALID_REQUIRED_MESSAGE = "Kolom ini wajib diisi.";
const INVALID_ERROR_MESSAGE = "Please input valid value.";

const TODAY = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);
const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const SASIH = [
  "",
  "Kasa",
  "Karo",
  "Katiga",
  "Kapat",
  "Kapat Sep",
  "Kalima",
  "Kanem",
  "Kapitu",
  "Kaulu",
  "Kasanga",
  "Kadasa",
  "Desta",
  "Sada",
  "Semua Sasih",
];
const SASIH_DATE_TYPE = ["", "Hud", "Tang"];
const SECRET_KEY = "12234597asdas7982131";

const BASE_URL = "https://server-kalender-tenganan.000webhostapp.com";

export {
  DISPATCH_SET_VALUE,
  DISPATCH_SET_BULK_VALUE,
  DISPATCH_SET_TOAST,
  DISPATCH_SET_CLOSE_TOAST,
  INVALID_EMAIL_MESSAGE,
  INVALID_PHONE_NUMBER_MESSAGE,
  INVALID_URL_MESSAGE,
  INVALID_REQUIRED_MESSAGE,
  INVALID_ERROR_MESSAGE,
  TODAY,
  DAYS,
  SASIH,
  SASIH_DATE_TYPE,
  SECRET_KEY,
  BASE_URL,
};
