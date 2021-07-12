export interface IUiConfigState {
  homeIsMap: boolean;
  appLanguage: string;
}

export interface IFilterState {
  controlsValues: IFilterControls;
  formValues: IFilterFormsValues;
}

export interface ISimpleVar {
  id: string;
  name: string;
}
export interface IFilterFormsValues {
  categories: ISimpleVar[];
  city: ILocationCountry | null;
  vendors: ISimpleVar[];
  chips: ISimpleVar[];
}
export interface IFilterControls {
  locations: ILocationCountry[];
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  vendors: { id: string; name: string }[];
}
export interface ILocationCountry {
   id: string; name: string; 
   cities: { id: string; name: string }[] ;
}

export interface IMapMarker {
  cords: number[][];
  text: string;
}
export interface IDescription {
  id: string;
  active: boolean;
  archived: boolean;
  category: {};
  description: string;
  name: string;
  img: [string];
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
  vendorLocations: [
    {
      city: {
        countryName: string;
        name: string;
      };
    }
  ];
}

export interface IDescriptionState {
  description: IDescription;
}

export interface IHomeState {
  sortValue: string;
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
  image: string;
  coordinates: number[][];
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
