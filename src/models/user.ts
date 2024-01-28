export interface IProfile {
  avatar?: string;
  firstName: string;
  lastName: string;
}

export interface IUser {
  createdAt?: string;
  id?: string;
  profile: IProfile;
  username: string;
}