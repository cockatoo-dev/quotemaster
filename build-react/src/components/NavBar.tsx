import { useLocation, useNavigate } from "react-router"
import styled from "styled-components"

const Bar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin-bottom: 10px;
`

export default function NavBar () {
  const location = useLocation()
  const navigate = useNavigate()
return (
  <Bar>
    <div className="button-container">
      <button 
        disabled={location.pathname === "/random"} 
        onClick={() => {navigate("/random")}}
      >
        Random quote
      </button>
    </div>
    <div className="button-container">
      <button 
        disabled={location.pathname === "/popular"} 
        onClick={() => {navigate("/popular")}}
      >
        Popular quote
      </button>
    </div>
    <div className="button-container">
      <button 
        disabled={location.pathname === "/new"} 
        onClick={() => {navigate("/new")}}
      >
        Write your own
      </button>
    </div>
  </Bar>
)}
