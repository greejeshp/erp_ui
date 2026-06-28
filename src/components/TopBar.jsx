import React, { useState } from 'react';
import { Button, Tooltip, Dropdown, Avatar, Badge } from 'antd';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, BellOutlined,
  MoonOutlined, SunOutlined, UserOutlined, LogoutOutlined,
  SettingOutlined, CalendarOutlined, DownloadOutlined, BgColorsOutlined,
} from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import MegaMenu from './MegaMenu';
import { CompanySwitcher } from '../App';
import { menuData } from '../data/menuData';

function flattenMenu(nodes, module = '') {
  let result = [];
  for (const n of nodes) {
    const mod = module || n.text;
    if (n.href && n.href !== '#') result.push({ text: n.text, href: n.href, module: mod });
    if (n.children) result = result.concat(flattenMenu(n.children, mod));
  }
  return result;
}

function HeaderSearch({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const allItems = React.useMemo(() => flattenMenu(menuData), []);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    return allItems.filter(item =>
      item.text.toLowerCase().includes(query.toLowerCase()) ||
      item.module.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
  }, [query, allItems]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', flex: 1, maxWidth: 380 }}>
      <div
        className="erp-search-trigger"
        style={{ display: 'flex', alignItems: 'center', padding: '0 12px', background: 'var(--bg-layout)', borderRadius: 20, border: '1px solid var(--border-color)' }}
      >
        <SearchOutlined style={{ fontSize: 14, color: 'var(--text-muted)' }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            fontSize: '0.82rem',
            color: 'var(--text-main)',
            padding: '8px 8px',
          }}
        />
        <span className="erp-search-kbd" style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'rgba(0,0,0,0.05)', borderRadius: 4, color: 'var(--text-muted)' }}>Ctrl+K</span>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6,
          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
          borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 1000,
          maxHeight: 320, overflowY: 'auto', padding: '8px 0'
        }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              No results found
            </div>
          ) : (
            filtered.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  onNavigate({ text: item.text, href: item.href, module: item.module });
                  setOpen(false);
                  setQuery('');
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
                  cursor: 'pointer', transition: 'background 0.15s',
                  fontSize: '0.82rem', color: 'var(--text-main)'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontWeight: 600, flex: 1 }}>{item.text}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.04)', padding: '2px 6px', borderRadius: 4 }}>
                  {item.module}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function TopBar({
  collapsed, onToggleSidebar, onSpotlight, darkMode, onDarkMode,
  onNavigate, onOpenBranding, onLogout,
}) {
  const [calMode, setCalMode] = useState('BS');

  const userMenuItems = [
    { key: 'profile',  icon: <UserOutlined />,    label: 'My Profile' },
    { key: 'settings', icon: <SettingOutlined />,  label: 'Account Settings' },
    {
      key: 'branding',
      icon: <BgColorsOutlined style={{ color: 'var(--primary)' }} />,
      label: (
        <span>
          UI &amp; Branding
          <span style={{
            marginLeft: 8,
            fontSize: 10,
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: 4,
            padding: '1px 5px',
            fontWeight: 700,
          }}>
            NEW
          </span>
        </span>
      ),
    },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Sign Out', danger: true },
  ];

  const handleUserMenu = ({ key }) => {
    if (key === 'branding' && onOpenBranding) onOpenBranding();
    if (key === 'logout' && onLogout) onLogout();
  };

  return (
    <header className="erp-topbar">
      {/* ── LEFT: Toggle + Logo + Mega Menu ── */}
      <div className="erp-topbar-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleSidebar}
          style={{ color: 'var(--text-muted)', fontSize: 15 }}
        />
        <div className="erp-logo-brand">
          <div className="erp-logo-icon">D</div>
          <span>Dynamic ERP</span>
        </div>
      </div>

      {/* ── CENTER: Search Bar ── */}
      <HeaderSearch onNavigate={onNavigate} />

      {/* ── RIGHT: Actions + Profile ── */}
      <div className="erp-topbar-right">

        {/* Application Menu */}
        <MegaMenu onNavigate={onNavigate} darkMode={darkMode} />

        {/* Dark mode */}
        <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
          <Button
            type="text"
            icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={onDarkMode}
            style={{ color: 'var(--text-muted)' }}
          />
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <Badge count={24} size="small" color="var(--error)" offset={[-2, 2]}>
            <Button type="text" icon={<BellOutlined />} style={{ color: 'var(--text-muted)' }} />
          </Badge>
        </Tooltip>

        {/* Company Switcher */}
        <div style={{ marginLeft: 6, marginRight: 6, width: 220 }}>
          <CompanySwitcher />
        </div>

        {/* Profile */}
        <Dropdown
          menu={{ items: userMenuItems, onClick: handleUserMenu }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="erp-profile-card">
            <Avatar
              size={30}
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent-blue))',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              AD
            </Avatar>
            <div className="erp-profile-details">
              <div className="erp-profile-name">ADMIN USER</div>
              <div className="erp-profile-role">Inventory Lead</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
