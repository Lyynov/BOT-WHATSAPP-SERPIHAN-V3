/**
 * Service for input validation
 */
class ValidationService {
    /**
     * Validate name input
     * @param {string} name - Name to validate
     * @returns {boolean} True if valid
     */
    validateName(name) {
      return name && name.trim().length > 0;
    }
    
    /**
     * Validate birthdate input
     * @param {string} birthdate - Birthdate to validate
     * @returns {boolean} True if valid
     */
    validateBirthdate(birthdate) {
      return birthdate && birthdate.trim().length > 0;
      // You can add more sophisticated validation here
      // For example: return /^\d{2}-\d{2}-\d{4}$/.test(birthdate);
    }
    
    /**
     * Validate address input
     * @param {string} address - Address to validate
     * @returns {boolean} True if valid
     */
    validateAddress(address) {
      return address && address.trim().length > 0;
    }
    
    /**
     * Validate numeric selection
     * @param {string} input - Input to validate
     * @param {Array} validOptions - Array of valid options
     * @returns {boolean} True if valid
     */
    validateSelection(input, validOptions) {
      return validOptions.includes(input);
    }
  }
  
  module.exports = new ValidationService();