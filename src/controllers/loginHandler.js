// Create new file: src/handlers/loginHandler.js
const messages = require('../constants/messages');
const apiService = require('../services/apiService');

/**
 * Handle login process
 * @param {Object} sock - WhatsApp socket instance
 * @param {string} remoteJid - User's JID
 * @param {string} name - Child name input
 * @param {Object} userStateManager - User state manager
 */
async function handleLogin(sock, remoteJid, name, userStateManager) {
  try {
    // Verify name with API
    const response = await apiService.verifyName(name);
    
    if (response.exists) {
      // Update user state to logged in
      userStateManager.setState(remoteJid, { 
        isLoggedIn: true,
        childName: name,
        step: 'loggedIn'
      });
      
      // Send success message with questionnaire menu
      await sock.sendMessage(remoteJid, { text: messages.LOGIN_SUCCESS(name) });
    } else {
      // Send failed login message
      await sock.sendMessage(remoteJid, { text: messages.LOGIN_FAILED });
      
      // Reset state
      userStateManager.clearState(remoteJid);
      
      // Show welcome message again
      await sock.sendMessage(remoteJid, { text: messages.LOGIN_WELCOME });
    }
  } catch (error) {
    console.error('Error during login:', error);
    await sock.sendMessage(remoteJid, { 
      text: 'Maaf, terjadi kesalahan saat proses login. Silakan coba lagi.' 
    });
    
    // Reset state
    userStateManager.clearState(remoteJid);
  }
}

/**
 * Handle questionnaire menu selection after login
 * @param {Object} sock - WhatsApp socket instance
 * @param {string} remoteJid - User's JID
 * @param {string} option - Selected menu option
 * @param {Object} userStateManager - User state manager
 */
async function handleQuestionnaireSelection(sock, remoteJid, option, userStateManager) {
  const childName = userStateManager.getState(remoteJid)?.childName || '';
  
  switch (option) {
    case '1':
      await sock.sendMessage(remoteJid, { 
        text: `Anda memilih kuisioner INFANT/TODDLER HOME RECORD untuk ${childName}.` 
      });
      break;
    case '2':
      await sock.sendMessage(remoteJid, { 
        text: `Anda memilih kuisioner EARLY CHILDHOOD HOME RECORD untuk ${childName}.` 
      });
      break;
    case '3':
      await sock.sendMessage(remoteJid, { 
        text: `Anda memilih kuisioner POLA ASUH ORANG TUA untuk ${childName}.`
      });
      break;
    default:
      await sock.sendMessage(remoteJid, { 
        text: 'Pilihan tidak valid. Silahkan pilih nomor 1-3 untuk memilih kuisioner.' 
      });
      break;
  }
}

module.exports = {
  handleLogin,
  handleQuestionnaireSelection
};
