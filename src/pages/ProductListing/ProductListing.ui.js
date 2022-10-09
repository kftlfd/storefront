import styled from "styled-components";

const CategoryTitle = styled.h1({
  marginBlock: "2rem",
  fontSize: "42px",
  fontWeight: 400,
  lineHeight: "67px",
});

const ListingsGrid = styled.div({
  paddingBottom: "4rem",
  display: "grid",
  justifyContent: "center",
  alignItems: "start",
  columnGap: "40px",
  rowGap: "60px",

  "@media (min-width: 600px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@media (min-width: 900px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
});

export { CategoryTitle, ListingsGrid };
