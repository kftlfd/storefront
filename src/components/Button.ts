import styled from 'styled-components';

export const Button = styled.button<{
  big?: boolean;
  biggerFont?: boolean;
}>(({ theme, big, biggerFont }) => ({
  flex: '1 1 0',
  width: big ? '280px' : 'auto',
  height: big ? '45px' : 'auto',
  display: 'grid',
  placeContent: 'center',
  padding: '13px',
  border: `1px solid ${theme.color.text}`,
  borderRadius: theme.size.borderRadius,
  fontFamily: 'inherit',
  fontSize: biggerFont ? '16px' : '14px',
  fontWeight: 600,
  textTransform: 'uppercase',
  cursor: 'pointer',
  color: theme.color.text,
  transition: theme.transition.default,
  backgroundColor: theme.color.bg,
  '&:hover': {
    backgroundColor: theme.color.bgHover,
  },
}));

export const AccentButton = styled(Button)(({ theme }) => ({
  border: 'none',
  color: theme.color.bg,
  backgroundColor: theme.color.accent,
  '&:hover': {
    backgroundColor: theme.color.accentHover,
  },
}));
