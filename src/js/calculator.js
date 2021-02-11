const miles_KMs = distInMiles => distInMiles / 0.62137;
const roundoff = (num, dp) => Number(Math.round(num + "e" + dp) + "e-" + dp);

module.exports = {
  miles_KMs,
  roundoff,
};