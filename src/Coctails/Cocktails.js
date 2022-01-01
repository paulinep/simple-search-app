import React from 'react';
import throttle from '../services/throttle'
import './Cocktails.css'
import load from '../services/load'

export default function  Cocktails() {

    const [query, setQuery] = React.useState('')
    const [cocktailsList, setCocktailsList] = React.useState({drinks: []})
    const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('viqeo-task-infavorite') || '{ "favoritesList":[] }'))

    React.useEffect(()=>{
        throttle(
            load(query).then(
                list =>{
                    setCocktailsList(list)
                }
            ), 5000)
    }, [query])


    const onChangeSearch = (event)=>{
        setQuery(event.target.value)

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
            <div className="Cocktails_list">
                {query && cocktailsList.drinks && cocktailsList.drinks.map((cocktail)=>{
                    return (
                        <div key={cocktail.idDrink} className="Cocktails_list_item">
                            <img className="Cocktails_item_image" alt={cocktail.strDrink} src={cocktail.strDrinkThumb}/>
                            <span>{cocktail.strDrink}</span>
                            <input type="checkbox"
                                   value={cocktail.idDrink}
                                   name={'favorite'}
                                   onChange={()=>onFavoritesChange(cocktail)}
                                   checked={!!favorites && favorites.favoritesList.findIndex(item => item.idDrink === cocktail.idDrink) > -1}
                            />
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
