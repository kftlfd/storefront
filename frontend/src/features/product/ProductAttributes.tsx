import { Component } from 'react';
import styled, { css } from 'styled-components';

import { Attribute } from '@/api/types';

interface Props {
  attributes: Attribute[];
  selected: Record<string, string>;
  selectAttr?: (attrId: string, itemId: string) => void;
  small?: boolean;
  displayOnly?: boolean;
}

class ProductAttributes extends Component<Props> {
  render() {
    const { attributes, selected, selectAttr, small, displayOnly } = this.props;
    // attributes = {id: Str, items: {id: Str, value: Str}}
    // selected = {attrId: valId}
    // selectAttr = function(attrId, valId) {...}
    // small = true | false | undefined
    const mini = small;

    return (
      <AttributesList $mini={mini}>
        {attributes.map((attr) => (
          <div key={attr.id}>
            <AttributeHeading $mini={mini}>{attr.name}:</AttributeHeading>
            <AttributeButtons>
              {attr.items.map((item) => {
                const swatch = attr.type === 'swatch';
                const El = swatch ? SwatchAttribute : RegularAttribute;
                return (
                  <El
                    key={item.id}
                    onClick={() => !displayOnly && selectAttr?.(attr.id, item.id)}
                    className={selected[attr.id] === item.id ? 'selected' : ''}
                    $mini={mini}
                    $displayOnly={displayOnly}
                    {...(El === SwatchAttribute ? { $color: item.value } : {})}
                  >
                    {!swatch && item.value}
                  </El>
                );
              })}
            </AttributeButtons>
          </div>
        ))}
      </AttributesList>
    );
  }
}

export default ProductAttributes;

const AttributesList = styled.div<{ $mini?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $mini }) => ($mini ? '0.5rem' : '1rem')};
`;

const AttributeHeading = styled.div<{ $mini?: boolean }>(
  ({ $mini }) => css`
    text-transform: ${$mini ? 'none' : 'none'};
    font-size: ${$mini ? '0.9rem' : '1rem'};
    font-weight: ${$mini ? 400 : 500};
    margin-bottom: 4px;
  `,
);

const AttributeButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const AttributeButton = styled.button<{ $mini?: boolean; $displayOnly?: boolean }>(
  ({ theme, $mini, $displayOnly }) => css`
    padding: 0;
    border-radius: ${theme.size.borderRadius};
    border: 1px solid ${theme.color.text};
    cursor: ${$displayOnly ? 'auto' : 'pointer'};
    transition: ${theme.transition.default};
    font-family: inherit;
    font-weight: 400;
    font-size: ${$mini ? '0.8rem' : '1rem'};
  `,
);

const SwatchAttribute = styled(AttributeButton)<{ $color: string }>(
  ({ theme, $mini, $displayOnly, $color }) => css`
    margin: 2px;
    aspect-ratio: 1/1;
    height: ${$mini ? '16px' : '32px'};
    background-color: ${$color};

    &:hover {
      box-shadow: ${$displayOnly ? 'none' : `0 0 0 2px ${theme.color.text}`};
    }

    &.selected {
      border-color: 1px solid ${theme.color.accent};
      box-shadow: 0 0 0 2px ${theme.color.accent};
    }
  `,
);

const RegularAttribute = styled(AttributeButton)(
  ({ theme, $mini, $displayOnly }) => css`
    display: grid;
    place-content: center;
    height: ${$mini ? '1.5rem' : '2rem'};
    min-width: ${$mini ? '1.5rem' : '2rem'};
    padding-inline: ${$mini ? '0.2rem' : '0.4rem'};
    color: ${theme.color.text};
    background-color: ${theme.color.bg};

    &:hover {
      background-color: ${$displayOnly ? theme.color.bg : theme.color.bgHover};
    }

    &.selected {
      color: ${theme.color.bg};
      background-color: ${theme.color.text};
    }
  `,
);
