export type ThemeVariant = 'light' | 'dark';

export type Theme = {
  color: {
    text: string;
    bg: string;
    bgButton: string;
    bgHover: string;
    accent: string;
    accentHover: string;
    backdrop: string;
  };
  transition: {
    default: string;
  };
  size: {
    pageInlinePadding: string;
    headerHeight: string;
    headerBtnSpacing: string;
    borderRadius: string;
  };
  shadow: {
    lighter: string;
    normal: string;
    darker: string;
  };
  img: {
    filter: string;
  };
};

export const getTheme = (variant: ThemeVariant): Theme => {
  const light = variant === 'light';

  return {
    color: {
      text: light ? '#333333' : '#CCCCCC',
      bg: light ? '#FFFFFF' : '#1D1F22',
      bgButton: light ? '#F5F5F5' : '#2F3237',
      bgHover: light ? '#EEEEEE' : '#42464D',
      accent: '#8199EE',
      accentHover: light ? '#5D7CE9' : '#A5B6F3',
      backdrop: light ? 'hsla(247, 13%, 25%, 0.22)' : 'hsla(0, 0%, 0%, 0.4)',
    },
    transition: {
      default: 'all 0.2s ease',
    },
    size: {
      pageInlinePadding: 'max((100vw - 1100px) / 2, 1rem)',
      headerHeight: '60px',
      headerBtnSpacing: '6px',
      borderRadius: '4px',
    },
    shadow: {
      lighter: light ? '0 0 20px 5px hsla(0, 0%, 50%, 0.1)' : '0 0 20px 10px hsla(0, 0%, 60%, 0.1)',
      normal: light ? '0 0 20px 5px hsla(0, 0%, 50%, 0.2)' : '0 0 20px 10px hsla(0, 0%, 90%, 0.15)',
      darker: light ? '0 0 20px 5px hsla(0, 0%, 50%, 0.3)' : '0 0 35px 5px hsla(0, 0%, 60%, 0.2)',
    },
    img: {
      filter: light ? 'invert(20%)' : 'invert(80%)',
    },
  };
};
