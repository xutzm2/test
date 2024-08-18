import create from 'zustand';

export const useBlocksStore = create((set) => ({
  blocks: [],
  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, block],
    })),
}));