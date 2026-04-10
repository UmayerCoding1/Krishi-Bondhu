import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DiseaseResult = {
    disease: string;
    Accuracy: number;
    solution: {
        chemical: string;
        organic: string;
    };
};

type DiseaseStore = {
    diseaseResult: DiseaseResult | null;
    imagePreview: string | null;
    showDiseaseResult: boolean;
    lastUpdated: number | null;

    setDiseaseData: (data: DiseaseResult, preview: string) => void;
    clearDiseaseData: () => void;
};

export const useDiseaseStore = create<DiseaseStore>()(
    persist(
        (set) => ({
            diseaseResult: null,
            imagePreview: null,
            showDiseaseResult: false,
            lastUpdated: null,

            setDiseaseData: (data, preview) =>
                set({
                    diseaseResult: data,
                    imagePreview: preview,
                    showDiseaseResult: true,
                    lastUpdated: Date.now(),
                }),

            clearDiseaseData: () =>
                set({
                    diseaseResult: null,
                    imagePreview: null,
                    showDiseaseResult: false,
                    lastUpdated: null,
                }),
        }),
        {
            name: 'disease-storage', // localStorage key
        }
    )
);
