import { createStore } from 'zustand/vanilla'
import { BlogPreview, BlogData } from '@/types/blogData'

export type BlogState = {
  blogs: BlogPreview[]
  currentBlog: BlogData | null
  isModalOpen: boolean
  selectedPreviewBlog: BlogPreview | null
}

export type BlogActions = {
  setBlogs: (blogs: BlogPreview[]) => void
  setCurrentBlog: (blog: BlogData | null) => void
  openPreviewModal: (blog: BlogPreview) => void
  closePreviewModal: () => void
}

export type BlogStore = BlogState & BlogActions

export const defaultInitState: BlogState = {
  blogs: [],
  currentBlog: null,
  isModalOpen: false,
  selectedPreviewBlog: null,
}

export const createBlogStore = (initState: BlogState = defaultInitState) => {
  return createStore<BlogStore>()((set) => ({
    ...initState,
    setBlogs: (blogs) => set(() => ({ blogs })),
    setCurrentBlog: (currentBlog) => set(() => ({ currentBlog })),
    openPreviewModal: (blog) => set(() => ({ isModalOpen: true, selectedPreviewBlog: blog })),
    closePreviewModal: () => set(() => ({ isModalOpen: false, selectedPreviewBlog: null })),
  }))
}
