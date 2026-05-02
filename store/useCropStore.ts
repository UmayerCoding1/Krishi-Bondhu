import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const TEN_MINUTES_MS = 10 * 60 * 1000; // 10 মিনিট

type CropStore = {
    storeBestCrop: any;
    storeCropAdvice: any[];
    storeLoading: boolean;
    storedAt: number | null; // ⏱ timestamp when data was stored

    setStoreLoading: (value: boolean) => void;
    setStoreCropData: (data: { bestCrop: any; cropsWithImages: any[] }) => void;
    clearStoreCropData: () => void;
};

export const useCropStore = create<CropStore>()(
    persist(
        (set) => ({
            storeBestCrop: null,
            storeCropAdvice: [],
            storeLoading: false,
            storedAt: null,

            setStoreLoading: (value) => set({ storeLoading: value }),

            setStoreCropData: (data) =>
                set({
                    storeBestCrop: data.bestCrop,
                    storeCropAdvice: data.cropsWithImages,
                    storedAt: Date.now(), // ⏱ save current time
                }),

            clearStoreCropData: () =>
                set({
                    storeBestCrop: null,
                    storeCropAdvice: [],
                    storedAt: null,
                }),
        }),
        {
            name: 'crop-storage', // 👉 localStorage key
            onRehydrateStorage: () => (state) => {
                // 👉 10 মিনিট পর ডেটা মুছে ফেলুন
                if (state?.storedAt && Date.now() - state.storedAt > TEN_MINUTES_MS) {
                    state.clearStoreCropData();
                }
            },
        }
    )
);