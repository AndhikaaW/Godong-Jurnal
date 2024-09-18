const baseUrlApi = `http://192.168.1.38:8000/api`;

export const apiEndpoints = {
  getsidebar: `${baseUrlApi}/getsidebar`,
  getLaporan:`${baseUrlApi}/getproducts`,
  getKontak : `${baseUrlApi}/getViewMaster`,
  getJenisKontak : `${baseUrlApi}/getJenisKontak`,
  
// Tambahkan endpoint lain di sini
};

export { baseUrlApi };