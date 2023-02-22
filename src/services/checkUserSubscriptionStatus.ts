import Purchases, { CustomerInfo } from 'react-native-purchases';
import { tagActiveSubscription } from './notificationsTags';
import { updateUserSubscriptionStatus } from './updateUserSubscriptionStatus';

export async function checkUserSubscriptionStatus(
  setCustomerInfoAction: (value: CustomerInfo) => void,
  userUid: string,
  setValidSubscriptionAction: (value: boolean) => void,
  previousLoadedCustomer: any,
) {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    if (JSON.stringify(previousLoadedCustomer) === JSON.stringify(customerInfo)) {
      return
    };

    setCustomerInfoAction(customerInfo);
    if (typeof customerInfo.entitlements.active.premium !== "undefined") {
      await updateUserSubscriptionStatus(userUid as string, true, setValidSubscriptionAction)
    } else {
      await updateUserSubscriptionStatus(userUid as string, false, setValidSubscriptionAction)
      tagActiveSubscription('false')
    }
  } catch (error) {
    console.log(error);
    await updateUserSubscriptionStatus(userUid as string, false, setValidSubscriptionAction)
    throw new Error('Não foi possível carregar as informações do usuário. Verifique sua conexão e tente iniciar o aplicativo novamente')
  }
}