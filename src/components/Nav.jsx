import styled from "styled-components";

const NavContainer = styled.nav`
    display: flex;
    align-items:center;
    padding: 1rem 2rem;
    height: 128px;
    background-color: black;
    color: white;
    h1{
        font-weight: bold;
        margin-right: auto;
    }
`;

const Nav = () => {
    return (
    <NavContainer>

        <h1>Pokedex</h1>

    </NavContainer>
    )
}

export default Nav