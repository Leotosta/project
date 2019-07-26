const imageDownloader = require('image-downloader')
const google = require('googleapis').google
const state = require('./state.js')
const customSearch = google.customsearch('v1')
const googleSearchCredencials = require('./credentials/google-search.json')

async function robot(){
    const content = state.load()

    await fetchAllimagesOfallSentence(content)
    state.save(content)

    await downloadAllImages(content)

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
    
    async function downloadAllImages (content){

         content.DownloadImages = []

        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex ++){
            const images = content.sentences[sentenceIndex].images

            for(let imageIndex = 0; imageIndex < images.length; imageIndex ++){
                const imageUrl = images[imageIndex]

                try {
                    if(content.DownloadImages.includes(imageUrl)){
                        throw new Error ('Imagem ja for baixada')
                    }

                    await downloadAndSave(imageUrl,`${sentenceIndex}-original.png`)
                    content.DownloadImages.push(imageUrl)
                    console.log(`> Baixou com sucesso ${imageUrl}`)
                    break
                }catch(error){
                    console.log(` ${sentenceIndex} ${imageIndex} Erro ao baixar ${imageUrl} : ${error}`)
                }
            }
        }
    }

    async function downloadAndSave(url, fileName){
        return imageDownloader.image ({
            url, url,
            dest: `./content/${fileName}`
        })
    }
     
}


module.exports = robot