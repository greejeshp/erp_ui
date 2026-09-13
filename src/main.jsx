import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { OnboardingProvider } from './context/OnboardingContext';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

// Patch Node.prototype.removeChild and insertBefore to protect against Chrome Translate / browser extensions
// modifying text/nodes inside React-managed containers, causing NotFoundError.
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console) {
        console.warn('Cannot remove child from node because it is not a child of this node:', child, this);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.warn('Cannot insert before node because reference node is not a child of this node:', referenceNode, this);
      }
      return originalInsertBefore.call(this, newNode, null);
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, background: '#0B132B', color: '#fff', fontFamily: 'monospace' }}>
          <div style={{ maxWidth: 800, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: 12, padding: 24, width: '100%' }}>
            <h2 style={{ color: '#ef4444', margin: '0 0 16px 0', fontSize: 20 }}>Application Error Detected</h2>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: 16, borderRadius: 8, overflowX: 'auto', marginBottom: 16 }}>
              <strong style={{ color: '#fca5a5' }}>{this.state.error?.toString()}</strong>
              <pre style={{ color: '#94a3b8', fontSize: 12, marginTop: 10, whiteSpace: 'pre-wrap' }}>
                {this.state.errorInfo?.componentStack || this.state.error?.stack}
              </pre>
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{ padding: '10px 18px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}
            >
              Clear Storage &amp; Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <OnboardingProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </OnboardingProvider>
  </ErrorBoundary>
);
