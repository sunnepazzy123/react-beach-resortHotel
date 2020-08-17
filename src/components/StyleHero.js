import styled from "styled-components";
import defaultImg from "../images/room-1.jpeg";

//to access  props in the styled-component is a way different from the usual way
const StyledHero = styled.header`
    min-height: 60vh;
    background: url(${props => props.img ? props.img : defaultImg}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

`

export default StyledHero;