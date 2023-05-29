import styled from "styled-components"
import {useState} from "react"
import axios from "axios"
import {useEffect} from "react"
import { Link , useNavigate, useParams } from "react-router-dom"


export default function SeatsPage(props) {

    const {objetoFilme,setObjetoFilme,objetoDia,setObjetoDia,objetoNome,setObjetoNome,nome,setNome,cpf,setCpf,cadeirasEscolhidas,setCadeirasEscolhidas,cadeirasEscolhidasID,setCadeirasEscolhidasID} = props;
    const navigate = useNavigate();
    const parametroRota = useParams();
    const [cadeiras,setCadeiras] = useState([]);

    useEffect(()=>{

        const axiosRota = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametroRota.idSessao}/seats`;
        const promise = axios.get(axiosRota);

        promise.then((resposta)=>{
            setCadeiras(resposta.data.seats);
            setObjetoFilme(resposta.data.movie);
            setObjetoNome(resposta.data.name);
            setObjetoDia(resposta.data.day);
        })
        promise.catch((erro)=>{
            console.log(erro.response.data);
        })

    },[]);

    function escolherCadeira(cadeira){
        
        if(cadeira.isAvailable===false){
            alert("Cadeira ocupada");
        }else{
            let nomeTemporario;
            let controle = true;

            cadeirasEscolhidas.forEach(lugar =>{
                if(lugar === cadeira.id){
                    controle = false;
                    nomeTemporario = cadeira.name;
                }
            });

            if(controle === true){
                setCadeirasEscolhidas([...cadeirasEscolhidas,cadeira.id]);
                setCadeirasEscolhidasID([...cadeirasEscolhidasID,cadeira.name]);
            }else{
                let cadeirasAdicionadas = [];
                let listaCadeirasEscolhidas = [...cadeirasEscolhidas];
                let cadeirasAdicionadasID = [];
                let listaCadeirasEscolhidasID = [...cadeirasEscolhidasID];
                
                listaCadeirasEscolhidas.forEach(lugar=>{
                    if(lugar!=cadeira.id){
                        cadeirasAdicionadas.push(lugar);
                    }
                })
                listaCadeirasEscolhidasID.forEach(lugar=>{
                    if(lugar!=cadeira.id){
                        cadeirasAdicionadasID.push(lugar);
                    }
                })
                setCadeirasEscolhidas(cadeirasAdicionadas);
                setCadeirasEscolhidasID(cadeirasAdicionadasID);
            }

            
            
        }
    }

    function finalizarCadastro(obj){
        obj.preventDefault();
        const objetoTemporario = {
            ids: cadeirasEscolhidas,
            name: nome,
            cpf: cpf
        }
        const urlMult = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const promise = axios.post(urlMult,objetoTemporario);
        promise.then(resposta =>{

            if(cadeirasEscolhidas.length > 0){
                console.log(resposta.data);
                navigate("/sucesso");
            }else{
                alert("Escolha uma cadeira");
            }
        });
        promise.catch(erro => {
            console.log(erro.response.data);
        })
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>

                {cadeiras.map((cadeira,contador)=>(

                    <SeatItem data-test="seat" id = {cadeira.id} key = {cadeira.id} array = {cadeirasEscolhidas} isAvailable = {cadeira.isAvailable} onClick={()=>escolherCadeira(cadeira)}>
                        {cadeira.name}
                    </SeatItem>

                )
                )}
                
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <form onSubmit={finalizarCadastro}>
            <FormContainer>
                Nome do Comprador:
                <input data-test = "client-name" value = {nome} id = "nome" onChange={(obj)=>setNome(obj.target.value)} type = "text" placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input data-test = "client-cpf" value = {cpf} id = "cpf" onChange={(obj)=>setCpf(obj.target.value)} type = "text" placeholder="Digite seu CPF..." />
                <button data-test = "book-seat-btn" type = "submit" >Reservar Assento(s)</button>
            </FormContainer>
        
            </form>

            <FooterContainer data-test = "footer" >
                <div>
                    <img src={objetoFilme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{objetoFilme.title}</p>
                    <p>{objetoDia.weekday} - {objetoNome}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`