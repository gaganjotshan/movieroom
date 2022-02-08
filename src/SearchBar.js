import React from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
function SearchBar({setMovies, originalMovies}){
    let searchMovies = (e) =>{
        let val = e.target.value.toLowerCase();
        if(val!==""){
            let k=0;
            const searchResults = {};
            for(let i in originalMovies){
                if(String(originalMovies[i].title).toLowerCase().includes(val)){
                    searchResults[k++] = originalMovies[i];
                }
            }
            setMovies(searchResults);
        }else{
            setMovies(originalMovies);
        }
    }

    return (
        <div className="searchbar-container">
            <TextField
                id="searchbar"
                variant="outlined"
                fullWidth
                label="Movies Search"
                onChange={searchMovies}
            />
        </div>
    )
}

export default SearchBar;