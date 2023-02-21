export interface ISignal {
  id: string;
  side: 'buy' | 'sell';
  symbol: string;
  limit: string;
  take1: string;
  take2?: string;
  take3?: string;
  stopLoss: string;
  result?: string;
  status: 'ativo' | 'expirado' | 'cancelado';
  createdAt?: any;
}