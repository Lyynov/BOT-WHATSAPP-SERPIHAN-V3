/**
 * Class to manage user state during conversations
 */
class UserState {
    constructor() {
      this.states = {};
    }
  
    /**
     * Get user state by ID
     * @param {string} userId - User identifier
     * @returns {Object|null} User state or null if not found
     */
    getState(userId) {
      return this.states[userId] || null;
    }
  
    /**
     * Set user state
     * @param {string} userId - User identifier
     * @param {Object} state - State object to set
     */
    setState(userId, state) {
      this.states[userId] = state;
    }
  
    /**
     * Update user state
     * @param {string} userId - User identifier
     * @param {Object} updates - State updates to apply
     */
    updateState(userId, updates) {
      if (!this.states[userId]) {
        this.states[userId] = {};
      }
      
      this.states[userId] = {
        ...this.states[userId],
        ...updates
      };
    }
  
    /**
     * Update registration data for a user
     * @param {string} userId - User identifier
     * @param {Object} dataUpdates - Registration data updates
     */
    updateRegistrationData(userId, dataUpdates) {
      if (!this.states[userId]) {
        this.states[userId] = { registrationData: {} };
      }
      
      if (!this.states[userId].registrationData) {
        this.states[userId].registrationData = {};
      }
      
      this.states[userId].registrationData = {
        ...this.states[userId].registrationData,
        ...dataUpdates
      };
    }
  
    /**
     * Check if user is in registration process
     * @param {string} userId - User identifier
     * @returns {boolean} True if user is in registration process
     */
    isInRegistrationProcess(userId) {
      return Boolean(this.states[userId]?.step);
    }
  
    /**
     * Get current registration step for user
     * @param {string} userId - User identifier
     * @returns {string|null} Current step or null
     */
    getCurrentStep(userId) {
      return this.states[userId]?.step || null;
    }
  
    /**
     * Get registration data for user
     * @param {string} userId - User identifier
     * @returns {Object} Registration data
     */
    getRegistrationData(userId) {
      return this.states[userId]?.registrationData || {};
    }
  
    /**
     * Clear user state
     * @param {string} userId - User identifier
     */
    clearState(userId) {
      delete this.states[userId];
    }
  }
  
  module.exports = UserState;