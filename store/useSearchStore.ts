import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SearchHistoryItem {
    title: string
    href: string
    category: string
    timestamp: number
}
231 + 131 + 127
interface SearchStore {
    query: string
    selectedHref: string | null
    selectedTitle: string | null
    recentSearches: SearchHistoryItem[]
    setQuery: (query: string) => void
    setSelectedOption: (title: string, href: string) => void
    addRecentSearch: (title: string, href: string, category: string) => void
    clearQuery: () => void
    clearAllSearchHistory: () => void
}

export const useSearchStore = create<SearchStore>()(
    persist(
        (set) => ({
            query: '',
            selectedHref: null,
            selectedTitle: null,
            recentSearches: [],

            setQuery: (query) => set({ query }),

            setSelectedOption: (title, href) =>
                set({
                    selectedTitle: title,
                    selectedHref: href,
                }),

            addRecentSearch: (title, href, category) =>
                set((state) => {
                    const filtered = state.recentSearches.filter((item) => item.href !== href)
                    const newItem: SearchHistoryItem = {
                        title,
                        href,
                        category,
                        timestamp: Date.now(),
                    }
                    return {
                        recentSearches: [newItem, ...filtered].slice(0, 5),
                    }
                }),

            clearQuery: () => set({ query: '', selectedHref: null, selectedTitle: null }),

            clearAllSearchHistory: () => set({ recentSearches: [] }),
        }),
        {
            name: 'krisi_bondho_search_store',
        }
    )
)
