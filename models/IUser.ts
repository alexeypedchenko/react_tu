export interface IUser {
  displayName: string | null;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}
