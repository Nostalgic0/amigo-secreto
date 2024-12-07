var express = require('express');
var router = express.Router();
var twilio = require('twilio');
require('dotenv').config(); 

const accountSid = process.env.ACCOUNT_SSID; // Reemplaza con tu Account SID
const authToken = process.env.ACCOUNT_AUTH_TOKEN; 
const telefono = process.env.ACCOUNT_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/GetAmigoSecreto', function(req, res, next) {
  let participantes = req.body;

  let shuffled = participantes.slice(); // Copiar la lista de participantes
  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.some((p, i) => p.name === participantes[i].name));

  // Asignar amigo secreto
  for (let i = 0; i < participantes.length; i++) {
    participantes[i].amigoSecreto = shuffled[i].name;
    participantes[i].deseo = shuffled[i].desc;
  }

  participantes.forEach(participante => {
    const message = `Hola ${participante.name},\n\n` +
                    `Tu amigo secreto es ${participante.amigoSecreto}.\n` +
                    `Lista de deseos: ${participante.deseo}.\n\n` +
                    `Recuerda que los regalos deben tener un valor de entre 10,000 y 20,000 pesos.`;
    client.messages.create({
      body: message,
      from: `whatsapp:${telefono}`, // Reemplaza con tu número de WhatsApp de Twilio
      to: `whatsapp:${participante.phone}`
    })
    .then(message => console.log(`Mensaje enviado a ${participante.name}: ${message.sid}`))
    .catch(error => console.error(`Error al enviar mensaje a ${participante.nombre}:`, error));
  });
  res.json("Mensajes enviados");
});

module.exports = router;
