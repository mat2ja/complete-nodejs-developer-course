const fs = require('fs');

// const book = {
//   title: 'Ego is the enemy',
//   author: 'Ryan Holiday'
// }

const bookJSON = JSON.stringify(book)
fs.writeFileSync('1-json.json', bookJSON)

// dont need buffer if we parse it immediately
const dataBuffer = fs.readFileSync('./1-json.json') 
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)