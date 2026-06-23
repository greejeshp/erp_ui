import React, { useState } from 'react';
import { Button, Tooltip, Dropdown, Avatar, Badge } from 'antd';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, BellOutlined,
  MoonOutlined, SunOutlined, UserOutlined, LogoutOutlined,
  SettingOutlined, CalendarOutlined, DownloadOutlined, BgColorsOutlined,
} from '@ant-design/icons';
import MegaMenu from './MegaMenu';

export default function TopBar({
  collapsed, onToggleSidebar, onSpotlight, darkMode, onDarkMode,
  onNavigate, onOpenBranding,
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

        {/* ── MEGA MENU ── */}
        <MegaMenu onNavigate={onNavigate} darkMode={darkMode} />
      </div>

      {/* ── CENTER: Search Bar ── */}
      <div
        className="erp-search-trigger"
        onClick={onSpotlight}
        style={{ flex: 1, maxWidth: 380 }}
      >
        <SearchOutlined style={{ fontSize: 14, color: 'var(--text-muted)' }} />
        <span>Search anything...</span>
        <span className="erp-search-kbd">Ctrl+K</span>
      </div>

      {/* ── RIGHT: Actions + Profile ── */}
      <div className="erp-topbar-right">

        {/* BS / AD Toggle */}
        <div
          onClick={() => setCalMode(m => m === 'BS' ? 'AD' : 'BS')}
          style={{
            display: 'flex',
            background: darkMode ? '#1e2130' : 'var(--gray-100)',
            borderRadius: 20,
            padding: 2,
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {['BS', 'AD'].map(mode => (
            <span
              key={mode}
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 16,
                background: calMode === mode
                  ? (darkMode ? '#6366f1' : 'var(--primary)')
                  : 'transparent',
                color: calMode === mode ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.18s',
              }}
            >
              {mode}
            </span>
          ))}
        </div>

        {/* Calendar */}
        <Tooltip title="Fiscal Calendar">
          <Button type="text" icon={<CalendarOutlined />} style={{ color: 'var(--text-muted)' }} />
        </Tooltip>

        {/* Download */}
        <Tooltip title="Export / Reports">
          <Button type="text" icon={<DownloadOutlined />} style={{ color: 'var(--text-muted)' }} />
        </Tooltip>

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

        {/* Settings */}
        <Tooltip title="System Settings">
          <Button type="text" icon={<SettingOutlined />} style={{ color: 'var(--text-muted)' }} />
        </Tooltip>

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
