import { useBlogStoreContext } from '@/providers/blog-store-provider'
import { type BlogStore } from '@/stores/blog-store'

export const useBlogStore = <T,>(selector: (store: BlogStore) => T): T => {
  return useBlogStoreContext(selector)
}
