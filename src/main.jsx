import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { OnboardingProvider } from './context/OnboardingContext';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const theme = {
  token: {
    colorPrimary: '#4f46e5',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    borderRadius: 8,
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 13,
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f0f2f5',
    colorBorder: '#e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
  },
  components: {
    Menu: {
      darkItemBg: '#0f1729',
      darkSubMenuItemBg: '#0a1020',
      darkItemSelectedBg: '#4f46e5',
      darkItemHoverBg: '#1e2a45',
      darkItemColor: '#94a3b8',
      darkItemSelectedColor: '#ffffff',
      itemHeight: 36,
    },
    Layout: {
      siderBg: '#0f1729',
      headerBg: '#ffffff',
      bodyBg: '#f0f2f5',
    },
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#374151',
      rowHoverBg: '#f0f4ff',
      borderColor: '#e5e7eb',
    },
    Form: {
      labelFontSize: 12,
      itemMarginBottom: 14,
    },
    Input: {
      paddingBlock: 6,
      paddingInline: 10,
    },
    Button: {
      primaryShadow: '0 2px 8px rgba(79,70,229,0.3)',
    },
    Card: {
      headerBg: '#fafafa',
    },
    Tabs: {
      flex: 1,
      inkBarColor: '#4f46e5',
      itemActiveColor: '#4f46e5',
      itemSelectedColor: '#4f46e5',
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <OnboardingProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </OnboardingProvider>
);
