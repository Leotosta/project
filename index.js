const robots = {
   userInput : require('./robots/input'),
    text : require('./robots/text.js'),
    state: require('./robots/state'),
    image : require('./robots/image')
}


async function start (){

    robots.userInput()
     await robots.text()
    await robots.image()

    const content = robots.state.load()
    console.dir(content, {depth: null})
}

   
start()
