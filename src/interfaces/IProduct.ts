import { PurchasesPackage } from 'react-native-purchases';


export type IProduct = {
  title: string;
  description: string;
  price: number;
  priceString: string;
  currencyCode: string;
  identifier: string;
  package: PurchasesPackage;
}