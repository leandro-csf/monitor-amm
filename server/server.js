const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const urls = [
  "https://gestor.amm-mg.org.br",
  "https://central.amm-mg.org.br",
  "https://congresso.amm-mg.org.br",
  "https://observatorio.amm-mg.org.br",
  "https://afiliado.amm-mg.org.br",
  "https://www.diariomunicipal.com.br/amm-mg",
  "https://portalamm.org.br",
  "https://portaltransferencias.amm-mg.org.br"
];


const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Servidor Rodando');
});

app.use(cors());

let statusData = {};

const updateStatus = async () => {
  const statusPromises = urls.map(async (url) => {
    const startTime = Date.now(); 
    try {
      const response = await axios.get(url);
      const responseTime = Date.now() - startTime; 
      return { url, status: 'Online', responseTime: `${responseTime}ms` };
    } catch (error) {
      const responseTime = Date.now() - startTime; 
      console.error(`Erro ao verificar o status de ${url}:`, error.message);
      return { url, status: 'Offline', responseTime: `${responseTime}ms` };
    }
  });

  const results = await Promise.all(statusPromises);
  statusData = results.reduce((acc, curr) => {
    acc[curr.url] = { status: curr.status, responseTime: curr.responseTime };
    return acc;
  }, {});
};

updateStatus();

const intervalId = setInterval(() => {
  updateStatus(); 
}, 60000);

app.get('/status', (req, res) => {
  res.status(200).json(statusData);
});

