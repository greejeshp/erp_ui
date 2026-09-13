import React, { useState, useCallback } from 'react';
import { Switch, notification, Input, Tooltip } from 'antd';
import {
  PlusOutlined, DeleteOutlined, CheckOutlined,
  PushpinOutlined, PushpinFilled, ReloadOutlined, EditOutlined, SaveOutlined,
  AccountBookOutlined, InboxOutlined, AppstoreOutlined, SettingOutlined,
  ShopOutlined, BarChartOutlined, SafetyOutlined, TeamOutlined,
  ToolOutlined, DollarCircleOutlined, BankOutlined, CustomerServiceOutlined,
  ThunderboltOutlined, CheckCircleOutlined, FileTextOutlined
} from '@ant-design/icons';
import {
  ALL_MODULES, MODULE_META, GROUP_COLORS, GROUP_ICONS,
  DEFAULT_GROUPS, loadGroups, saveGroups, resetGroups,
  loadActiveGroupId, generateGroupId, getPinnedGroups, getContextGroups,
} from '../data/menuGroupConfig';

export const ICON_MAP = {
  AccountBookOutlined,
  InboxOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ShopOutlined,
  BarChartOutlined,
  SafetyOutlined,
  TeamOutlined,
  ToolOutlined,
  DollarCircleOutlined,
  BankOutlined,
  CustomerServiceOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
};

export function renderGroupIcon(key, style = {}) {
  const IconComponent = ICON_MAP[key] || AppstoreOutlined;
  return <IconComponent style={{ fontSize: 16, ...style }} />;
}

function ModuleCheckbox({ moduleName, checked, onChange, darkMode }) {
  const meta = MODULE_META[moduleName] || { icon: 'FileTextOutlined', color: '#64748b' };
  return (
    <div
      onClick={() => onChange(moduleName, !checked)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
        background: checked ? (meta.color + '14') : 'transparent',
        border: '1px solid ' + (checked ? meta.color : (darkMode ? 'rgba(255,255,255,0.08)' : '#E2E8F0')),
        transition: 'all 0.15s', userSelect: 'none',
      }}
    >
      <span style={{ color: checked ? meta.color : (darkMode ? '#94A3B8' : '#64748B'), display: 'flex', alignItems: 'center' }}>
        {renderGroupIcon(meta.icon, { fontSize: 13 })}
      </span>
      <span style={{ flex: 1, fontSize: 12.5, fontWeight: 500, color: darkMode ? '#E2E8F0' : '#1E293B' }}>
        {moduleName}
      </span>
      <div style={{
        width: 16, height: 16, borderRadius: 4,
        border: '2px solid ' + (checked ? meta.color : (darkMode ? 'rgba(255,255,255,0.2)' : '#CBD5E1')),
        background: checked ? meta.color : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {checked && <CheckOutlined style={{ fontSize: 9, color: '#fff' }} />}
      </div>
    </div>
  );
}

function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: 40, height: 40, borderRadius: 8, fontSize: 16,
          border: '1px solid #CBD5E1', cursor: 'pointer', background: '#F8FAFC',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0F766E',
        }}
      >
        {renderGroupIcon(value)}
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 46, left: 0, zIndex: 100,
          background: '#fff', border: '1px solid #E2E8F0',
          borderRadius: 10, padding: 8, boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, width: 190,
        }}>
          {GROUP_ICONS.map(iconKey => (
            <button
              key={iconKey}
              type="button"
              onClick={() => { onChange(iconKey); setOpen(false); }}
              style={{
                fontSize: 16, padding: '8px 0', cursor: 'pointer',
                border: value === iconKey ? '2px solid #0F766E' : '1px solid #E2E8F0',
                borderRadius: 6, background: value === iconKey ? '#E6F4F2' : 'transparent',
                color: value === iconKey ? '#0F766E' : '#475569',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {renderGroupIcon(iconKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {GROUP_COLORS.map(color => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          style={{
            width: 22, height: 22, borderRadius: '50%', background: color,
            border: value === color ? ('3px solid ' + color) : '2px solid transparent',
            outline: value === color ? '2px solid #fff' : 'none',
            cursor: 'pointer', padding: 0, transition: 'transform 0.1s',
            transform: value === color ? 'scale(1.2)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  );
}

function SidebarPreview({ groups, activeGroupId, darkMode }) {
  const pinned  = getPinnedGroups(groups);
  const context = getContextGroups(groups);
  const active  = context.find(g => g.id === activeGroupId) || context[0];

  const sec = (color) => ({
    padding: '4px 8px', borderRadius: 6, marginBottom: 4,
    borderLeft: '3px solid ' + color,
    background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
  });

  return (
    <div style={{
      width: 160, borderRadius: 10,
      background: darkMode ? '#0A1A18' : '#F0F9F8',
      border: '1px solid rgba(15,118,110,0.2)', overflow: 'hidden', flexShrink: 0,
    }}>
      <div style={{
        padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'center', gap: 6,
        background: darkMode ? '#061715' : '#fff',
      }}>
        <span style={{ color: active?.color || '#0F766E', display: 'flex', alignItems: 'center' }}>
          {renderGroupIcon(active?.icon, { fontSize: 13 })}
        </span>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: darkMode ? '#F7F9F9' : '#0F172A' }}>
            {active ? active.name : 'No Group'}
          </div>
          <div style={{ fontSize: 9, color: '#64748B' }}>Context Group</div>
        </div>
      </div>
      <div style={{ padding: 8 }}>
        {active && (
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 8, fontWeight: 800, color: active.color, letterSpacing: '0.08em', marginBottom: 4 }}>
              {active.name.toUpperCase()}
            </div>
            {active.modules.slice(0, 3).map(m => (
              <div key={m} style={sec(active.color)}>
                <span style={{ fontSize: 10, color: darkMode ? '#CBD5E1' : '#334155' }}>
                  {m}
                </span>
              </div>
            ))}
          </div>
        )}
        {pinned.map(g => (
          <div key={g.id} style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 8, fontWeight: 800, color: g.color, letterSpacing: '0.08em', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
              <PushpinFilled style={{ fontSize: 8 }} /> {g.name.toUpperCase()}
            </div>
            {g.modules.slice(0, 2).map(m => (
              <div key={m} style={sec(g.color)}>
                <span style={{ fontSize: 10, color: darkMode ? '#CBD5E1' : '#334155' }}>
                  {m}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupCard({ group, groups, onUpdate, onDelete, darkMode, isOnly }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...group });

  const handleModuleToggle = (moduleName, checked) => {
    setDraft(d => ({
      ...d,
      modules: checked ? [...d.modules, moduleName] : d.modules.filter(m => m !== moduleName),
    }));
  };

  const handleSave = () => { onUpdate({ ...draft }); setEditing(false); };
  const handleCancel = () => { setDraft({ ...group }); setEditing(false); };

  const ch = darkMode
    ? { bg: '#0A1A18', border: 'rgba(20,184,166,0.18)', heading: '#F7F9F9', muted: '#94A3B8' }
    : { bg: '#FFFFFF', border: '#E2E8F0', heading: '#0F172A', muted: '#64748B' };

  return (
    <div style={{
      borderRadius: 12,
      border: '1.5px solid ' + (group.pinned ? group.color + '60' : ch.border),
      background: group.pinned ? (darkMode ? '#051210' : '#F0FCF9') : ch.bg,
      overflow: 'hidden', transition: 'all 0.2s',
      boxShadow: group.pinned ? '0 0 0 1px ' + group.color + '30, 0 4px 12px rgba(0,0,0,0.06)' : '0 2px 4px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.06)' : '#F1F5F9'),
        background: group.pinned ? (darkMode ? group.color + '18' : group.color + '0D') : 'transparent',
      }}>
        <span style={{
          width: 38, height: 38, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: group.color + '22', border: '1px solid ' + group.color + '44',
          color: group.color,
        }}>{renderGroupIcon(group.icon, { fontSize: 18 })}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: ch.heading }}>{group.name}</span>
            {group.pinned && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: group.color + '22', color: group.color, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <PushpinFilled style={{ fontSize: 9 }} /> PINNED
              </span>
            )}
          </div>
          <div style={{ fontSize: 11.5, color: ch.muted, marginTop: 2 }}>
            {group.modules.length} module{group.modules.length !== 1 ? 's' : ''} assigned
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Tooltip title={group.pinned ? 'Switch to Context-based' : 'Pin — always visible'}>
            <button
              type="button"
              onClick={() => onUpdate({ ...group, pinned: !group.pinned })}
              style={{
                padding: '5px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
                border: '1px solid ' + (group.pinned ? group.color : (darkMode ? 'rgba(255,255,255,0.12)' : '#E2E8F0')),
                background: group.pinned ? group.color + '22' : 'transparent',
                color: group.pinned ? group.color : ch.muted,
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              {group.pinned ? <PushpinFilled /> : <PushpinOutlined />}
            </button>
          </Tooltip>
          <button
            type="button"
            onClick={() => { setDraft({ ...group }); setEditing(e => !e); }}
            style={{
              padding: '5px 8px', borderRadius: 6, cursor: 'pointer',
              border: '1px solid ' + (editing ? group.color : (darkMode ? 'rgba(255,255,255,0.12)' : '#E2E8F0')),
              background: editing ? group.color + '22' : 'transparent',
              color: editing ? group.color : ch.muted, fontSize: 12,
            }}
          >
            <EditOutlined />
          </button>
          {!isOnly && (
            <Tooltip title="Delete group">
              <button
                type="button"
                onClick={() => onDelete(group.id)}
                style={{
                  padding: '5px 8px', borderRadius: 6, cursor: 'pointer',
                  border: '1px solid rgba(217,48,37,0.25)', background: 'rgba(217,48,37,0.06)',
                  color: '#d93025', fontSize: 12,
                }}
              >
                <DeleteOutlined />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {editing && (
        <div style={{ padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 10, marginBottom: 14, alignItems: 'center' }}>
            <IconPicker value={draft.icon} onChange={v => setDraft(d => ({ ...d, icon: v }))} />
            <Input
              value={draft.name}
              onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
              placeholder="Group name"
              size="small"
              style={{ fontWeight: 700, fontSize: 14 }}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ch.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Accent Color</div>
            <ColorPicker value={draft.color} onChange={v => setDraft(d => ({ ...d, color: v }))} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ch.muted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Assign Modules</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {ALL_MODULES.filter(m => m !== 'Quick Access').map(m => (
                <ModuleCheckbox key={m} moduleName={m} checked={draft.modules.includes(m)} onChange={handleModuleToggle} darkMode={darkMode} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button
              type="button"
              onClick={handleSave}
              style={{ flex: 1, padding: '7px 0', borderRadius: 8, cursor: 'pointer', fontWeight: 700, background: '#0F766E', color: '#fff', border: 'none', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <SaveOutlined /> Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{ padding: '7px 14px', borderRadius: 8, cursor: 'pointer', border: '1px solid #E2E8F0', background: 'transparent', color: ch.muted, fontSize: 13 }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!editing && group.modules.length > 0 && (
        <div style={{ padding: '8px 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {group.modules.map(m => (
            <span key={m} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: group.color + '14', color: group.color, border: '1px solid ' + group.color + '30', fontWeight: 600 }}>
              {(MODULE_META[m] || {}).emoji} {m}
            </span>
          ))}
        </div>
      )}
      {!editing && group.modules.length === 0 && (
        <div style={{ padding: '8px 16px 10px', fontSize: 11.5, color: '#f59e0b' }}>
          ⚠️ No modules assigned
        </div>
      )}
    </div>
  );
}

export default function MenuGroupSettings({ darkMode }) {
  const [groups, setGroups] = useState(() => loadGroups());
  const [activeGroupId] = useState(() => loadActiveGroupId());
  const [addingNew, setAddingNew] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', icon: 'AppstoreOutlined', color: '#0F766E', modules: [], pinned: false });

  const ch = darkMode
    ? { bg: '#0F1716', border: 'rgba(20,184,166,0.14)', heading: '#F7F9F9', muted: '#94A3B8', surface: '#0A1A18' }
    : { bg: '#F8FAFC', border: '#E2E8F0', heading: '#0F172A', muted: '#64748B', surface: '#FFFFFF' };

  const handleUpdate = useCallback((updated) => {
    setGroups(prev => {
      const next = prev.map(g => g.id === updated.id ? updated : g);
      saveGroups(next);
      window.dispatchEvent(new CustomEvent('erp-menu-groups-updated'));
      return next;
    });
    notification.success({ message: 'Group updated', description: updated.name + ' saved.', duration: 2 });
  }, []);

  const handleDelete = useCallback((id) => {
    setGroups(prev => {
      const next = prev.filter(g => g.id !== id);
      saveGroups(next);
      window.dispatchEvent(new CustomEvent('erp-menu-groups-updated'));
      return next;
    });
    notification.info({ message: 'Group deleted', duration: 2 });
  }, []);

  const handleAddNew = () => {
    if (!newGroup.name.trim()) return;
    const created = { ...newGroup, id: generateGroupId(newGroup.name), order: groups.length };
    const next = [...groups, created];
    setGroups(next);
    saveGroups(next);
    window.dispatchEvent(new CustomEvent('erp-menu-groups-updated'));
    setNewGroup({ name: '', icon: 'AppstoreOutlined', color: '#0F766E', modules: [], pinned: false });
    setAddingNew(false);
    notification.success({ message: 'Group created', description: created.name + ' added.', duration: 2 });
  };

  const handleReset = () => {
    resetGroups();
    setGroups(DEFAULT_GROUPS);
    window.dispatchEvent(new CustomEvent('erp-menu-groups-updated'));
    notification.info({ message: 'Reset to defaults', duration: 2 });
  };

  const contextGroups = getContextGroups(groups);
  const pinnedGroups  = getPinnedGroups(groups);

  return (
    <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto', fontFamily: 'var(--font-sans, Poppins, sans-serif)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: ch.heading, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AppstoreOutlined style={{ color: '#0F766E' }} /> Menu Group Configuration
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: ch.muted }}>
            Organise sidebar modules into named groups. Pinned groups remain visible; context groups switch via the sidebar header.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" onClick={handleReset} style={{ padding: '7px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600, border: '1px solid #E2E8F0', background: 'transparent', color: ch.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ReloadOutlined /> Reset Defaults
          </button>
          <button type="button" onClick={() => setAddingNew(true)} style={{ padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700, background: '#0F766E', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <PlusOutlined /> New Group
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 20, padding: '10px 16px', borderRadius: 8, background: ch.surface, border: '1px solid ' + ch.border, fontSize: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: ch.muted }}>
          <PushpinFilled style={{ color: '#0F766E' }} />
          <strong>Always Visible:</strong>&nbsp;Shows in sidebar at all times
        </div>
        <div style={{ width: 1, background: ch.border }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: ch.muted }}>
          <AppstoreOutlined style={{ color: '#0F766E' }} />
          <strong>Context-based:</strong>&nbsp;Shown only when selected in sidebar dropdown
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 170px', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {addingNew && (
            <div style={{ borderRadius: 12, border: '2px dashed #0F766E', padding: 16, background: darkMode ? '#051210' : '#F0FCF9' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F766E', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <PlusOutlined /> New Group
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                <IconPicker value={newGroup.icon} onChange={v => setNewGroup(g => ({ ...g, icon: v }))} />
                <Input value={newGroup.name} onChange={e => setNewGroup(g => ({ ...g, name: e.target.value }))} placeholder="Group name" size="small" style={{ fontWeight: 600, fontSize: 13 }} onPressEnter={handleAddNew} autoFocus />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: ch.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Accent Color</div>
                <ColorPicker value={newGroup.color} onChange={v => setNewGroup(g => ({ ...g, color: v }))} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: ch.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Assign Modules</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                  {ALL_MODULES.filter(m => m !== 'Quick Access').map(m => (
                    <ModuleCheckbox key={m} moduleName={m} checked={newGroup.modules.includes(m)}
                      onChange={(mod, checked) => setNewGroup(g => ({ ...g, modules: checked ? [...g.modules, mod] : g.modules.filter(x => x !== mod) }))}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Switch size="small" checked={newGroup.pinned} onChange={v => setNewGroup(g => ({ ...g, pinned: v }))} />
                <span style={{ fontSize: 12.5, color: ch.heading, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {newGroup.pinned ? <><PushpinFilled style={{ color: '#0F766E' }} /> Always visible in sidebar</> : <><AppstoreOutlined /> Context-based (via dropdown)</>}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" onClick={handleAddNew} disabled={!newGroup.name.trim()} style={{ flex: 1, padding: '7px 0', borderRadius: 8, cursor: newGroup.name.trim() ? 'pointer' : 'not-allowed', background: newGroup.name.trim() ? '#0F766E' : '#94A3B8', color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <CheckOutlined /> Create Group
                </button>
                <button type="button" onClick={() => setAddingNew(false)} style={{ padding: '7px 14px', borderRadius: 8, cursor: 'pointer', border: '1px solid #E2E8F0', background: 'transparent', color: ch.muted, fontSize: 13 }}>Cancel</button>
              </div>
            </div>
          )}

          {contextGroups.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <AppstoreOutlined style={{ fontSize: 12 }} /> Context Groups — switched via sidebar header
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {contextGroups.map(g => <GroupCard key={g.id} group={g} groups={groups} onUpdate={handleUpdate} onDelete={handleDelete} darkMode={darkMode} isOnly={groups.length === 1} />)}
              </div>
            </div>
          )}

          {pinnedGroups.length > 0 && (
            <div style={{ marginTop: contextGroups.length > 0 ? 8 : 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0F766E', letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <PushpinFilled style={{ fontSize: 11 }} /> Pinned Groups — always visible
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pinnedGroups.map(g => <GroupCard key={g.id} group={g} groups={groups} onUpdate={handleUpdate} onDelete={handleDelete} darkMode={darkMode} isOnly={groups.length === 1} />)}
              </div>
            </div>
          )}
        </div>

        <div style={{ position: 'sticky', top: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: ch.muted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live Preview</div>
          <SidebarPreview groups={groups} activeGroupId={activeGroupId} darkMode={darkMode} />
          <div style={{ fontSize: 10, color: ch.muted, marginTop: 8, textAlign: 'center', lineHeight: 1.4 }}>Active group + pinned sections</div>
        </div>
      </div>
    </div>
  );
}