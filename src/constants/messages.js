/**
 * Message templates used in the WhatsApp bot
 */
module.exports = {
  // Welcome message
  WELCOME_MESSAGE: 'Selamat datang pada bot pintar serpihan!\n\nPilih menu dengan mengetik nomor:\n1. Daftar\n2. Cek-data',
  
  // Registration messages
  ASK_NAME: 'Silahkan masukan nama anak anda:',
  
  // Data check messages
  CHECK_DATA: 'Berikut data Anda...',
  
  // Success messages
  NAME_SUCCESS: (nama) => `Nama anak berhasil disimpan: ${nama}\n\nSelanjutnya, silahkan masukkan tanggal lahir anak dengan format DD-MM-YYYY:`,
  BIRTHDATE_SUCCESS: (tanggalLahir) => `Tanggal lahir berhasil disimpan: ${tanggalLahir}\n\nSelanjutnya, silahkan masukkan alamat lengkap:`,
  ADDRESS_SUCCESS: (alamat) => `Alamat berhasil disimpan: ${alamat}\n\nSelanjutnya, silahkan pilih Rumah Pelita:\n1. Rumah Pelita Manyaran\n2. Rumah Pelita Patemon\n3. Rumah Pelita Banyumanik\n4. Rumah Pelita Bulusan`,
  RUMAH_PELITA_SUCCESS: (rumahPelita) => `Rumah Pelita berhasil dipilih: ${rumahPelita}\n\nSelanjutnya, silahkan pilih jenis kelamin:\n1. Laki-laki\n2. Perempuan`,
  JENIS_KELAMIN_SUCCESS: (jenisKelamin) => `Jenis kelamin berhasil dipilih: ${jenisKelamin}\n\nSelanjutnya, silahkan pilih kategori umur:\n1. Kurang dari 1 tahun\n2. 1-2 tahun\n3. Lebih dari 2 tahun`,
  UMUR_SUCCESS: (umur) => `Kategori umur berhasil dipilih: ${umur}\n\nSelanjutnya, silahkan pilih pendidikan terakhir ayah:\n1. SD\n2. SMP/MTsN\n3. SMA/MAN/SMK\n4. D1/D2/D3\n5. S1/S2/S3`,
  PENDIDIKAN_AYAH_SUCCESS: (pendidikanAyah) => `Pendidikan terakhir ayah berhasil dipilih: ${pendidikanAyah}\n\nSelanjutnya, silahkan pilih pekerjaan ayah:\n1. Wiraswasta\n2. Karyawan\n3. Tidak bekerja/IRT\n4. Lain-lain`,
  PEKERJAAN_AYAH_SUCCESS: (pekerjaanAyah) => `Pekerjaan ayah berhasil dipilih: ${pekerjaanAyah}\n\nSelanjutnya, silahkan pilih pendidikan terakhir ibu:\n1. SD\n2. SMP/MTsN\n3. SMA/MAN/SMK\n4. D1/D2/D3\n5. S1/S2/S3`,
  PENDIDIKAN_IBU_SUCCESS: (pendidikanIbu) => `Pendidikan terakhir ibu berhasil dipilih: ${pendidikanIbu}\n\nSelanjutnya, silahkan pilih pekerjaan ibu:\n1. Wiraswasta\n2. Karyawan\n3. Tidak bekerja/IRT\n4. Lain-lain`,
  PEKERJAAN_IBU_SUCCESS: (pekerjaanIbu) => `Pekerjaan ibu berhasil dipilih: ${pekerjaanIbu}\n\nSelanjutnya, silahkan pilih pendapatan orang tua:\n1. ≤ Rp.500.000\n2. Rp.500.000- Rp.1.000.000\n3. Rp.1.000.000- Rp.2.000.000\n4. Rp.2.000.000- Rp.3.000.000\n5. > Rp.3.000.000`,
  
  // Registration complete message
  REGISTRATION_COMPLETE: (userData) => 
    `✅ Pendaftaran berhasil diselesaikan!\n\n` +
    `📋 Ringkasan data:\n` +
    `- Nama: ${userData.nama}\n` +
    `- Tanggal Lahir: ${userData.tanggalLahir}\n` +
    `- Alamat: ${userData.alamat}\n` +
    `- Rumah Pelita: ${userData.asalRumahPelita}\n` +
    `- Jenis Kelamin: ${userData.jenisKelamin}\n` +
    `- Kategori Umur: ${userData.umur}\n` +
    `- Pendidikan Ayah: ${userData.pendidikanAyah}\n` +
    `- Pekerjaan Ayah: ${userData.pekerjaanAyah}\n` +
    `- Pendidikan Ibu: ${userData.pendidikanIbu}\n` +
    `- Pekerjaan Ibu: ${userData.pekerjaanIbu}\n` +
    `- Pendapatan Orang Tua: ${userData.pendapatanOrtu}\n\n` +
    `Terima kasih telah mendaftar! 🙏`,
  
  // Error messages
  NAME_EMPTY: 'Nama tidak boleh kosong. Silakan coba lagi.',
  FORMAT_INVALID: 'Format pesan tidak sesuai. Mohon gunakan format yang benar.',
  BIRTHDATE_EMPTY: 'Tanggal lahir tidak boleh kosong. Silakan masukkan tanggal lahir dengan format DD-MM-YYYY.',
  ADDRESS_EMPTY: 'Alamat tidak boleh kosong. Silakan masukkan alamat lengkap.',
  ADDRESS_ERROR: 'Maaf, terjadi kesalahan saat menyimpan alamat. Silakan coba lagi.',
  RUMAH_PELITA_INVALID: 'Pilihan tidak valid. Silakan pilih nomor 1 sampai 4 untuk Rumah Pelita.',
  RUMAH_PELITA_ERROR: 'Maaf, terjadi kesalahan saat memilih Rumah Pelita. Silakan coba lagi.',
  JENIS_KELAMIN_INVALID: 'Pilihan tidak valid. Silakan pilih nomor 1 atau 2 untuk jenis kelamin.',
  JENIS_KELAMIN_ERROR: 'Maaf, terjadi kesalahan saat memilih jenis kelamin. Silakan coba lagi.',
  UMUR_INVALID: 'Pilihan tidak valid. Silakan pilih nomor 1, 2, atau 3 untuk kategori umur.',
  UMUR_ERROR: 'Maaf, terjadi kesalahan saat memilih kategori umur. Silakan coba lagi.',
  PENDIDIKAN_AYAH_INVALID: 'Pilihan tidak valid. Silakan pilih nomor 1 sampai 5 untuk pendidikan terakhir ayah.',
  PEKERJAAN_AYAH_INVALID: 'Pilihan tidak valid. Silakan pilih nomor 1 sampai 4 untuk pekerjaan ayah.',
  PENDIDIKAN_IBU_INVALID: 'Pilihan tidak valid. Silakan pilih nomor 1 sampai 5 untuk pendidikan terakhir ibu.',
  PEKERJAAN_IBU_INVALID: 'Pilihan tidak valid. Silakan pilih nomor 1 sampai 4 untuk pekerjaan ibu.',
  PENDAPATAN_ORTU_INVALID: 'Pilihan tidak valid. Silakan pilih nomor 1 sampai 5 untuk pendapatan orang tua.'
};