import Purchases, { CustomerInfo } from 'react-native-purchases';
import { updateUserSubscriptionStatus } from './updateUserSubscriptionStatus';

export async function checkUserSubscriptionStatus(setCustomerInfoAction: (value: CustomerInfo) => void, userUid: string, setValidSubscriptionAction: (value: boolean) => void) {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    setCustomerInfoAction(customerInfo);
    if (typeof customerInfo.entitlements.active.premium !== "undefined") {
      await updateUserSubscriptionStatus(userUid as string, true, setValidSubscriptionAction)
    } else {
      await updateUserSubscriptionStatus(userUid as string, false, setValidSubscriptionAction)
    }
  } catch (error) {
    console.log(error);
    await updateUserSubscriptionStatus(userUid as string, false, setValidSubscriptionAction)
    throw new Error('Não foi possível carregar as informações do usuário. Verifique sua conexão e tente iniciar o aplicativo novamente')
  }
}