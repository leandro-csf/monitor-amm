import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './homepage.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 

const namedomain =[
  "Gestor",
  "Central",
  "Hotsite Congresso",
  "Observatório",
  "Central do Afiliado",
  "Diário Online",
  "Portal AMM",
  "Central AMM",

]

const UpdateStatus = () => {
  const [dados, setDados] = useState({});
  
  useEffect(() => {
    const statusPage = async () => {
      try {
        const response = await axios.get('http://192.168.0.37:3000/status');
        if (response.status === 200) {
          setDados(response.data);
        } else {
          throw new Error('Falha ao obter os dados');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
      }
    };
    
    statusPage();
    
    const intervalId = setInterval(statusPage, 60000);

    return () => clearInterval(intervalId);

  }, []);    

  const ok = "../content/ok.png";
  const fail = "../content/fail.png";
  
  return (
    <div className="container">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="../content/logo_monitor.png" alt="Logo" width="30" height="24"/>
            <span className="title">Monitor AMM</span>
          </a>
        </div>
      </nav>
      
      <div className="cabecalho">
      <span>Serviço</span>
      <span>Tempo de resposta / Status</span>
      </div>

      <div className="list-domains">
          
        {Object.keys(dados).map((url, position) => (
          <div key={url} className="alert alert-dark" role="alert">
            <span className='nome-domain'>{namedomain[position]}</span>
            <a href={url} target='_blank' className="alert-link">{url}</a>
            <span className="response-time">{dados[url].responseTime}</span>
            <img src={dados[url].status === "Online" ? ok : fail} className="status1" alt="status" />
            
          </div>
        ))}
      </div>

    </div>

  );
};

export default UpdateStatus;

