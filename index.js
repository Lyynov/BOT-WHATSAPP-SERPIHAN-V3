const { DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const makeWASocket = require('@whiskeysockets/baileys').default;
const messageHandler = require('./src/handlers/messageHandler');
const UserState = require('./src/models/userState');

// Initialize user state manager
const userStateManager = new UserState();

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
      
      if (shouldReconnect) {
        startSock();
      }
    } else if (connection === 'open') {
      console.log('opened connection');
    }
  });

  sock.ev.on('messages.upsert', async m => {
    // Pass message to handler along with socket and user state manager
    await messageHandler.handleMessage(sock, m, userStateManager);
  });   
  
  return sock;
}

// Start the bot
startSock();