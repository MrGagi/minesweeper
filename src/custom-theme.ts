import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    gray: "#868282",
  },
  custom: {
    field: {
      bg: "#C0C0C0",
      borderColor: "#8f8f8f",
      borderTopAndLeftColor: "#FFFFFF",
    },
    numberColors: {
      1: "#215c94",
      2: "#4b9421",
      3: "#215c94",
      4: "#902194",
      5: "#947021",
      6: "#218c94",
      7: "#000000",
      8: "#656666",
    },
  },
});
