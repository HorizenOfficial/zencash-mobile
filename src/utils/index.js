// appends urls
export function urlAppend (url, param) {
  if (url.substr(-1) !== '/') {
    url = url + '/'
  }

  return url + param
}

// Check if input are decimals
export function checkDec (v) {
  var ex = /^[0-9]+\.?[0-9]*$/
  if (ex.test(v) === false) {
    v = v.substring(0, v.length - 1)
  }
  return v
}

// Helper function to format prices to decimal places
// of 5 by default
export function prettyFormatPrices (v, decimalPlaces = 5) {
  return parseFloat(v).toFixed(decimalPlaces)
}
