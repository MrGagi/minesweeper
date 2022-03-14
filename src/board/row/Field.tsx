import React, { memo, useCallback } from "react";
import { Box } from "@mui/material";
import { BoardFieldTypes } from "../BoardTypes";
import { useTheme } from "@mui/material/styles";
import FlagIcon from "@mui/icons-material/Flag";
import { styled } from "@mui/system";

const StyledColumnField = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen, theme }) => ({
  width: 40,
  height: 40,
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: `1px solid ${theme.custom.field.borderColor}`,
  borderTopColor: theme.custom.field.borderTopAndLeftColor,
  borderLeftColor: theme.custom.field.borderTopAndLeftColor,
  backgroundColor: isOpen ? "white" : theme.custom.field.bg,
  "&:hover": {
    backgroundColor: isOpen ? "white" : theme.palette.gray,
  },
}));

interface FieldProps {
  type: BoardFieldTypes;
  onClick: (index: number) => void;
  onRightClick: (index: number) => void;
  value: number | null;
  index: number;
}

const Field = ({ type, value, index, onClick, onRightClick }: FieldProps) => {
  const { custom } = useTheme();
  const handleClick = useCallback(() => onClick(index), [index, onClick]);

  switch (type) {
    case BoardFieldTypes.BOMB:
      return (
        <StyledColumnField isOpen={true} data-testid="field">
          <img
            src="./images/bomb.png"
            width="30px"
            height="30px"
            alt="Bomb in the field"
          />
        </StyledColumnField>
      );
    case BoardFieldTypes.FLAG:
      return (
        <StyledColumnField isOpen={true} data-testid="field">
          <FlagIcon data-testid="flag" />
        </StyledColumnField>
      );
    case BoardFieldTypes.EMPTY:
      return (
        <StyledColumnField
          isOpen={false}
          onClick={handleClick}
          onContextMenu={(event) => {
            if (onRightClick) {
              event.preventDefault();
              onRightClick(index);
            }
          }}
          data-testid="field"
        ></StyledColumnField>
      );
    case BoardFieldTypes.NUMBER:
      return (
        <StyledColumnField
          isOpen={true}
          sx={{
            color: custom.numberColors[value],
          }}
          data-testid="field"
        >
          {value === 0 ? "" : value}
        </StyledColumnField>
      );
  }
};

export default memo(Field, (prevProps, newProps) => {
  return prevProps.type === newProps.type && prevProps.value === newProps.value;
});
