const loginCheck = (username, password) => {
  if(username === 'tom' && password === '123') {
    return true
  }

  return false
}

module.exports = {
  loginCheck
}