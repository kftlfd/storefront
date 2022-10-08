import React from "react";
import styled from "styled-components";

export class ProductAttributes extends React.Component {
  render() {
    const { attributes, selected, selectAttr, small, displayOnly } = this.props;
    // attributes = {id: Str, items: {id: Str, value: Str}}
    // selected = {attrId: valId}
    // selectAttr = function(attrId, valId) {...}
    // small = true | false | undefined
    const mini = small;

    return (
      <AttributesList mini={mini}>
        {attributes.map((attr) => (
          <div key={attr.id}>
            <AttributeHeading mini={mini}>{attr.name}:</AttributeHeading>
            <AttributeButtons>
              {attr.items.map((item) => {
                const swatch = attr.type === "swatch";
                const El = swatch ? SwatchAttribute : RegularAttribute;
                return (
                  <El
                    key={item.id}
                    onClick={() => !displayOnly && selectAttr(attr.id, item.id)}
                    className={selected[attr.id] === item.id ? "selected" : ""}
                    mini={mini}
                    displayOnly={displayOnly}
                    color={item.value}
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

const AttributesList = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: (props) => (props.mini ? "12px" : "24px"),
});

const AttributeHeading = styled.div({
  textTransform: (props) => (props.mini ? "none" : "uppercase"),
  fontFamily: (props) => (props.mini ? "Raleway" : "Roboto Condensed"),
  fontSize: (props) => (props.mini ? "14px" : "18px"),
  fontWeight: (props) => (props.mini ? 400 : 700),
  marginBottom: "8px",
});

const AttributeButtons = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

const AttributeButton = styled.button({
  padding: 0,
  borderRadius: "3px",
  border: (props) => `1px solid ${props.theme.color.text}`,
  cursor: (props) => (props.displayOnly ? "default" : "pointer"),
  transition: (props) => props.theme.transition.default,
  fontFamily: "Source Sans Pro",
  fontWeight: 400,
  fontSize: (props) => (props.mini ? "14px" : "16px"),
});

const SwatchAttribute = styled(AttributeButton)({
  margin: "2px",
  aspectRatio: "1/1",
  height: (props) => (props.mini ? "16px" : "32px"),
  backgroundColor: (props) => props.color,

  "&:hover": {
    boxShadow: (props) =>
      props.displayOnly ? "none" : `0 0 0 2px ${props.theme.color.text}`,
  },

  "&.selected": {
    borderColor: (props) => `1px solid ${props.theme.color.accent}`,
    boxShadow: (props) => `0 0 0 2px ${props.theme.color.accent}`,
  },
});

const RegularAttribute = styled(AttributeButton)({
  display: "grid",
  placeContent: "center",
  height: (props) => (props.mini ? "24px" : "40px"),
  minWidth: (props) => (props.mini ? "24px" : "40px"),
  paddingInline: (props) => (props.mini ? "0.2rem" : "0.4rem"),
  color: (props) => props.theme.color.text,
  backgroundColor: (props) => props.theme.color.bg,

  "&:hover": {
    backgroundColor: (props) =>
      props.displayOnly ? props.theme.color.bg : props.theme.color.bgHover,
  },

  "&.selected": {
    color: (props) => props.theme.color.bg,
    backgroundColor: (props) => props.theme.color.text,
  },
});
