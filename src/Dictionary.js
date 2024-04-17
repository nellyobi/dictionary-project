import React, {useState} from  "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";
import Photos from "./Photos";

export default function Dictionary(props) {
    let [keyword, setKeyword] = useState("props.defaultKeyword");
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);
    let [photos, setPhotos] = useState(null);

    function handleDictionaryResponse(response) {
        setResults(response.data[0]);
        
    }

    function handlePexelsResponse(response) {
        setPhotos(response.data.photos);
    }

    function search() {
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

        axios.get(apiUrl).then(handleDictionaryResponse);

        let pexelsApiKey =
        "JDtI8EHVJxSpeh7NxQT36v20qXckbAgVrqtHjPnbudrXm6QRRBICupd6";
        let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}`;
        let headers ={Authorization: `Bearer ${pexelsApiKey}`};
        axios.get(pexelsApiUrl, {headers: headers}).then(handlePexelsResponse);

    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
        
       
    }


    
    function handleKeywordChange (event){
        setKeyword(event.target.value);

    }


    function load() {
        setLoaded(true);
        search();
    }

if (loaded) {
    return (
        <section>
    <div className="Dictionary">
        <section>
            <h1> What do you want to look up? </h1>
        <form onSubmit={handleSubmit}>
            <input type="search" onChange= {handleKeywordChange}
            defaultValue={props.defaultKeyword} />
        </form>
        <div className="hint"> 
        suggested words: sunset, yoga, wine, plant... 
        </div>
        </section>
        <Results results={results}/>
        <Photos photos={photos} />

    </div>
    </section>

);
} else {
    load();
    return "Loading";
}
    
    
}