export default async function load(query) {
    const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
    if(response.ok){
        return await response.json()
    }else {
        throw response
    }

}