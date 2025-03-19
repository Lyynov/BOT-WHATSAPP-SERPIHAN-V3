/**
 * Helper utility functions
 */

/**
 * Format date to DD-MM-YYYY
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }
  
  /**
   * Clean and normalize phone number
   * @param {string} phoneNumber - Phone number to clean
   * @returns {string} Cleaned phone number
   */
  function cleanPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // Make sure it starts with country code
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    }
    
    return cleaned;
  }
  
  /**
   * Extract JID from remoteJid
   * @param {string} remoteJid - Full JID
   * @returns {string} Clean JID
   */
  function extractJid(remoteJid) {
    // Remove the @s.whatsapp.net or @g.us part
    return remoteJid.split('@')[0];
  }
  
  /**
   * Create a delay function
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise} Promise that resolves after delay
   */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  module.exports = {
    formatDate,
    cleanPhoneNumber,
    extractJid,
    delay
  };