export const MODULES = {
  dashboard: 'dashboard',
  content: 'content',
  exams: 'exams',
  academics: 'academics',
  placements: 'placements',
  media: 'media',
  people: 'people',
  settings: 'settings',
}

export const MODULE_LABELS = {
  dashboard: 'Dashboard',
  content: 'Content',
  exams: 'Exams Manager',
  academics: 'Academics',
  placements: 'Placements',
  media: 'Media',
  people: 'People',
  settings: 'Settings',
}

export const MODULE_ICONS = {
  dashboard: 'fa-gauge-high',
  content: 'fa-file-lines',
  exams: 'fa-file-signature',
  academics: 'fa-graduation-cap',
  placements: 'fa-briefcase',
  media: 'fa-photo-film',
  people: 'fa-users',
  settings: 'fa-sliders',
}

export const ROLES = {
  admin: 'admin',
}

export function getModulesForRole(role) {
  // Just one admin mode — give full access to all modules to everyone logged in
  return Object.values(MODULES)
}

export function canApprove(role) {
  // Give full approval rights to everyone logged in
  return true
}


