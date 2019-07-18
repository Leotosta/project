const readline = require('readline-sync')
const robots = {
   // userInput : require('./robot/input-user'),
    text : require('./robots/text.js')
}


async function start (){
    const content = {}
    content.searchTerm = askAndReturnSearchAsk()
    content.prefix = askAndReturnSearchPrefix()

   // robots.userInput(content)
   await robots.text(content)
    
    function askAndReturnSearchAsk (){
        return readline.question('Type wikipedia search term : ')
    }

    function askAndReturnSearchPrefix  (){
        const prefixes = ['Who is' , 'What is', ' The history of']
        const selectedPrefixIndex = readline.keyInSelect(prefixes)
        const selectPrefixTest = prefixes[selectedPrefixIndex]

        return selectPrefixTest

    }
    console.log(content)

}

   
start()
