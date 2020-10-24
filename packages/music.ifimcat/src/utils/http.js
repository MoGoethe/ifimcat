import axios from "axios"

function serialiseObject(obj) {
  const prefix = '?'

  if (obj && Object.keys(obj).length) {
    return prefix + Object.keys(obj).map(key =>
      `${key}=${encodeURIComponent(obj[key])}`,
    ).join('&')
  }

  return ''
}


function getUrl(path, params) {
  const isProd = process.env.NODE_ENV === 'production'
  const server = isProd ? '/' : '/api/'

  if (path.startsWith('http:')) {
    return path + serialiseObject(params)
  }

  return server + path + serialiseObject(params)
}

function checkStatus(res) {
  if (res.status === 401) {
    console.log("401")
  }

  if (res.status >= 200 && res.status < 300) {
    return res
  }

  const error = new Error(res.statusText)
  error.res = res
  throw error
}
/*
function getHeaders() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: sessionStorage.token,
  }
}
*/
const http = {
  async get(path, params) {
    const url = getUrl(path, params)
    
    try {
      const response = await axios.get(url)
      const checkedResponse = await checkStatus(response)
      return checkedResponse
    } catch (err) {
      throw new Error(err)
    }

  },
  async post(path, params) {
    const url = getUrl(path)
    const options = params

    try {
      const response = await axios.post(url, options)
      const checkedResponse = await checkStatus(response)
      return checkedResponse
    } catch (err) {
      throw new Error(err)
    }
  },
}

export default http





