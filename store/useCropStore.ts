import { create } from 'zustand';
import { persist } from 'zustand/middleware';


type CropStore = {
    storeBestCrop: any;
    storeCropAdvice: any[];
    storeLoading: boolean;

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

            setStoreLoading: (value) => set({ storeLoading: value }),

            setStoreCropData: (data) =>
                set({
                    storeBestCrop: data.bestCrop,
                    storeCropAdvice: data.cropsWithImages,
                }),

            clearStoreCropData: () =>
                set({
                    storeBestCrop: null,
                    storeCropAdvice: [],
                }),
        }),
        {
            name: 'crop-storage', // 👉 localStorage key
        }
    )
);