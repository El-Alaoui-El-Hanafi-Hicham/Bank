export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
}
export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountType: string;
  timeStamp: string|Date|number|undefined|null;
}
export interface Compte {
        "codeCompte": number,
        "dateCreation": string|Date|number|undefined|null;
        "solde": number,
        "taux": number
}
