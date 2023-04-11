import { useState, useEffect } from "react"
import axios from "axios"
import styled from 'styled-components'
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import PokemonThumbnail from "./components/PokemonThumbnail"
import {
  Button
  } from 'reactstrap';
import Pagination from "./Pagination";

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=12')
  const [allSpecies, setAllSpecies] = useState([]);

  // const[currentPageUrl, setcurrentPageUrl] = useState("https:pokeapi.co/api/v2/pokemon?limit=20")
  // const[nextPageUrl, setNextPageUrl] = useState()
  // const[prevPageUrl, setPrevPageUrl] = useState()
  // const [loading, setLoading] = useState(true)

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
            console.log(speciesResponse);
            const pokemonData = {
              ...pokemonResponse.data
            };
            const speciesData = {
              ...speciesResponse.data
            }
            setAllPokemons(currentList => [...currentList, pokemonData])
            setAllSpecies(currentList => [...currentList, speciesData]);

            // console.log(allPokemons);
            console.log(allSpecies);

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
    `;
  // useEffect(() => {
  //   setLoading(true)
  //   axios.get(currentPageUrl).then(res => {
  //     setLoading(false)
  //     setNextPageUrl(res.data.next)
  //     setPrevPageUrl(res.data.previous)
  //     setPokemon(res.data.results.map( p => p.name))
  //   })

  // }, [currentPageUrl])

  // function gotoNextPage() {
  //   setcurrentPageUrl(nextPageUrl)
  // }

  // function gotoPrevPage() {
  //   setcurrentPageUrl(prevPageUrl)
  // }

  // if (loading) return "Loading..."

  return (
      <>
        <Nav />
          <ThumbnailGrid>
            {allPokemons.map( (pokemonStats, index) => 
              <PokemonThumbnail
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types?.map((type) => type.type.name).join(', ')}
                // species={allSpecies[index]}
              />
            )}
            </ThumbnailGrid>
          <Button className="load-more" onClick={() => getAllPokemons()}>Load more</Button>
        {/* <Pagination 
        gotoNextPage={gotoNextPage}
        gotoPrevPage={gotoPrevPage}
        /> */}
        <Footer />
      </>
  );
}

export default App
