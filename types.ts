export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
}

export enum Industry {
  RETAIL = 'Retail',
  MANUFACTURING = 'Manufacturing',
  SERVICES = 'Services',
  AGRICULTURE = 'Agriculture',
  LOGISTICS = 'Logistics',
  ECOMMERCE = 'E-commerce',
}

export interface MetricData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface Risk {
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
}

export interface Recommendation {
  category: 'cost' | 'revenue' | 'banking';
  title: string;
  action: string;
}

export interface FinancialHealthAnalysis {
  healthScore: number;
  summary: string;
  metrics: {
    grossMargin: string;
    netProfitMargin: string;
    currentRatio: string;
    debtToEquity: string;
  };
  risks: Risk[];
  recommendations: Recommendation[];
  trendData: MetricData[];
  forecastData: MetricData[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}