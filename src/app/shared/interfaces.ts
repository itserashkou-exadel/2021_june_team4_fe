export interface IUiConfigState {
  homeIsMap: boolean;
}


export interface IDescription {
  id: string;
  active: boolean;
  category: {};
  description: string;
  name: string;
  img: string;
  endTime: string;
  startTime: string;
  percent: number;
  promo: string;
  tags: any;
  vendor: {};
  vendorLocations: any;
}

export interface IDescriptionState {
  description: IDescription;
}

export interface IHomeState {
  user: string,
  discounts: IDiscount[];
}

export interface IAppLanguage {
  appLanguage : EAppLanguage;
}

export interface IAppState {
  home: IHomeState;
  uiConfig: IUiConfigState;
  description: IDescriptionState;
}

export interface IDiscount {
  id: number;
  name: string;
  vendor: string;
  added: string;
  expired: string;
  location: string;
  tag: string;
  category: string;
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
  favorite: string[];
}


export interface IUserLogin {
  username: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IVendor {
  id: string;
  name: string;
  description: string;
  vendorLocations: Array<Object>;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ITag {
  id: string;
  name: string;
}

enum EAppLanguage {
  'EN', 'RU'
}
