// ── Menu Group Configuration ──────────────────────────────────────────────────
// Organises top-level menuData modules into named groups.
// pinned: true  → always visible in sidebar regardless of dropdown selection
// pinned: false → only shown when this group is selected in the dropdown

export const ALL_MODULES = [
  "Quick Access", "IRD Audit", "MIS Reports", "Accounting",
  "Inventory", "Repair & maintaince", "Setup", "Expenses",
  "Assets Management", "Task", "Support",
];

export const MODULE_META = {
  "Quick Access":        { icon: "ThunderboltOutlined", color: "#f59e0b" },
  "IRD Audit":           { icon: "SafetyOutlined", color: "#0f9d58" },
  "MIS Reports":         { icon: "BarChartOutlined", color: "#1a6ef8" },
  "Accounting":          { icon: "AccountBookOutlined", color: "#0F766E" },
  "Inventory":           { icon: "InboxOutlined", color: "#7c3aed" },
  "Repair & maintaince": { icon: "ToolOutlined", color: "#d97706" },
  "Setup":               { icon: "SettingOutlined", color: "#64748b" },
  "Expenses":            { icon: "DollarCircleOutlined", color: "#d93025" },
  "Assets Management":   { icon: "BankOutlined", color: "#1a6ef8" },
  "Task":                { icon: "CheckCircleOutlined", color: "#0f9d58" },
  "Support":             { icon: "CustomerServiceOutlined", color: "#7c3aed" },
};

export const GROUP_COLORS = [
  "#0F766E", "#7C3AED", "#D97706", "#0F52BA", "#047857",
  "#DC2626", "#64748B", "#0891B2", "#9333EA", "#EA580C",
];

export const GROUP_ICONS = [
  "AccountBookOutlined", "InboxOutlined", "AppstoreOutlined", "SettingOutlined",
  "ShopOutlined", "BarChartOutlined", "SafetyOutlined", "TeamOutlined",
  "ToolOutlined", "DollarCircleOutlined", "BankOutlined", "CustomerServiceOutlined",
];

export const DEFAULT_GROUPS = [
  { id: "accounting",  name: "Accounting",  icon: "AccountBookOutlined", color: "#0F766E", modules: ["Accounting", "IRD Audit", "MIS Reports"], pinned: false, order: 0 },
  { id: "inventory",   name: "Inventory",   icon: "InboxOutlined",       color: "#7C3AED", modules: ["Inventory"],                               pinned: false, order: 1 },
  { id: "operations",  name: "Operations",  icon: "AppstoreOutlined",    color: "#D97706", modules: ["Expenses", "Assets Management", "Repair & maintaince", "Task", "Support"], pinned: false, order: 2 },
  { id: "system",      name: "System",      icon: "SettingOutlined",     color: "#64748B", modules: ["Setup"],                                   pinned: true,  order: 3 },
];

const STORAGE_GROUPS = "erp-menu-groups";
const STORAGE_ACTIVE  = "erp-active-group";

export function loadGroups() {
  try {
    const saved = localStorage.getItem(STORAGE_GROUPS);
    if (!saved) return DEFAULT_GROUPS;
    const parsed = JSON.parse(saved);
    return parsed.map((g, i) => {
      // Normalize legacy emojis to Ant Design icon keys if found
      let icon = g.icon || "AppstoreOutlined";
      if (icon === "📒") icon = "AccountBookOutlined";
      else if (icon === "📦") icon = "InboxOutlined";
      else if (icon === "💼") icon = "AppstoreOutlined";
      else if (icon === "⚙️") icon = "SettingOutlined";
      else if (!GROUP_ICONS.includes(icon)) icon = "AppstoreOutlined";

      return {
        id:      g.id      || "group-" + i,
        name:    g.name    || "Unnamed",
        icon:    icon,
        color:   g.color   || "#64748B",
        modules: Array.isArray(g.modules) ? g.modules : [],
        pinned:  !!g.pinned,
        order:   typeof g.order === "number" ? g.order : i,
      };
    });
  } catch { return DEFAULT_GROUPS; }
}

export function saveGroups(groups) {
  localStorage.setItem(STORAGE_GROUPS, JSON.stringify(groups));
}

export function resetGroups() {
  localStorage.removeItem(STORAGE_GROUPS);
  localStorage.removeItem(STORAGE_ACTIVE);
}

export function loadActiveGroupId() {
  const saved = localStorage.getItem(STORAGE_ACTIVE);
  if (saved) return saved;
  const groups = loadGroups();
  const first = groups.find(g => !g.pinned);
  return first ? first.id : (groups[0] ? groups[0].id : "accounting");
}

export function saveActiveGroupId(id) {
  localStorage.setItem(STORAGE_ACTIVE, id);
}

export function getGroupModules(group, menuData) {
  return menuData.filter(node => group.modules.includes(node.text));
}

export function generateGroupId(name) {
  return "group-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
}

export function getPinnedGroups(groups) {
  return [...groups].filter(g => g.pinned).sort((a, b) => a.order - b.order);
}

export function getContextGroups(groups) {
  return [...groups].filter(g => !g.pinned).sort((a, b) => a.order - b.order);
}
