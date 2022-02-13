

const formatNumber = num => {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

const getFirstName = name => {
  return name.split(' ')[0]
}

export { formatNumber, getFirstName }