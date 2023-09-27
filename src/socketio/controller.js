const { joinRoom } = require('./room.event.controller');
const { sendPoll, closePoll } = require('./poll.event.controller');
const { saveActivitySleep, saveActivityIdontgetit } = require('./record-activity.event.controller');

const socketController = async (io) => {
  io.on('connection', (client) => {
    try {
      // Controlamos el acceso de los clientes a las salas
      joinRoom(io, client);

      // Manejar eventos relacionados con las encuestas
      sendPoll(io, client);
      closePoll(io, client);

      // Manejo de actividades, guardado
      saveActivitySleep(io, client);
      saveActivityIdontgetit(io, client);

      console.log("Clientes conectados: ", io.engine.clientsCount);

      client.on('disconnect', () => {
        console.log("Cliente desconectado.", client.id);
      });
    } catch (error) {
      console.error("Error in sockets controller:", error.message);
      // Puedes emitir un mensaje de error al cliente si deseas
      client.emit('error', 'Error server in sockets controller');
      // También puedes desconectar al cliente si es necesario
      client.disconnect();
    }
  });
}

module.exports = { socketController };