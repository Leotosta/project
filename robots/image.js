const google = require('googleapis').google
const state = require('./state.js')
const customSearch = google.customsearch('v1')
const googleSearchCredencials = require('./credentials/google-search.json')

async function robot(){
    const content = state.load()
    await fetchAllimagesOfallSentence(content)
    state.save(content)

    async function fetchAllimagesOfallSentence(content){
        for(const sentence of content.sentences){
            const query = `${content.searchTerm} ${sentence.keywords[0]}`
         
            sentence.images = await fetchGoogleAndReturnImagesLink(query)

            sentence.googleSearchQuery = query
        }
    }

    async function fetchGoogleAndReturnImagesLink(query){
        const response = await customSearch.cse.list({
            auth: googleSearchCredencials.apiKey,
            cx: googleSearchCredencials.searchEngineId, 
            q: query, 
            searchType: 'image',
            imgSize : 'huge',
            num: 2 
        })
        const imagesUrl = response.data.items.map((item )=> {
            return item.link
         })
         return imagesUrl
     }
    
    
}

module.exports = robot