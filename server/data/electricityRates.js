const rates = {
  "Haryana": 7.5,
  "Punjab": 7.0,
  "Delhi": 8.0,
  "Rajasthan": 6.5,
  "Uttar Pradesh": 6.5,
  "Maharashtra": 9.0,
  "Karnataka": 7.5,
  "Tamil Nadu": 7.0,
  "Gujarat": 5.5,
  "West Bengal": 7.0,
  "Madhya Pradesh": 6.5,
  "Andhra Pradesh": 8.0,
  "Telangana": 8.5,
  "Kerala": 5.5,
  "Bihar": 6.5,
  "default": 7.0
};

function getRateByState(stateName) {
  return rates[stateName] || rates["default"];
}

module.exports = { getRateByState };