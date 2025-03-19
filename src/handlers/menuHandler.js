const messages = require('../constants/messages');

/**
 * Handle registration menu selection
 * @param {Object} sock - WhatsApp socket instance
 * @param {string} remoteJid - User's JID
 * @param {Object} userStateManager - User state manager
 */
async function handleRegistrationMenu(sock, remoteJid, userStateManager) {
  userStateManager.setState(remoteJid, { step: 'waitingForName' });
  await sock.sendMessage(remoteJid, { text: messages.ASK_NAME });
}

/**
 * Handle check data menu selection
 * @param {Object} sock - WhatsApp socket instance
 * @param {string} remoteJid - User's JID
 * @param {Object} userStateManager - User state manager
 */
async function handleCheckDataMenu(sock, remoteJid, userStateManager) {
  await sock.sendMessage(remoteJid, { text: messages.CHECK_DATA });
  // Add data check logic here
}

module.exports = {
  handleRegistrationMenu,
  handleCheckDataMenu
};