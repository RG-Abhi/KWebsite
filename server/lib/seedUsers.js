import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { ROLES } from '../config/roles.js'

const DEFAULT_USERS = [
  { username: 'admin', displayName: 'Super Admin', role: ROLES.super_admin, password: 'kmit123' },
  { username: 'placement', displayName: 'Placement Admin', role: ROLES.placement_admin, password: 'kmit123' },
  { username: 'exams', displayName: 'Examination Admin', role: ROLES.examination_admin, password: 'kmit123' },
  { username: 'csehod', displayName: 'CSE Department Admin', role: ROLES.department_admin, departmentId: 'cse', password: 'kmit123' },
  { username: 'editor', displayName: 'Content Editor', role: ROLES.content_editor, password: 'kmit123' },
]

export async function seedUsers() {
  for (const u of DEFAULT_USERS) {
    const exists = await User.findOne({ username: u.username })
    if (exists) continue
    const passwordHash = await bcrypt.hash(u.password, 10)
    await User.create({
      username: u.username,
      displayName: u.displayName,
      role: u.role,
      departmentId: u.departmentId || null,
      passwordHash,
    })
    console.log(`Seeded user: ${u.username} (${u.role})`)
  }
}
