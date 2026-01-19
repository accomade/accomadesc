import { navigationIcons } from './icons/navigation.js';
import { actionIcons } from './icons/actions.js';
import { uiIcons } from './icons/ui.js';

const iconCategories: Record<string, Record<string, string>> = {
  navigation: navigationIcons,
  actions: actionIcons,
  ui: uiIcons,
};

const categoryMap: Record<string, keyof typeof iconCategories> = {
  moon: 'ui',
  sun: 'ui',
  back: 'navigation',
  up: 'navigation',
  down: 'navigation',
  edit: 'actions',
  delete: 'actions',
  save: 'actions',
  clone: 'actions',
  upload: 'actions',
  generate: 'actions',
  add: 'actions',
  discard: 'actions',
  reset: 'actions',
  abort: 'actions',
  close: 'ui',
  minimize: 'ui',
  cog: 'ui',
  arrows: 'ui',
  again: 'ui',
  select: 'ui',
  show: 'ui',
  placeholder: 'ui',
};

const iconCache: Record<string, string> = {};

export const getIcon = (name: string, color = 'black'): string => {
  if (iconCache[name]) {
    return iconCache[name];
  }

  const category = categoryMap[name];
  if (!category || !iconCategories[category]) {
    console.warn(`Icon "${name}" not found`);
    return '';
  }

  const categoryIcons = iconCategories[category];
  const iconSvg = categoryIcons?.[name];

  if (iconSvg) {
    const coloredIcon = iconSvg.replace(/\{color\}|{color}/g, color);
    iconCache[name] = coloredIcon;
    return coloredIcon;
  }

  console.warn(`Icon "${name}" not found in category "${category}"`);
  return '';
};

export type IconName = keyof typeof categoryMap;
