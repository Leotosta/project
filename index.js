const readline = require('readline-sync')

function start (){
    const content = {}
    content.searchTerm = askAndReturnSearchAsk()
    content.prefix = askAndReturnSearchPrefix()

    function askAndReturnSearchAsk (){
        return readline.question('Type wikipedia search term : ')
    }

    function askAndReturnSearchPrefix (){
        const prefixes = ['Who is' , 'What is', ' The history of']
        const selectedPrefixIndex = readline.keyInSelect(prefixes)
        const selectPrefixTest = prefixes[selectedPrefixIndex]

        return selectPrefixTest

    }
    console.log(content)

}

   
start()
