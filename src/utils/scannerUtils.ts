// A simulated OCR and QR parser utility layer.
// In a real environment, this might connect to a vision API
// or utilize a web WASM QR scanner lib like html5-qrcode.

export const scannerUtils = {
  /**
   * Simulates extracting business card text via OCR.
   * @param imageFile The captured image blob
   * @returns Parsed contact data
   */
  async processBusinessCardOCR(imageFile?: Blob) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          fullName: 'Sarah Jenkins',
          company: 'Lumina Tech Solutions',
          email: 's.jenkins@lumina-tech.com',
          phone: '+1 (555) 867-5309',
          source: 'OCR'
        });
      }, 1500); // simulate 1.5s OCR parse time
    });
  },

  /**
   * Simulates parsing a vCard or plain text from a QR code.
   * @param qrData The raw scanned content
   * @returns Parsed contact data
   */
  async parseVCard(qrData: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          fullName: 'John Doe',
          company: 'Acme Corp',
          email: 'john.doe@example.com',
          phone: '',
          source: 'QR'
        });
      }, 500); // simulate 0.5s parse time
    });
  }
};
