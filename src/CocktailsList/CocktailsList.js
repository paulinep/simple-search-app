import React from 'react';
import './CocktailsList.css'

export default function  CocktailsList(props) {
    const { cocktailsList, onFavoritesChange, favorites } = props
    return (
        <div className="Cocktails_list">
            {cocktailsList.map((cocktail)=>{
                return (
                    <div key={cocktail.idDrink} className="Cocktails_list_item">
                        <img className="Cocktails_item_image" alt={cocktail.strDrink} src={cocktail.strDrinkThumb}/>
                        <div className="Cocktails_item_control">
                            <span>{cocktail.strDrink}</span>
                            <input type="checkbox"
                                   value={cocktail.idDrink}
                                   name={'favorite'}
                                   onChange={()=>onFavoritesChange(cocktail)}
                                   checked={!!favorites && favorites.favoritesList.findIndex(item => item.idDrink === cocktail.idDrink) > -1}
                            />
                        </div>

                    </div>
                )
            })}
        </div>

    )
}
