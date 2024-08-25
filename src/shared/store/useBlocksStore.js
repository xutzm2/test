// src/shared/store/useBlocksStore.js
import create from 'zustand';

export const useBlocksStore = create((set) => ({
  blocks: [],

  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, block],
    })),

  updateBlockContent: (index, newContent) =>
    set((state) => {
      const updatedBlocks = [...state.blocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        content: newContent,
      };
      return { blocks: updatedBlocks };
    }),

  // Новая функция для удаления блока
  removeBlock: (index) =>
    set((state) => {
      const updatedBlocks = state.blocks.filter((_, i) => i !== index);
      return { blocks: updatedBlocks };
    }),
}));
