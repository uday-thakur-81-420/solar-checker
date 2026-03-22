const axios = require("axios");

async function getSolarData(lat, lng) {
  const response = await axios.get(
    "https://power.larc.nasa.gov/api/temporal/climatology/point",
    {
      params: {
        parameters: "ALLSKY_SFC_SW_DWN",
        community: "RE",
        longitude: lng,
        latitude: lat,
        format: "JSON"
      }
    }
  );

  const data = response.data.properties.parameter.ALLSKY_SFC_SW_DWN;

  const monthly = {
    Jan: data.JAN, Feb: data.FEB, Mar: data.MAR,
    Apr: data.APR, May: data.MAY, Jun: data.JUN,
    Jul: data.JUL, Aug: data.AUG, Sep: data.SEP,
    Oct: data.OCT, Nov: data.NOV, Dec: data.DEC,
  };

  const annualAverage = data.ANN;

  return { monthly, annualAverage };
}

module.exports = { getSolarData };
