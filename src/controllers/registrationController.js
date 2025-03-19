const messages = require('../constants/messages');
const apiService = require('../services/apiService');
const validationService = require('../services/validationService');

/**
 * Process current registration step
 * @param {Object} sock - WhatsApp socket instance
 * @param {Object} msg - Message object
 * @param {string} remoteJid - User's JID
 * @param {string} currentStep - Current registration step
 * @param {Object} userStateManager - User state manager
 */
async function processRegistrationStep(sock, msg, remoteJid, currentStep, userStateManager) {
  const input = msg.message.conversation.trim();
  
  switch(currentStep) {
    case 'waitingForName':
      await handleNameInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForBirthdate':
      await handleBirthdateInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForAddress':
      await handleAddressInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForRumahPelita':
      await handleRumahPelitaInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForJenisKelamin':
      await handleJenisKelaminInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForUmur':
      await handleUmurInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForPendidikanAyah':
      await handlePendidikanAyahInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForPekerjaanAyah':
      await handlePekerjaanAyahInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForPendidikanIbu':
      await handlePendidikanIbuInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForPekerjaanIbu':
      await handlePekerjaanIbuInput(sock, remoteJid, input, userStateManager);
      break;
    case 'waitingForPendapatanOrtu':
      await handlePendapatanOrtuInput(sock, remoteJid, input, userStateManager);
      break;
  }
}

/**
 * Handle name input
 */
async function handleNameInput(sock, remoteJid, input, userStateManager) {
  if (!validationService.validateName(input)) {
    await sock.sendMessage(remoteJid, { text: messages.NAME_EMPTY });
    return;
  }
  
  userStateManager.updateState(remoteJid, { step: 'waitingForBirthdate' });
  userStateManager.updateRegistrationData(remoteJid, { nama: input });
  
  await sock.sendMessage(remoteJid, { text: messages.NAME_SUCCESS(input) });
}

/**
 * Handle birthdate input
 */
async function handleBirthdateInput(sock, remoteJid, input, userStateManager) {
  if (!validationService.validateBirthdate(input)) {
    await sock.sendMessage(remoteJid, { text: messages.BIRTHDATE_EMPTY });
    return;
  }
  
  userStateManager.updateState(remoteJid, { step: 'waitingForAddress' });
  userStateManager.updateRegistrationData(remoteJid, { tanggalLahir: input });
  
  await sock.sendMessage(remoteJid, { text: messages.BIRTHDATE_SUCCESS(input) });
}

/**
 * Handle address input
 */
async function handleAddressInput(sock, remoteJid, input, userStateManager) {
  if (!validationService.validateAddress(input)) {
    await sock.sendMessage(remoteJid, { text: messages.ADDRESS_EMPTY });
    return;
  }
  
  userStateManager.updateState(remoteJid, { step: 'waitingForRumahPelita' });
  userStateManager.updateRegistrationData(remoteJid, { alamat: input });
  
  await sock.sendMessage(remoteJid, { text: messages.ADDRESS_SUCCESS(input) });
}

/**
 * Handle Rumah Pelita selection
 */
async function handleRumahPelitaInput(sock, remoteJid, input, userStateManager) {
  const rumahPelitaMap = {
    '1': 'Rumah Pelita Manyaran',
    '2': 'Rumah Pelita Patemon',
    '3': 'Rumah Pelita Banyumanik',
    '4': 'Rumah Pelita Bulusan'
  };
  
  if (!rumahPelitaMap[input]) {
    await sock.sendMessage(remoteJid, { text: messages.RUMAH_PELITA_INVALID });
    return;
  }
  
  const asalRumahPelita = rumahPelitaMap[input];
  userStateManager.updateState(remoteJid, { step: 'waitingForJenisKelamin' });
  userStateManager.updateRegistrationData(remoteJid, { asalRumahPelita });
  
  await sock.sendMessage(remoteJid, { text: messages.RUMAH_PELITA_SUCCESS(asalRumahPelita) });
}

/**
 * Handle gender selection
 */
async function handleJenisKelaminInput(sock, remoteJid, input, userStateManager) {
  const jenisKelaminMap = {
    '1': 'Laki-laki',
    '2': 'Perempuan'
  };
  
  if (!jenisKelaminMap[input]) {
    await sock.sendMessage(remoteJid, { text: messages.JENIS_KELAMIN_INVALID });
    return;
  }
  
  const jenisKelamin = jenisKelaminMap[input];
  userStateManager.updateState(remoteJid, { step: 'waitingForUmur' });
  userStateManager.updateRegistrationData(remoteJid, { jenisKelamin });
  
  await sock.sendMessage(remoteJid, { text: messages.JENIS_KELAMIN_SUCCESS(jenisKelamin) });
}

/**
 * Handle age category selection
 */
async function handleUmurInput(sock, remoteJid, input, userStateManager) {
  const umurMap = {
    '1': 'Kurang dari 1 tahun',
    '2': '1-2 tahun',
    '3': 'Lebih dari 2 tahun'
  };
  
  if (!umurMap[input]) {
    await sock.sendMessage(remoteJid, { text: messages.UMUR_INVALID });
    return;
  }
  
  const umur = umurMap[input];
  userStateManager.updateState(remoteJid, { step: 'waitingForPendidikanAyah' });
  userStateManager.updateRegistrationData(remoteJid, { umur });
  
  await sock.sendMessage(remoteJid, { text: messages.UMUR_SUCCESS(umur) });
}

/**
 * Handle father's education selection
 */
async function handlePendidikanAyahInput(sock, remoteJid, input, userStateManager) {
  const pendidikanMap = {
    '1': 'SD',
    '2': 'SMP/MTsN',
    '3': 'SMA/MAN/SMK',
    '4': 'D1/D2/D3',
    '5': 'S1/S2/S3'
  };
  
  if (!pendidikanMap[input]) {
    await sock.sendMessage(remoteJid, { text: messages.PENDIDIKAN_AYAH_INVALID });
    return;
  }
  
  const pendidikanAyah = pendidikanMap[input];
  userStateManager.updateState(remoteJid, { step: 'waitingForPekerjaanAyah' });
  userStateManager.updateRegistrationData(remoteJid, { pendidikanAyah });
  
  await sock.sendMessage(remoteJid, { text: messages.PENDIDIKAN_AYAH_SUCCESS(pendidikanAyah) });
}

/**
 * Handle father's occupation selection
 */
async function handlePekerjaanAyahInput(sock, remoteJid, input, userStateManager) {
  const pekerjaanMap = {
    '1': 'Wiraswasta',
    '2': 'Karyawan',
    '3': 'Tidak bekerja/IRT',
    '4': 'Lain-lain'
  };
  
  if (!pekerjaanMap[input]) {
    await sock.sendMessage(remoteJid, { text: messages.PEKERJAAN_AYAH_INVALID });
    return;
  }
  
  const pekerjaanAyah = pekerjaanMap[input];
  userStateManager.updateState(remoteJid, { step: 'waitingForPendidikanIbu' });
  userStateManager.updateRegistrationData(remoteJid, { pekerjaanAyah });
  
  await sock.sendMessage(remoteJid, { text: messages.PEKERJAAN_AYAH_SUCCESS(pekerjaanAyah) });
}

/**
 * Handle mother's education selection
 */
async function handlePendidikanIbuInput(sock, remoteJid, input, userStateManager) {
  const pendidikanMap = {
    '1': 'SD',
    '2': 'SMP/MTsN',
    '3': 'SMA/MAN/SMK',
    '4': 'D1/D2/D3',
    '5': 'S1/S2/S3'
  };
  
  if (!pendidikanMap[input]) {
    await sock.sendMessage(remoteJid, { text: messages.PENDIDIKAN_IBU_INVALID });
    return;
  }
  
  const pendidikanIbu = pendidikanMap[input];
  userStateManager.updateState(remoteJid, { step: 'waitingForPekerjaanIbu' });
  userStateManager.updateRegistrationData(remoteJid, { pendidikanIbu });
  
  await sock.sendMessage(remoteJid, { text: messages.PENDIDIKAN_IBU_SUCCESS(pendidikanIbu) });
}

/**
 * Handle mother's occupation selection
 */
async function handlePekerjaanIbuInput(sock, remoteJid, input, userStateManager) {
  const pekerjaanMap = {
    '1': 'Wiraswasta',
    '2': 'Karyawan',
    '3': 'Tidak bekerja/IRT',
    '4': 'Lain-lain'
  };
  
  if (!pekerjaanMap[input]) {
    await sock.sendMessage(remoteJid, { text: messages.PEKERJAAN_IBU_INVALID });
    return;
  }
  
  const pekerjaanIbu = pekerjaanMap[input];
  userStateManager.updateState(remoteJid, { step: 'waitingForPendapatanOrtu' });
  userStateManager.updateRegistrationData(remoteJid, { pekerjaanIbu });
  
  await sock.sendMessage(remoteJid, { text: messages.PEKERJAAN_IBU_SUCCESS(pekerjaanIbu) });
}

/**
 * Handle parents' income selection
 */
async function handlePendapatanOrtuInput(sock, remoteJid, input, userStateManager) {
  const pendapatanMap = {
    '1': '≤ Rp.500.000',
    '2': 'Rp.500.000- Rp.1.000.000',
    '3': 'Rp.1.000.000- Rp.2.000.000',
    '4': 'Rp.2.000.000- Rp.3.000.000',
    '5': '> Rp.3.000.000'
  };
  
  if (!pendapatanMap[input]) {
    await sock.sendMessage(remoteJid, { text: messages.PENDAPATAN_ORTU_INVALID });
    return;
  }
  
  const pendapatanOrtu = pendapatanMap[input];
  userStateManager.updateRegistrationData(remoteJid, { pendapatanOrtu });
  
  try {
    const userData = userStateManager.getRegistrationData(remoteJid);
    await apiService.registerUser(userData);
    
    await sock.sendMessage(remoteJid, { text: messages.REGISTRATION_COMPLETE(userData) });
    userStateManager.clearState(remoteJid);
  } catch (error) {
    console.error('Error sending registration data:', error);
    await sock.sendMessage(remoteJid, { 
      text: 'Maaf, terjadi kesalahan saat mengirim data pendaftaran. Silakan coba lagi.' 
    });
  }
}

module.exports = {
  processRegistrationStep
};