// api/checker.js
export default async function handler(req, res) {
  const { kode_bank, nomor_rekening } = req.query;
  
  // Pastikan ada input yang diterima
  if (!kode_bank || !nomor_rekening) {
    return res.status(400).json({ success: false, message: 'Kode bank dan nomor rekening diperlukan' });
  }

  try {
    // Misalnya melakukan pengecekan rekening, contoh kode bank dan nomor rekening
    const response = await fetch(`https://api.external-service.com/verify?bank=${kode_bank}&account=${nomor_rekening}`);
    const data = await response.json();

    if (data.success) {
      return res.status(200).json({
        success: true,
        data: {
          nama_pemilik: data.nama_pemilik,
          nama_bank: data.nama_bank,
          nomor_rekening: nomor_rekening,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Rekening tidak ditemukan',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}
