const express = require('express');
const fetch = import('node-fetch');
const app = express();
const port = 3001;


app.get('/', (req, res) => {
    res.send('Server running');
  });
  
//ho creato il server ma alla fine non è servito ==> incompleto
app.get('/api/pokemon/list', async (req, res) => {
  try {
    console.log('getting pokemon from api...');
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await response.json();
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error requesting the API' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
