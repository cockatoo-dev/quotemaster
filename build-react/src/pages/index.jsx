import Navbar from "../compoments/navbar"
import styled from "styled-components";

const Placeholder = styled.p`
    font-family: "Tahoma", sans-serif;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin: 0px;
`

export default function index () {return (
    <div>
        <Navbar />
        <Placeholder>Click one of the buttons above to get started!</Placeholder>
    </div>
)}
