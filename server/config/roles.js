export const ROLES = {
  super_admin: 'super_admin',
  department_admin: 'department_admin',
  examination_admin: 'examination_admin',
  placement_admin: 'placement_admin',
  faculty_admin: 'faculty_admin',
  research_admin: 'research_admin',
  media_manager: 'media_manager',
  content_editor: 'content_editor',
  event_coordinator: 'event_coordinator',
  viewer: 'viewer',
}

/** Module keys used in admin navigation */
export const MODULES = {
  dashboard: 'dashboard',
  content: 'content',
  academics: 'academics',
  placements: 'placements',
  media: 'media',
  people: 'people',
  settings: 'settings',
}

export const ROLE_MODULES = {
  [ROLES.super_admin]: Object.values(MODULES),
  [ROLES.department_admin]: [MODULES.dashboard, MODULES.content, MODULES.academics, MODULES.media, MODULES.people],
  [ROLES.examination_admin]: [MODULES.dashboard, MODULES.academics, MODULES.media],
  [ROLES.placement_admin]: [MODULES.dashboard, MODULES.placements, MODULES.media],
  [ROLES.faculty_admin]: [MODULES.dashboard, MODULES.people, MODULES.media],
  [ROLES.research_admin]: [MODULES.dashboard, MODULES.content, MODULES.media],
  [ROLES.media_manager]: [MODULES.dashboard, MODULES.media],
  [ROLES.content_editor]: [MODULES.dashboard, MODULES.content, MODULES.media],
  [ROLES.event_coordinator]: [MODULES.dashboard, MODULES.content, MODULES.media],
  [ROLES.viewer]: [MODULES.dashboard],
}

export function canAccessModule(role, module) {
  const allowed = ROLE_MODULES[role] || []
  return allowed.includes(module) || role === ROLES.super_admin
}

export function canApprove(role) {
  return [ROLES.super_admin, ROLES.department_admin].includes(role)
}
