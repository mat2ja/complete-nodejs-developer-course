const fs = require('fs');

// const book = {
//   title: 'Ego is the enemy',
//   author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('./1-json.json') 
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)

const jsonData = fs.readFileSync('1-json.json')
const parsedData = JSON.parse(jsonData)

parsedData.name = 'Matija'
parsedData.age = 21

fs.writeFileSync('1-json.json', JSON.stringify(parsedData))