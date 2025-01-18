// lib/verificationCodes.js
class VerificationCodes {
    constructor() {
      this.codes = {}; // Stockage en mémoire
    }
  
    // Méthode pour ajouter un code
    add(email, code) {
      this.codes[email] = {
        code,
        timestamp: Date.now(),
      };
    }
  
    // Méthode pour récupérer un code
    get(email) {
      return this.codes[email];
    }
  
    // Méthode pour supprimer un code
    delete(email) {
      delete this.codes[email];
    }
  }
  
  // Exportation d'une instance unique
  const instance = new VerificationCodes();
  export default instance;
  
