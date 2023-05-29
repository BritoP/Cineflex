import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import { useState } from "react"

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'pJY2W50kPz7cAJaR8fghfVSj';
    const [objetoDia,setObjetoDia] = useState({});
    const [objetoNome,setObjetoNome] = useState(undefined);
    const [objetoFilme,setObjetoFilme] = useState({});
    const [cpf,setCpf] = useState('');
    const [nome,setNome] = useState('');
    const [cadeirasEscolhidas,setCadeirasEscolhidas] = useState([]);
    const [cadeirasEscolhidasID,setCadeirasEscolhidasID] = useState([]);

    return (
        <>
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    
                    <Route path="/" element = {<HomePage/>}></Route>
                    <Route path="/sessoes/:idFIlme" element = {<SessionsPage/>}></Route>
                    <Route path="/assentos/:idSessao" element = {<SeatsPage objetoFilme={objetoFilme}setObjetoFilme={setObjetoFilme}objetoDia={objetoDia}setObjetoDia={setObjetoDia}objetoNome={objetoNome}setObjetoNome={setObjetoNome}nome={nome}setNome={setNome}cpf={cpf}setCpf={setCpf}cadeirasEscolhidas={cadeirasEscolhidas}setCadeirasEscolhidas={setCadeirasEscolhidas}cadeirasEscolhidasID={cadeirasEscolhidasID}setCadeirasEscolhidasID={setCadeirasEscolhidasID}/>}></Route>
                    <Route path="/sucesso" element = {<SuccessPage objetoFilme={objetoFilme}setObjetoFilme={setObjetoFilme}objetoDia={objetoDia}setObjetoDia={setObjetoDia}objetoNome={objetoNome}setObjetoNome={setObjetoNome}nome={nome}setNome={setNome}cpf={cpf}setCpf={setCpf}cadeirasEscolhidas={cadeirasEscolhidas}setCadeirasEscolhidas={setCadeirasEscolhidas}cadeirasEscolhidasID={cadeirasEscolhidasID}setCadeirasEscolhidasID={setCadeirasEscolhidasID}/>}></Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
