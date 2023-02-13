export interface ISignal {
  id: string;
  side: 'buy' | 'sell';
  symbol: string;
  limit: number;
  take1: number;
  take2?: number;
  take3?: number;
  stopLoss: number;
  result?: number;
  expired: boolean;
  createdAt?: string;
}