'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type BlogStore, createBlogStore, type BlogState } from '@/stores/blog-store'

export const BlogStoreContext = createContext<StoreApi<BlogStore> | null>(
  null,
)

export interface BlogStoreProviderProps {
  children: ReactNode
  initialState?: Partial<BlogState>
}

export const BlogStoreProvider = ({
  children,
  initialState,
}: BlogStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BlogStore>>(null) // Updated: Initialize with null

  if (!storeRef.current) {
    storeRef.current = createBlogStore({
        ...{
            blogs: [],
            currentBlog: null,
            isModalOpen: false,
            selectedPreviewBlog: null,
        },
        ...initialState,
    })
  }

  return (
    <BlogStoreContext.Provider value={storeRef.current}>
      {children}
    </BlogStoreContext.Provider>
  )
}

export const useBlogStoreContext = <T,>(
  selector: (store: BlogStore) => T,
): T => {
  const blogStoreContext = useContext(BlogStoreContext)

  if (!blogStoreContext) {
    throw new Error(`useBlogStoreContext must be used within BlogStoreProvider`)
  }

  return useStore(blogStoreContext, selector)
}
