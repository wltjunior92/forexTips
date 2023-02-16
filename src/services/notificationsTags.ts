import OneSignal from 'react-native-onesignal';

export function tagUserStatus(userStatus: string) {
  OneSignal.sendTag('user_status', userStatus)
}

export function tagActiveSubscription(value: string) {
  OneSignal.sendTag('active_subscription', value)
}

