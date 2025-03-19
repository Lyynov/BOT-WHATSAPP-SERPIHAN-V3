const menuHandler = require('./menuHandler');
const registrationController = require('../controllers/registrationController');
const messages = require('../constants/messages');

/**
 * Handle incoming messages
 * @param {Object} sock - WhatsApp socket instance
 * @param {Object} m - Message object
 * @param {Object} userStateManager - User state manager
 */
async function handleMessage(sock, m, userStateManager) {
  const msg = m.messages[0];
  
  if (!msg.key.fromMe && msg.message) {
    const remoteJid = msg.key.remoteJid;
    const text = msg.message.conversation?.toLowerCase() || '';
    
    // If user is not in registration process and hasn't selected a menu option
    if (!text.includes('1') && !text.includes('2') && 
        !userStateManager.isInRegistrationProcess(remoteJid)) {
      await sock.sendMessage(remoteJid, { text: messages.WELCOME_MESSAGE });
      return;
    }
    
    // Process based on menu selection
    if (text.includes('1') && !userStateManager.isInRegistrationProcess(remoteJid)) {
      await menuHandler.handleRegistrationMenu(sock, remoteJid, userStateManager);
      return;
    } 
    else if (text.includes('2') && !userStateManager.isInRegistrationProcess(remoteJid)) {
      await menuHandler.handleCheckDataMenu(sock, remoteJid, userStateManager);
      return;
    }
    
    // Process based on current registration step
    const currentStep = userStateManager.getCurrentStep(remoteJid);
    if (currentStep) {
      await registrationController.processRegistrationStep(
        sock, 
        msg, 
        remoteJid, 
        currentStep, 
        userStateManager
      );
    }
  }
}

module.exports = {
  handleMessage
};