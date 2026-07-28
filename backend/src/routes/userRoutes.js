const express = require('express');
const router = express.Router();

// Rota de teste para a mensagem da tela de boas-vindas
router.get('/welcome', (req, res) => {
  res.json({ message: "Bem-vindo à plataforma digital Camarão na Tarrafa!" });
});

module.exports = router;