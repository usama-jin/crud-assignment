/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  users: {
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    patch: typeof routes['users.patch']
    destroy: typeof routes['users.destroy']
    index: typeof routes['users.index']
  }
}
