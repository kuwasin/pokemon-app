/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
//  export const MyContext = createContext(handleChange);
function App() {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [inputText, setInputText] = useState("");
  const [filteringPokemon, setFilteringPokemon] = useState([]);
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンのデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon)
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
    // console.log(pokemonData)
  };

  // console.log(pokemonData)

  //ページ遷移
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data)
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
    setFilteringPokemon(
      pokemonData.filter((pokemon) => 
      pokemon.name.toLowerCase().includes(inputText)
      )
    )
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
     setFilteringPokemon(
       pokemonData.filter((pokemon) =>
         pokemon.name.toLowerCase().includes(inputText)
       )
     );
  };
  //ポケモンの検索
  const handleChange = (e) => {
    setInputText(e.target.value);
    setFilteringPokemon(
      pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(inputText.toLowerCase())
      )
    );
  };

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中…</h1>
      ) : (
          <>
            {/* {console.log(filteringPokemon)} */}
          <Navbar handleChange={handleChange} />
          <div className="pokemonCardContainer">
            {(filteringPokemon.length === 0) | (inputText.length === 0)
              ? pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />;
                })
              : filteringPokemon.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />;
                })}
          </div>
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
