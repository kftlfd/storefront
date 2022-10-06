import React from "react";
import styled from "styled-components";

export class ProductAttributes extends React.Component {
  render() {
    const { attributes, selected, selectAttr, small, displayOnly } = this.props;
    // attributes = {id: Str, items: {id: Str, value: Str}}
    // selected = {attrId: valId}
    // selectAttr = function(attrId, valId) {...}
    // small = true | false | undefined

    return (
      <AttributesContainer small={small}>
        {attributes.map((attr) => (
          <div key={attr.id}>
            <AttributeHeading small={small}>{attr.name}:</AttributeHeading>
            <AttributeButtons small={small} type={attr.type}>
              {attr.items.map((item) => (
                <AttributeButton
                  key={item.id}
                  small={small}
                  displayOnly={displayOnly}
                  onClick={() => !displayOnly && selectAttr(attr.id, item.id)}
                  className={selected[attr.id] === item.id ? "selected" : ""}
                >
                  {attr.type === "swatch" ? (
                    <Swatch
                      small={small}
                      displayOnly={displayOnly}
                      color={item.value}
                    />
                  ) : (
                    <Attribute small={small} displayOnly={displayOnly}>
                      {item.value}
                    </Attribute>
                  )}
                </AttributeButton>
              ))}
            </AttributeButtons>
          </div>
        ))}
      </AttributesContainer>
    );
  }
}

const AttributesContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: (props) => (props.small ? "8px" : "24px"),
});

const AttributeHeading = styled.div({
  textTransform: (props) => (props.small ? "none" : "uppercase"),
  fontFamily: (props) => (props.small ? "Raleway" : "Roboto Condensed"),
  fontSize: (props) => (props.small ? "14px" : "18px"),
  fontWeight: (props) => (props.small ? 400 : 700),
  marginBottom: "8px",
});

const AttributeButtons = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  paddingLeft: (props) => (props.type === "swatch" ? "2px" : 0),
  paddingBottom: (props) => (props.type === "swatch" ? "2px" : 0),
});

const AttributeButton = styled.button({
  padding: 0,
  border: "none",
  borderRadius: "none",
  backgroundColor: "none",
  fontFamily: "Source Sans Pro",
  fontSize: (props) => (props.small ? "14px" : "16px"),
  fontWeight: 400,
  color: (props) => props.theme.color.text,
  cursor: (props) => (props.displayOnly ? "default" : "pointer"),
  transition: (props) => props.theme.transition.default,
});

const Swatch = styled.div({
  height: (props) => (props.small ? "16px" : "32px"),
  aspectRatio: "1/1",
  backgroundColor: (props) => props.color,
  border: (props) => (props.color === "#FFFFFF" ? "1px solid #000" : "none"),
  transition: "inherit",
  "&:hover": {
    boxShadow: (props) =>
      props.displayOnly
        ? "none"
        : `0 0 0 1px #fff, 0 0 0 2px ${props.theme.color.text}`,
  },
  ".selected &": {
    boxShadow: (props) =>
      `0 0 0 1px #fff, 0 0 0 2px ${props.theme.color.accent}`,
  },
});

const Attribute = styled.div({
  paddingInline: (props) => (props.small ? "0.2rem" : "0.4rem"),
  display: "grid",
  placeContent: "center",
  height: (props) => (props.small ? "24px" : "45px"),
  minWidth: (props) => (props.small ? "24px" : "63px"),
  border: (props) => `1px solid ${props.theme.color.text}`,
  backgroundColor: "#fff",
  transition: "inherit",
  "&:hover": {
    backgroundColor: (props) =>
      props.displayOnly ? props.theme.color.bg : props.theme.color.bgHover,
  },
  ".selected &": {
    color: "#fff",
    backgroundColor: (props) => props.theme.color.text,
  },
});
