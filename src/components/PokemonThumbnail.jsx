import {React, useState} from 'react'
import styled from 'styled-components'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Card,
  Container,
  Modal, 
  ModalHeader, 
  ModalBody
} from 'reactstrap';

const PokemonThumbnail = ({id, name, image, type, species}) => {
const [modalOpen, setModalOpen] = useState(false)
const [speciesInfo, setSpeciesInfo] = useState(null);

const toggleModal = async () => {
  if (!speciesInfo) {

    const response = await axios.get(species);
    setSpeciesInfo(response.data);
  }
  setModalOpen(!modalOpen);
};


const cardStyle = {
  padding:'1rem',
  cursor: 'pointer'
}

  return (
    <Container
      style={{
        padding: '1rem'
      }}>
      <Card 
        key={id}
        style={cardStyle}
        onClick={toggleModal}>
        <div className="number"><small>#0{id}</small></div>
        <img src={image} alt={name} />
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </div>
      </Card>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{name}</ModalHeader>
          <ModalBody>
          <div style={{textAlign: 'center'}}>
            <img src={image}
                  style={{
                    width: '13rem',
                    height: '13rem'
                  }}
            />
          </div>
          <p style={{fontWeight: 'bold'}}>Type: {type}</p>
          <p>{speciesInfo?.flavor_text_entries[0]?.flavor_text}</p>
          </ModalBody>
        </Modal>
    </Container>
  )
}

export default PokemonThumbnail