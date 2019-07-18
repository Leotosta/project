const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('./credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content){
    await fetchContentFromWikipedia(content)
     sanitizeContent(content)
    breakContentIntoSentences(content)


async function fetchContentFromWikipedia (content){

    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)//Autenticação
    const wikipediaAlgorithmia = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
    const wikipediaResponde = await wikipediaAlgorithmia.pipe(content.searchTerm) //Conteudo Referente pesquisa
    const wikipediaContent = wikipediaResponde.get() //Conteudo (dentro a objetos(content) e arrays(imagens))
    
    content.sourceContenOriginal = wikipediaContent.content // add ao objeto 


    }

    function sanitizeContent(content){
        const withoutBlanckLinesAndMarkDown = removeBlankLinesAndMarkDown(content.sourceContenOriginal)
        const withoutDate = removeDate(withoutBlanckLinesAndMarkDown)

        content.sourceContentSanitized = withoutDate

        function removeBlankLinesAndMarkDown(text){
            
            const allLines = text.split('\n')

            const withoutBlanckLinesAndMarkDown= allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith('=')){
                    return false
                } else {
                    return true
                }
            })
            return withoutBlanckLinesAndMarkDown.join(' ')
        }
    }
    function removeDate(text){
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/ /g, ' ')
    }

    function breakContentIntoSentences(content){
        
        content.sentence = []

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
            content.sentence.push({
                text :sentence,
                keywords : [],
                images : []
            })
        })
    }

    }

module.exports = robot