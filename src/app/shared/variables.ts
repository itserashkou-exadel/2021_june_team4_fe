export interface IHeadState {
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
}

export interface IInputTile {
  tileTitle: string;
  tileImg: string;
  tileDescription: string;
  vendorName: string;
  cathegory: string;
  timeEnd: string;
  discountLocation: string;
  discountValue: number;
}
const discount: IDiscount = {
  id: 1,
  name: 'Discount',
  vendor: 'Discount vendor',
  added: '21-06-2021',
  expired: '21-11-2021',
  location: 'kharkiv',
  tag: 'tag',
  cathegory: 'cathegory',
  isActive: true,
  description: 'string',
  percent: 10,
};
