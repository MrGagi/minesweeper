import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { theme } from "../../custom-theme";
import { BoardFieldTypes } from "../BoardTypes";
import Field from "./Field";

describe("Field component", () => {
  it("Should be able to render Field with bomb image", () => {
    render(
      <ThemeProvider theme={theme}>
        <Field
          type={BoardFieldTypes.BOMB}
          value={null}
          index={1}
          onClick={() => true}
        />
      </ThemeProvider>
    );

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("bomb");
  });

  it("Should be able to render Field number", () => {
    render(
      <ThemeProvider theme={theme}>
        <Field
          type={BoardFieldTypes.NUMBER}
          value={3}
          index={1}
          onClick={() => true}
        />
      </ThemeProvider>
    );

    const element = screen.getByTestId("field");
    expect(element.innerHTML).toContain("3");
  });

  it("Should be able to render empty Field", () => {
    render(
      <ThemeProvider theme={theme}>
        <Field
          type={BoardFieldTypes.EMPTY}
          value={0}
          index={1}
          onClick={() => true}
        />
      </ThemeProvider>
    );

    const element = screen.getByTestId("field");
    expect(element.innerHTML).not.toContain("0");
  });
});
