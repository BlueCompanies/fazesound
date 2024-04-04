import { create } from "zustand";

export const usePlayListHandler = create((set) => ({
  playListPanel: false,
  setPlayListPanel: () =>
    set((state) => ({ playListPanel: !state.playListPanel })),
}));

export const usePlaySong = create((set) => ({
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
}));

export const usePagination = create((set) => ({
  currentPage: 1,
  setCurrentPage: (value) => set({ currentPage: value }),
}));

export const useAudioData = create((set) => ({
  audioWave: "",
  setCurrentAudioWave: (value) => set({ audioWave: value }),
}));

export const useCurrentSong = create((set) => ({
  currentSong: {}, // Changed 'song' to 'currentSong'
  setCurrentSong: (value) => set({ currentSong: value }), // Set 'currentSong' to the provided value
}));
