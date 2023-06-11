const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const cookies = [
    { nome: 'Ricardo', apelido: 'Kaka', idade: 25, cidade: 'Vila Velha' },
    { nome: 'João Paulo', apelido: 'JP', idade: 30, cidade: 'Cariacica' },
    { nome: 'Fabio', apelido: 'Fabão', idade: 35, cidade: 'Serra' }
];

app.get('/adicionarCookie', (req, res) => {
    cookies.forEach((cookieData, index) => {
        const cookieName = `user${index + 1}`;
        res.cookie(cookieName, JSON.stringify(cookieData));
    });

    res.send('Cookies adicionados com sucesso!');
});

app.get('/mostrarCookies', (req, res) => {
    const cookieValues = {};
  
    cookies.forEach((_, index) => {
      const cookieName = `user${index + 1}`;
      const cookieValue = req.cookies[cookieName];
      cookieValues[cookieName] = cookieValue ? JSON.parse(cookieValue) : null;
    });
  
    res.json(cookieValues);
  });

app.get('/logout', (req, res) => {
    cookies.forEach((_, index) => {
        const cookieName = `user${index + 1}`;
        res.clearCookie(cookieName);
    });

    res.send('Logout realizado com sucesso!');
});


app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
