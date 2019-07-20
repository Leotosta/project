const readline = require('readline-sync')
const state = require('./state.js')

function robot (){
    const content = {
        maximumSentences : 7
    }
   
    content.searchTerm = askAndReturnSearchAsk()
    content.prefix = askAndReturnSearchPrefix()
    state.save(content)
     
    function askAndReturnSearchAsk (){
        return readline.question('Type wikipedia search term : ')
    }

    function askAndReturnSearchPrefix  (){
        const prefixes = ['Who is' , 'What is', ' The history of']
        const selectedPrefixIndex = readline.keyInSelect(prefixes)
        const selectPrefixTest = prefixes[selectedPrefixIndex]

        return selectPrefixTest

    }
    

}

module.exports = robot