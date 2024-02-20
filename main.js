const API_KEY='b6b9c6844e12441f8bdc9b7565149888'
let news = []
const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
    const response = await fetch(url)
    const data = await response.json()
    console.log('rrr',response)
    news = data.articles
    console.log('ddd',news)
    
}
getLatestNews();    