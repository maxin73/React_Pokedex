import styled from 'styled-components'

const FooterContainer = styled.footer`
    height: 200px;
    padding: 1rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    h5{
        margin-top: 3rem;
        margin-bottom: 1rem;
    }
`;


const Footer = () => {
    return (
    <FooterContainer>
    
        <h5>2023&copy;Pokedex_React</h5>

    </FooterContainer>
    )
}

export default Footer