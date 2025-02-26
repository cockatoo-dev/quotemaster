import styled from "styled-components"
import NavBar from "../components/NavBar"

const Placeholder = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 0px;
`

export default function Index () {
  return (
    <div>
      <NavBar />
      <Placeholder>Click one of the buttons above to get started!</Placeholder>
    </div>
  )
}
