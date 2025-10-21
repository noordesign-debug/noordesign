
export interface User {
  name: string;
  email: string;
}

export interface AdSlot {
  id: number;
}

export enum View {
  Home = 'HOME',
  Auth = 'AUTH',
  Profile = 'PROFILE',
  Referrals = 'REFERRALS',
  Earnings = 'EARNINGS',
}
