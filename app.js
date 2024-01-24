const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const expressHandlebars = require('express-handlebars');
const mongoose = require('./mongoose'); // Importa la conexión a MongoDB
const productsRouter = require('./api/productsRouter');
const cartsRouter = require('./api/cartsRouter');
const chatRouter = require('./api/chatRouter');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 8080;

// Configuración de Handlebars
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware para manejar archivos estáticos
app.use(express.static('public'));

// Middleware para manejar JSON
app.use(express.json());

// Rutas para productos, carritos y chat
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chat', chatRouter);

// Rutas para vistas
app.get('/', (req, res) => {
    res.render('home'); // Actualiza según tus necesidades
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts'); // Actualiza según tus necesidades
});

app.get('/chat', (req, res) => {
    res.render('chat'); // Vista para el chat
});

// Conexión de Socket.io para el chat
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Evento para recibir mensajes del chat
    socket.on('chatMessage', (message) => {
        const MessageModel = mongoose.model('Message', { user: String, message: String });
        const newMessage = new MessageModel(message);
        newMessage.save();

        io.emit('chatMessage', message);
    });
});

// Inicia el servidor
server.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// Exporta el objeto io para que pueda ser utilizado en otros archivos
module.exports = { app, io };
