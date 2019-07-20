const fs = require('fs')
const contentFilePath = './content.json'

function save (content){
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(contentFilePath, contentString)
}

function load(){
    const buffer = fs.readFileSync(contentFilePath, 'utf-8')
    const contentJson = JSON.parse(buffer)
    return contentJson
}

module.exports = {save, load}