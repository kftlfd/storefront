import { Attribute } from '@/api/types';

export const getDefaultAttributes = (attributes: Attribute[]) => {
  const selectedAttrs = attributes.reduce<Record<string, string>>((selected, attr) => {
    const firstItem = attr.items[0];
    if (firstItem) {
      selected[attr.id] = firstItem.id;
    }
    return selected;
  }, {});

  return selectedAttrs;
};
