// api/checker.js

export default async function handler(req, res) {
  const { kode_bank, nomor_rekening } = req.query;

  try {
    const response = await fetch("https://cekrekening-api.belibayar.online/api/v1/account-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_bank: kode_bank,
        account_number: nomor_rekening
      })
    });

    const data = await response.json();

    if (response.ok && data?.data?.account_holder) {
      return res.status(200).json({
        success: true,
        data: {
          nama_pemilik: data.data.account_holder,
          nama_bank: kode_bank,
          nomor_rekening
        }
      });
    } else {
      return res.status(400).json({ success: false, message: data?.message || 'Gagal mengambil data' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
