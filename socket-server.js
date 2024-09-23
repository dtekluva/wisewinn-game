/* eslint-disable @typescript-eslint/no-var-requires */
const { Server } = require('socket.io');

// Game state
let gameState = {
  questions: [],
  currentQuestion: '',
  players: [],
  answers: [],
  selectedQuestionIndex: -1,
};

function initializeSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'Origin', 'X-Requested-With'],
      credentials: true,
    },
  });

  io.on('connection', socket => {
    console.log('New client connected');

    // Send current game state to the newly connected client
    socket.emit('fullGameState', gameState);

    // Player requests current game state
    socket.on('requestGameState', () => {
      socket.emit('fullGameState', gameState);
    });

    // Player joins the game
    socket.on('join', playerName => {
      const player = { id: socket.id, name: playerName };
      gameState.players.push(player);
      io.emit('playerJoined', gameState.players);
      console.log(`${playerName} joined the game`);
    });

    // Host adds a new question
    socket.on('addQuestion', question => {
      gameState.questions.push(question);
      io.emit('updateQuestions', gameState.questions);
      console.log(`New question added: ${question}`);
    });

    // Host selects a question
    socket.on('selectQuestion', index => {
      if (index >= 0 && index < gameState.questions.length) {
        gameState.currentQuestion = gameState.questions[index];
        gameState.selectedQuestionIndex = index;
        gameState.answers = [];
        io.emit('questionSelected', gameState.currentQuestion, index);
        console.log(`Question selected: ${gameState.currentQuestion}`);
      }
    });

    // Host deletes a question
    socket.on('deleteQuestion', index => {
      if (index >= 0 && index < gameState.questions.length) {
        const deletedQuestion = gameState.questions.splice(index, 1)[0];
        io.emit('updateQuestions', gameState.questions);
        console.log(`Question deleted: ${deletedQuestion}`);

        // If the deleted question was the current question, clear it
        if (deletedQuestion === gameState.currentQuestion) {
          gameState.currentQuestion = '';
          gameState.selectedQuestionIndex = -1;
          gameState.answers = [];
          io.emit('questionSelected', gameState.currentQuestion, -1);
        }
      }
    });

    // Player answers the question
    socket.on('answer', data => {
      const answerTime = Date.now();
      const answer = { ...data, time: answerTime };
      gameState.answers.push(answer);
      io.emit('playerAnswered', gameState.answers);
      console.log(`${data.playerName} answered at ${new Date(answerTime).toISOString()}`);
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      gameState.players = gameState.players.filter(player => player.id !== socket.id);
      io.emit('playerLeft', gameState.players);
    });

    socket.on('error', error => {
      console.error('Socket error:', error);
    });
  });

  io.on('error', error => {
    console.error('Socket.IO server error:', error);
  });

  return io;
}

module.exports = initializeSocketServer;
