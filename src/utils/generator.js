export const dataGenerate = (depth) => {
  const data = {
    name: 'Lao Lao',
    title: 'general manager',
    children: [
      { name: 'Bo Miao', title: 'department manager' },
      {
        name: 'Su Miao',
        title: 'department manager',
        children: [
          { name: 'Tie Hua', title: 'senior engineer' },
          {
            name: 'Hei Hei',
            title: 'senior engineer',
            children: [
              { name: 'Pang Pang', title: 'engineer' },
              { name: 'Xiang Xiang', title: 'UE engineer' }
            ]
          }
        ]
      },
      { name: 'Hong Miao', title: 'department manager' }
    ]
  }

  for (let i = 0; i < 3; i++) {
    data.children.push({
      name: 'Lao Lao',
      title: 'general manager',
      children: [
        { name: 'Bo Miao', title: 'department manager' },
        {
          name: 'Su Miao',
          title: 'department manager',
          children: [{ name: 'Tie Hua', title: 'senior engineer' }]
        }
      ]
    })
  }

  let temp = data
  for (let i = 0; i < depth; i++) {
    if (!temp.children) {
      temp.children = []
    }
    temp.children.push({
      name: 'Lao Lao',
      title: 'general manager',
      children: [
        { name: 'Bo Miao', title: 'department manager' },
        {
          name: 'Su Miao',
          title: 'department manager',
          children: [
            { name: 'Tie Hua', title: 'senior engineer' },
            {
              name: 'Hei Hei',
              title: 'senior engineer',
              children: [{ name: 'Xiang Xiang', title: 'UE engineer' }]
            }
          ]
        }
      ]
    })
    temp = temp.children[0]
  }
  return data
}

export function orgChartDataFoldedGenerate (depth, foldDepth) {
  const data = dataGenerate(depth)
  let tempNode = data
  for (let i = 0; i < foldDepth && tempNode.children; i++) {
    tempNode = tempNode.children[0]
  }
  tempNode._children = tempNode.children
  tempNode.children = null
  return data
}

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
