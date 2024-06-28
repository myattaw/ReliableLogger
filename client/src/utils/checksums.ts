import CryptoJS from 'crypto-js';

export async function getFileChecksum(file: File, algorithm = 'MD5'): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileBuffer = event.target?.result as ArrayBuffer | null;
            if (!fileBuffer) {
                return reject(new Error('File buffer is null or undefined'));
            }
            const wordArray = CryptoJS.lib.WordArray.create(fileBuffer);
            let hash;
            switch (algorithm) {
                case 'SHA-256':
                    hash = CryptoJS.SHA256(wordArray);
                    break;
                case 'MD5':
                    hash = CryptoJS.MD5(wordArray);
                    break;
                // Add other algorithms as needed
                default:
                    return reject(new Error('Unsupported algorithm'));
            }
            resolve(hash.toString(CryptoJS.enc.Hex));
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}
