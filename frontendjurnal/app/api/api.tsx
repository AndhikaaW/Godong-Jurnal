// const baseUrlApi = `http://10.208.226.149:8001/api`;    
const baseUrlApi = `http://192.168.200.98:8000/api`;    
// const baseUrlApi = `https://99b2-36-88-34-74.ngrok-free.app/api`;

export const apiEndpoints = {
  //sidebar
  getsidebar: `${baseUrlApi}/getsidebar`,
  getLaporan:`${baseUrlApi}/getproducts`,

  //Kontak
  getKontak : `${baseUrlApi}/getViewMaster`,
  getJenisKontak : `${baseUrlApi}/getJenisKontak`,
  getGrubKontak : `${baseUrlApi}/getGrubKontak`,
  getSebutanKontak : `${baseUrlApi}/getSebutanKontak`,
  getIdentitasKontak : `${baseUrlApi}/getIdentitasKontak`,
  getBank : `${baseUrlApi}/getBank`,
  getAkun : `${baseUrlApi}/getAkun`,
  getKontakById : (kode : string) => `${baseUrlApi}/getKontakById/${kode}`,
  inputDataContact : `${baseUrlApi}/inputDataKontak`,
  inputGrupContact : `${baseUrlApi}/inputGrupKontak`,
  updateGrupContact : `${baseUrlApi}/editGrupKontak`,
  deleteGrupContact : `${baseUrlApi}/deleteGrupKontak`,

// Tambahkan endpoint lain di sini
};

export { baseUrlApi };