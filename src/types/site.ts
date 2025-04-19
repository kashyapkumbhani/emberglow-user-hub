
export interface Site {
  id: string;
  name: string;
  domain?: string;
  status: 'active' | 'pending' | 'error';
  createdAt: string;
  lastUpdated: string;
}
