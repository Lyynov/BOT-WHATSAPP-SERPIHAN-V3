
const menuHandler = require('./menuHandler');
const registrationController = require('../controllers/registrationController');
const loginHandler = require('../controllers/loginHandler'); // Add this
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
    
    // Get current user state
    const userState = userStateManager.getState(remoteJid);
    const currentStep = userState?.step || null;
    const isLoggedIn = userState?.isLoggedIn || false;
    
    // If logged in and selecting a questionnaire
    if (isLoggedIn && currentStep === 'loggedIn') {
      if (['1', '2', '3'].includes(text)) {
        await loginHandler.handleQuestionnaireSelection(sock, remoteJid, text, userStateManager);
        return;
      }
    }
    
    // Handle login input
    if (currentStep === 'waitingForLoginName') {
      await loginHandler.handleLogin(sock, remoteJid, msg.message.conversation, userStateManager);
      return;
    }
    
    // If user is not in registration process and hasn't selected a menu option
    if (!text.includes('1') && !text.includes('2') && !text.includes('3') && 
        !userStateManager.isInRegistrationProcess(remoteJid)) {
      await sock.sendMessage(remoteJid, { text: messages.LOGIN_WELCOME });
      return;
    }
    
    // Process based on menu selection
    if (!userStateManager.isInRegistrationProcess(remoteJid)) {
      if (text.includes('1')) {
        await menuHandler.handleLoginMenu(sock, remoteJid, userStateManager);
        return;
      } 
      else if (text.includes('2')) {
        await menuHandler.handleRegistrationMenu(sock, remoteJid, userStateManager);
        return;
      }
      else if (text.includes('3')) {
        await menuHandler.handleCheckDataMenu(sock, remoteJid, userStateManager);
        return;
      }
    }
    
    // Process based on current registration step
    if (currentStep && currentStep.startsWith('waitingFor') && currentStep !== 'waitingForLoginName') {
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
