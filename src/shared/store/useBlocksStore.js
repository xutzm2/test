// src/shared/store/useBlocksStore.js
import create from 'zustand';

export const useBlocksStore = create((set, get) => ({
  blocks: [],

  // Функция для добавления блока
  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, block],
    })),

  // Функция для обновления содержимого блоков
  updateBlockContent: (index, newContent) =>
    set((state) => {
      const updatedBlocks = [...state.blocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        content: newContent,
      };
      return { blocks: updatedBlocks };
    }),

  // Функция для клонирования блока
  cloneBlock: (index) =>
    set((state) => {
      const blockToClone = state.blocks[index];

      // Клонирование содержимого структуры, если блок типа 'flex'
      const cloneBlockRecursively = (block) => {
        if (block.type === 'flex') {
          return {
            ...block,
            columns: block.columns.map((column) =>
              column.map((nestedBlock) => cloneBlockRecursively(nestedBlock))
            ),
          };
        }
        return { ...block };
      };

      const clonedBlock = cloneBlockRecursively(blockToClone);
      return { blocks: [...state.blocks, clonedBlock] };
    }),

  // Функция для удаления блока
  removeBlock: (index) =>
    set((state) => ({
      blocks: state.blocks.filter((_, i) => i !== index),
    })),
}));
