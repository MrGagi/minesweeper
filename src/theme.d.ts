declare module "@mui/material/styles" {
  export interface CustomThemeProperties extends Theme {
    custom?: {
      field?: {
        bg: string;
        borderColor: string;
        borderTopAndLeftColor: string;
      };
      numberColors: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
      };
    };
  }

  export function createTheme(
    options?: ThemeOptions,
    ...args: object[]
  ): ITheme;

  export function useTheme<T = ITheme>(): T;
}
