const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON nas requisições
app.use(express.json());

// Vinculação das rotas de usuários planejadas para esta etapa
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
});