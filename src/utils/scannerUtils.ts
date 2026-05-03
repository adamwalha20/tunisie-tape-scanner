import { GoogleGenAI } from '@google/genai';

// Initialize the API if the key exists
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const scannerUtils = {
  /**
   * Extracts business card text via Gemini OCR.
   * @param imageBase64 The captured image in base64 format (without the data URL prefix)
   * @returns Parsed contact data
   */
  async processBusinessCardOCR(imageBase64: string) {
    if (!ai) {
      console.warn("VITE_GEMINI_API_KEY is not set. Falling back to dummy OCR data.");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            fullName: 'Sarah Jenkins (Fallback)',
            company: 'Lumina Tech Solutions',
            jobTitle: 'Software Engineer',
            email: 's.jenkins@lumina-tech.com',
            phone: '+1 (555) 867-5309',
            source: 'OCR'
          });
        }, 1500); // simulate 1.5s OCR parse time
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: 'Extract the following information from this business card and return it as JSON: fullName, company, jobTitle, email, phone. If a field is missing, leave it blank or omit it. Return ONLY valid JSON without markdown formatting.' },
              { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } }
            ]
          }
        ]
      });

      const text = response.text || '';
      // Strip out markdown code blocks if Gemini returns them
      const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsed = JSON.parse(jsonStr);
      return {
        ...parsed,
        source: 'OCR'
      };
    } catch (error) {
      console.error("Gemini OCR Error:", error);
      throw new Error("Failed to extract data from business card.");
    }
  },

  /**
   * Parses a vCard or plain text from a QR code.
   * @param qrData The raw scanned content
   * @returns Parsed contact data
   */
  async parseVCard(qrData: string) {
    // In a real app, you would parse the standard vCard format.
    // For now, we will do a basic extraction or return raw data.
    
    // Very simple fallback parser for demonstration
    const data = {
      fullName: '',
      company: '',
      email: '',
      phone: '',
      jobTitle: '',
      source: 'QR'
    };

    const lines = qrData.split('\n');
    for (const line of lines) {
      if (line.startsWith('FN:')) data.fullName = line.replace('FN:', '').trim();
      if (line.startsWith('ORG:')) data.company = line.replace('ORG:', '').trim();
      if (line.startsWith('EMAIL') && line.includes(':')) data.email = line.split(':')[1].trim();
      if (line.startsWith('TEL') && line.includes(':')) data.phone = line.split(':')[1].trim();
      if (line.startsWith('TITLE:')) data.jobTitle = line.replace('TITLE:', '').trim();
    }

    // If it wasn't a vcard, just put the raw text somewhere or use a generic name
    if (!data.fullName && !data.company && !data.email && !data.phone) {
       data.fullName = 'QR Scan Result';
       // We can store the raw data in notes if we had a notes field, but for now just use it as company
       data.company = qrData.substring(0, 50); 
    }

    return data;
  }
};
