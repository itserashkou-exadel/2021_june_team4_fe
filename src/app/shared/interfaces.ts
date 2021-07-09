export interface IUiConfigState {
  homeIsMap: boolean;
  appLanguage: string;
}

export interface IFilterState {
  controlsValues: IFilterControls,
  formValues: any,
  chips: string [],
}
export interface IFilterControls {
  locations: ILocationsGroup[],
  cathegories: string[],
  tags: string[],
  vendors?: any,
}
export interface ILocationsGroup{
  countryName: string,
  cities: string[]
}

export interface IMapMarker {
  cords: number[][],
  text: string
}
export interface IDescription {
  id: string;
  active: boolean;
  archived: boolean;
  category:{};
  description: string;
  name: string;
  img:[string];
  endTime: string;
  startTime: string;
  percent: number;
  promo: string;
  tags: any;
  vendor: {
    name: any;
    description: any;
    contacts: any;
  };
  vendorLocations: [{
    vendorLocations: any;
    city: {
      countryName: string;
      name: string;
    },
    latitude: number;
    longitude: number;
  }];
}

export interface IDescriptionState {
  description: IDescription;
}

export interface IHomeState {
  user: string,
  discounts: IDiscount[];
}

export interface IAppState {
  home: IHomeState;
  uiConfig: IUiConfigState;
  description: IDescriptionState;
  filter: IFilterState;
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
  coordinates: number[][]
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
