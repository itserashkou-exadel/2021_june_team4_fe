export interface IHeadState {
  user: string,
  discounts: IDiscount[];
}

export interface IAppState {
  head: IHeadState;
}

export interface IDiscount {
  id: number;
  name: string;
  vendor: string;
  added: string;
  expired: string;
  location: string;
  tag: string;
  cathegory: string;
  isActive: boolean;
  description: string;
  percent: number;
  image: string
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  subscribes: string[];
  favorit: string[];
}


export interface IUserLogin {
  username: string;
  password: string;
}

export interface IToken {
  accessToken: string; 
  refreshToken: string;
}
