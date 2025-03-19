const axios = require('axios');
const config = require('../../config/config');

/**
 * API Service for communication with backend
 */
class ApiService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} API response
   */
  async registerUser(userData) {
    const apiUrl = `${config.BASE_URL}action=register` +
      `&nama=${encodeURIComponent(userData.nama)}` +
      `&tanggalLahir=${encodeURIComponent(userData.tanggalLahir)}` +
      `&alamat=${encodeURIComponent(userData.alamat)}` +
      `&asalRumahPelita=${encodeURIComponent(userData.asalRumahPelita)}` +
      `&jenisKelamin=${encodeURIComponent(userData.jenisKelamin)}` +
      `&umur=${encodeURIComponent(userData.umur)}` +
      `&pendidikanAyah=${encodeURIComponent(userData.pendidikanAyah)}` +
      `&pekerjaanAyah=${encodeURIComponent(userData.pekerjaanAyah)}` +
      `&pendidikanIbu=${encodeURIComponent(userData.pendidikanIbu)}` +
      `&pekerjaanIbu=${encodeURIComponent(userData.pekerjaanIbu)}` +
      `&pendapatanOrtu=${encodeURIComponent(userData.pendapatanOrtu)}`;
    
    console.log('Sending data to API:', apiUrl);
    const response = await axios.get(apiUrl, { timeout: config.timeout });
    console.log('API Response (complete registration):', JSON.stringify(response.data));
    
    return response.data;
  }
  
  /**
   * Get user data by ID or other criteria
   * @param {string} userIdentifier - User ID or other criteria
   * @returns {Promise} API response with user data
   */
  async getUserData(userIdentifier) {
    const apiUrl = `${config.BASE_URL}action=getData&id=${encodeURIComponent(userIdentifier)}`;
    
    console.log('Fetching user data from API:', apiUrl);s
    const response = await axios.get(apiUrl, { timeout: config.timeout });
    console.log('API Response (user data):', JSON.stringify(response.data));
    
    return response.data;
  }
}

module.exports = new ApiService();