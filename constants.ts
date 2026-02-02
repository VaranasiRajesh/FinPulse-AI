import { Industry, Language } from "./types";

export const APP_NAME = "FinPulse AI";

export const INDUSTRIES = [
  Industry.RETAIL,
  Industry.MANUFACTURING,
  Industry.SERVICES,
  Industry.AGRICULTURE,
  Industry.LOGISTICS,
  Industry.ECOMMERCE,
];

export const UI_STRINGS = {
  [Language.ENGLISH]: {
    dashboard: "Dashboard",
    analysis: "Analysis",
    advisor: "AI Advisor",
    upload: "Upload Data",
    settings: "Settings",
    healthScore: "Health Score",
    revenue: "Revenue",
    expenses: "Expenses",
    profit: "Net Profit",
    cashFlow: "Cash Flow",
    risks: "Key Risks",
    recommendations: "Recommendations",
    generateReport: "Generate Analysis",
    analyzing: "Analyzing Financial Data...",
    uploadPrompt: "Upload CSV, Excel, or PDF text exports",
    orPaste: "Or paste financial summary below",
    demoData: "Load Demo Data",
    welcome: "Welcome back, Business Owner",
    selectIndustry: "Select Industry",
    forecast: "6-Month Forecast",
  },
  [Language.HINDI]: {
    dashboard: "डैशबोर्ड",
    analysis: "विश्लेषण",
    advisor: "AI सलाहकार",
    upload: "डाटा अपलोड",
    settings: "सेटिंग्स",
    healthScore: "स्वास्थ्य स्कोर",
    revenue: "राजस्व",
    expenses: "खर्च",
    profit: "शुद्ध लाभ",
    cashFlow: "नकदी प्रवाह",
    risks: "प्रमुख जोखिम",
    recommendations: "सिफारिशें",
    generateReport: "रिपोर्ट तैयार करें",
    analyzing: "वित्तीय डेटा का विश्लेषण किया जा रहा है...",
    uploadPrompt: "CSV, Excel, या PDF टेक्स्ट अपलोड करें",
    orPaste: "या नीचे वित्तीय सारांश पेस्ट करें",
    demoData: "डेमो डेटा लोड करें",
    welcome: "वापसी पर स्वागत है",
    selectIndustry: "उद्योग चुनें",
    forecast: "6 महीने का पूर्वानुमान",
  },
};

export const MOCK_FINANCIAL_TEXT = `
Financial Summary for Q1-Q4 2024
Industry: Retail
Total Revenue: $1,200,000
COGS: $700,000
Operating Expenses: $350,000
Net Profit: $150,000
Current Assets: $200,000
Current Liabilities: $150,000
Long term debt: $100,000 at 8% interest.
Monthly Revenue trends: Jan: 90k, Feb: 85k, Mar: 95k, Apr: 100k, May: 98k, Jun: 105k, Jul: 110k, Aug: 108k, Sep: 115k, Oct: 120k, Nov: 125k, Dec: 130k.
Inventory turnover is slowing down. Supplier payments are delayed by 15 days on average.
`;