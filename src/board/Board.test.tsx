import { ThemeProvider } from "@mui/material";
import { render, RenderResult, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../common/store";
import { theme } from "../custom-theme";
import Board from "./Board";
import { finishGame, setBoard } from "./BoardSlice";
import { BoardFieldTypes, GameStatus } from "./BoardTypes";

describe("Board component", () => {
  let renderedElement: RenderResult;

  beforeEach(() => {
    renderedElement = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Board />
        </Provider>
      </ThemeProvider>
    );
  });

  it("Should be able to render Board component", () => {
    expect(renderedElement.baseElement).toBeTruthy();
  });

  it("Should render message that player won the game when game status is won", () => {
    store.dispatch(finishGame(GameStatus.WON));
    expect(screen.getByTestId("won-game-text")).toBeInTheDocument();
  });

  it("Should render message that player lost the game when status is lost", () => {
    store.dispatch(finishGame(GameStatus.LOST));
    expect(screen.getByTestId("lost-game-text")).toBeInTheDocument();
  });

  it("Should create board when board is present", () => {
    store.dispatch(
      setBoard([
        [
          {
            type: BoardFieldTypes.EMPTY,
            value: null,
          },
          {
            type: BoardFieldTypes.EMPTY,
            value: null,
          },
          {
            type: BoardFieldTypes.EMPTY,
            value: null,
          },
        ],
        [
          {
            type: BoardFieldTypes.EMPTY,
            value: null,
          },
          {
            type: BoardFieldTypes.EMPTY,
            value: null,
          },
          {
            type: BoardFieldTypes.EMPTY,
            value: null,
          },
        ],
      ])
    );

    expect(screen.getAllByTestId("field-row")).toHaveLength(2);
    expect(screen.getAllByTestId("field")).toHaveLength(6);
  });
});
