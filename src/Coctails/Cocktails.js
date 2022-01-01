import React from 'react';
import throttle from '../services/throttle'
import './Cocktails.css'
import load from '../services/load'
import CocktailsList from '../CocktailsList/CocktailsList'

export default function  Cocktails() {

    const [query, setQuery] = React.useState('')
    const [cocktailsList, setCocktailsList] = React.useState({drinks: []})
    const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('viqeo-task-infavorite') || '{ "favoritesList":[] }'))

    const changeThrottle = React.useCallback(throttle( (query) => {
        if(query) {
            load(query).then(
                list => {
                    setCocktailsList(list)
                }
            )
        }}, 2000), []);


    const onChangeSearch = (event)=>{
        setQuery(event.target.value)
        changeThrottle(event.target.value)
    }

   const onFavoritesChange = (coctail)=> {
       const favoritesList = JSON.parse(localStorage.getItem('viqeo-task-infavorite') || '{ "favoritesList":[] }')
       const newItem= coctail.idDrink
       const itemIndex =  favoritesList.favoritesList.findIndex((item)=>item.idDrink===newItem)
       if( itemIndex > -1){
           favoritesList.favoritesList.splice(itemIndex, 1);
       }else{
           favoritesList.favoritesList.push(coctail)
       }
        localStorage.setItem('viqeo-task-infavorite', JSON.stringify(favoritesList))
        setFavorites(favoritesList)
   }

    return (
        <div className="Cocktails">
            <input className="Cocktails_input" name="query" value={query} onChange={onChangeSearch}/>
            {query && cocktailsList.drinks && (
                <CocktailsList
                    cocktailsList={cocktailsList.drinks}
                    favorites={favorites}
                    onFavoritesChange={onFavoritesChange}
                />
            )}
        </div>

    )
}
