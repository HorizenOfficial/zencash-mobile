export function urlAppend (url, param) {
  if (url.substr(-1) !== '/'){
    url = url + '/'
  }

  return url + param
}