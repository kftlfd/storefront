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
};

type ThemeDef = {
  colors: {
    text: string;
    bg: string;
    bgButton: string;
    bgHover: string;
    accentHover: string;
    backdrop: string;
  };
  shadow: {
    lighter: string;
    normal: string;
    darker: string;
  };
};

const lightTheme: ThemeDef = {
  colors: {
    text: '#333333',
    bg: '#FFFFFF',
    bgButton: '#F5F5F5',
    bgHover: '#EEEEEE',
    accentHover: '#5D7CE9',
    backdrop: 'hsla(247, 13%, 25%, 0.22)',
  },
  shadow: {
    lighter: '0 0 20px 5px hsla(0, 0%, 50%, 0.1)',
    normal: '0 0 20px 5px hsla(0, 0%, 50%, 0.2)',
    darker: '0 0 20px 5px hsla(0, 0%, 50%, 0.3)',
  },
};

const darkTheme: ThemeDef = {
  colors: {
    text: '#CCCCCC',
    bg: '#1D1F22',
    bgButton: '#2F3237',
    bgHover: '#42464D',
    accentHover: '#A5B6F3',
    backdrop: 'hsla(0, 0%, 0%, 0.4)',
  },
  shadow: {
    lighter: '0 0 20px 10px hsla(0, 0%, 60%, 0.1)',
    normal: '0 0 20px 10px hsla(0, 0%, 90%, 0.15)',
    darker: '0 0 35px 5px hsla(0, 0%, 60%, 0.2)',
  },
};

export const getTheme = (variant: ThemeVariant): Theme => {
  const themeDef = variant === 'light' ? lightTheme : darkTheme;

  return {
    color: {
      text: themeDef.colors.text,
      bg: themeDef.colors.bg,
      bgButton: themeDef.colors.bgButton,
      bgHover: themeDef.colors.bgHover,
      accent: '#8199EE',
      accentHover: themeDef.colors.accentHover,
      backdrop: themeDef.colors.backdrop,
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
      lighter: themeDef.shadow.lighter,
      normal: themeDef.shadow.normal,
      darker: themeDef.shadow.darker,
    },
  };
};
