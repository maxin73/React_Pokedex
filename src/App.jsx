import { useState, useEffect } from "react"
import axios from "axios"
import styled from 'styled-components'
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import PokemonThumbnail from "./components/PokemonThumbnail"
import {
  Button
  } from 'reactstrap';
import './App.css'

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [allSpecies, setAllSpecies] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10')
  const [allData, setAllData] = useState([]);

  const getAllPokemons = async () => {
    try {
      const response = await axios.get(loadMore);
      setLoadMore(response.data.next)
      createPokemonObject(response.data.results);
      async function createPokemonObject(results)  {
        for (const pokemon of results) {
          try {
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            const speciesResponse = await axios.get(
              pokemonResponse.data.species.url
            );
            const pokemonData = {
              ...pokemonResponse.data
            };
            const speciesData = {
              ...speciesResponse.data
            }
            const combinedData = Object.assign(pokemonData, speciesData);

            setAllPokemons(currentList => [...currentList, pokemonData]);
            setAllSpecies(currentList => [...currentList, speciesData]);
            setAllData(currentList => [...currentList, combinedData]);

            allPokemons.sort((a, b) => a.id - b.id)

          } catch (error) {
            console.error(error)
          }
        }
      }
    } catch(error) {
      console.log(`Error fetching respositories: ${error}`);
    }
  };
    useEffect(() => {
      getAllPokemons()
    },[])
    
    const ThumbnailGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(5, 1fr);

      @media screen and (max-width: 1280px) {
        grid-template-columns: repeat(4, 1fr);
      };
      @media screen and (max-width: 992px) {
        grid-template-columns: repeat(3, 1fr);
      };
      @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      };
      @media screen and (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
      };
    `;
    
  //   const CenteredButton = styled(Button)`
  //   display: block;
  //   margin: 0 auto;
  // `;
  console.log(allSpecies);
  return (
      <App>
        <Nav />
          <ThumbnailGrid>
            {allData.map( (pokemonStats, index) =>
              <PokemonThumbnail
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types?.map((type) => type.type.name).join(' , ')}
                species={pokemonStats.species.url}
              />
            )}
          </ThumbnailGrid>
          <Button className="load-more" onClick={() => getAllPokemons()}>Load more</Button>
        <Footer />
      </App>
  );
}
export default App