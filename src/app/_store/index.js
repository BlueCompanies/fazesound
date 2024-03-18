import { create } from "zustand";

export const usePlayListHandler = create((set) => ({
  playListPanel: false,
  setPlayListPanel: () =>
    set((state) => ({ playListPanel: !state.playListPanel })),
}));

export const usePlaySong = create((set) => ({
  isPlaying: false,
  songData: {}, // Initialize audioData as an empty object
  setSongData: (data) => set({ songData: data }), // Update audioData with the provided data
  setIsPlaying: (value) => set({ isPlaying: value }),
}));
