import {
  Theme as MUITheme,
  ThemeOptions as MUIThemeOptions,
} from "@mui/material/styles";

interface CustomTheme {
  custom: {
    field: {
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

declare module "@mui/material/styles" {
  interface Theme extends MUITheme, CustomTheme {}

  interface ThemeOptions extends MUIThemeOptions {
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
    options?: IThemeOptions,
    ...args: object[]
  ): ITheme;

  export function useTheme<T = ITheme>(): T;
}

declare module "@mui/system" {
  interface Theme extends MUITheme, CustomTheme {}

  export type CreateMUIStyled<T extends object = Theme> =
    CreateMUIStyledStyledEngine<MUIStyledCommonProps<T>, MuiStyledOptions, T>;

  declare const styled: CreateMUIStyled;
}
