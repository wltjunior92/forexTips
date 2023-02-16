import axios from 'axios'

export async function postNewSignalNotification(symbol: string, limit: number, side: 'buy' | 'sell' | '') {
  try {
    const body = {
      filters: [
        { "field": "tag", "key": "active_subscription", "relation": "=", "value": "true" },
        { "field": "tag", "key": "user_status", "relation": "=", "value": "user_logged_in" }
      ],
      headings: { en: 'Novo sinal adicionado!' },
      contents: { en: `Temos um sinal de ${side === 'buy' ? 'compra' : 'venda'} para ${symbol} em ${limit}` },
      name: 'NEW_SIGNAL_ADDED',
      app_id: 'e5f5e4f7-17a3-461e-ad33-0a664663f045'
    };


    axios.post('https://onesignal.com/api/v1/notifications', JSON.stringify(body), {
      headers: {
        accept: 'application/json',
        Authorization: 'Basic NGQ2NDY2MzktM2VmOS00OGEwLTg4NWEtZGVjOGZiZDc5ZDdl',
        'content-type': 'application/json'
      },
    }).then((response: any) => {
      // console.log(JSON.stringify(response.data, null, 2));
    }).catch((error: any) => {
      console.error(error);
    });
  } catch (error) {
    console.log(error)
  }
}