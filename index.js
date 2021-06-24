function getElements() {
  const secretElement = document.getElementById('secret')
  const masterElement = document.getElementById('master')
  const serviceElement = document.getElementById('service')
  const resultForm = document.getElementById('form_result')
  const resultElement = document.getElementById('result')

  return [secretElement, masterElement, serviceElement, resultForm, resultElement]
}

function showResult(password) {
  const elements = getElements()
  elements[3].style.display = 'block'
  elements[4].innerText = password
}

function generatePassword() {
  const [secretElement, masterElement, serviceElement] = getElements()

  const secret = secretElement.value
  const master = masterElement.value
  const service = serviceElement.value

  if (!secret || !master || !service) {
    alert('All fields are required!')
    return
  }

  const secretSHA = CryptoJS.SHA256(secret)
  const masterSHA = CryptoJS.SHA256(master)
  const serviceSHA = CryptoJS.SHA256(service)

  const general = `${secret}-${secretSHA}-${master}-${masterSHA}-${service}-${serviceSHA}`
  const generalSHA = CryptoJS.SHA256(general).toString()

  return Array.from(generalSHA)
    .reduce((acc, current, index) => {
      if (index % 4 === 0) {
        return [...acc, current]
      }
      return acc
    }, [])
    .reduce((acc, current, index) => {
      if (index <7 && index % 2 === 0) {
        return [...acc, current.toUpperCase()]
      }
      return [...acc, current]
    }, [])
    .join('')
}

function onClick() {
  const password = generatePassword()

  if (password) {
    showResult(password)
  }
}

const generate = document.getElementById('generate')
generate.addEventListener('click', onClick)
