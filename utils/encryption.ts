import CryptoJS from "crypto-js";

export function encrypt(text: string, key: string): string {
  return CryptoJS.AES.encrypt(text, key).toString();
}
