import firestore from '@react-native-firebase/firestore';

import { ISignal } from 'src/interfaces/ISignal';

type Props = {
  setSignalsAction: (value: ISignal[]) => void;
  setIsLoadingAction: (value: boolean) => void;
}

export async function fetchDefaultUserSignals({ setSignalsAction, setIsLoadingAction }: Props) {
  try {
    firestore()
      .collection('signals')
      .where('status', '!=', 'ativo')
      .limit(10)
      .get()
      .then(response => {
        const data = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ISignal[];

        setSignalsAction(data)
      })
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoadingAction(false);
  }
}