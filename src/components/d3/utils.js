export const uuid = () => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export const deepCopy = (node) => {
  const obj = { _key: uuid() }
  for (const key in node) {
    if (node[key] === null) {
      obj[key] = null
    } else if (Array.isArray(node[key])) {
      obj[key] = node[key].map((x) => deepCopy(x))
    } else if (typeof node[key] === 'object') {
      obj[key] = deepCopy(node[key])
    } else {
      obj[key] = node[key]
    }
  }
  return obj
}

export const formatDimension = (dimension) => {
  if (typeof dimension === 'number') return `${dimension}px`
  if (dimension.indexOf('px') !== -1) {
    return dimension
  } else {
    return `${dimension}px`
  }
}

export const rotatePoint = ({ x, y }) => {
  return {
    x: y,
    y: x
  }
}
