import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  CardBody,
  CardGroup,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Button,
  ListGroup,
  ListGroupItem,
  Row
 } from 'reactstrap';

const Wrapper = styled.div`
    padding: 1rem 2rem;
`;

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);

  const fetchPokemonData = async () => {
    try {
      let indexNumber = 0;
      const promises = [];
      for (let i = 0; i < 20; i++){
        indexNumber++;
        promises.push(await axios.get(
          `https:pokeapi.co/api/v2/pokemon/${indexNumber}`
        ));
      }

      Promise.all(promises).then((responses) => {
        const pokemon = responses.map((response) => {
          return {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.front_default,
            type: response.data.types?.map((type) => type.type.name).join(', ')
          }
        });
        setPokemonData(pokemon);
      });

    } catch(error) {
      console.log(`Error fetching respositories: ${error}`);
    }
  };
  console.log(pokemonData);

  return (
    <Wrapper>
      <Button onClick={fetchPokemonData}>Fetch</Button>
      <CardGroup>
        
      {pokemonData.map(pokemon => (
        <Row key={pokemon.id}>
        <Col xs="3">
        <Card
          style={{
            width: '18rem'
          }}
        >
          <img
            alt={pokemon.name}
            src={pokemon.image}
          />
          <CardBody>
            <CardTitle tag="h5">
              {pokemon.name}
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              {pokemon.type}
            </CardSubtitle>
          </CardBody>
        </Card>
        </Col>
        </Row>
      ))}
      
      </CardGroup>
    </Wrapper>
  )
}

export default Home