import React, { memo, useCallback } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { BoardFieldTypes } from "../BoardTypes";
import { useTheme } from "@mui/material/styles";

interface ColumnFieldProps {
  isOpen: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const ColumnField: React.FC<ColumnFieldProps> = ({
  children,
  isOpen,
  onClick,
  sx,
  ...props
}) => {
  const { palette, custom } = useTheme();

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        cursor: "pointer",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid ${custom.field.borderColor}`,
        borderTopColor: custom.field.borderTopAndLeftColor,
        borderLeftColor: custom.field.borderTopAndLeftColor,
        backgroundColor: isOpen ? "white" : custom.field.bg,
        "&:hover": {
          backgroundColor: isOpen ? "white" : palette.gray,
        },
        ...sx,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Box>
  );
};

interface FieldProps {
  type: BoardFieldTypes;
  onClick: (index: number) => void;
  value: number | null;
  index: number;
}

const Field = ({ type, value, index, onClick }: FieldProps) => {
  const { custom } = useTheme();
  const handleClick = useCallback(() => onClick(index), [index, onClick]);

  switch (type) {
    case BoardFieldTypes.BOMB:
      return (
        <ColumnField isOpen={true} data-testid="field">
          <img
            src="./images/bomb.png"
            width="30px"
            height="30px"
            alt="Bomb in the field"
          />
        </ColumnField>
      );
    case BoardFieldTypes.EMPTY:
      return (
        <ColumnField
          isOpen={false}
          onClick={handleClick}
          data-testid="field"
        ></ColumnField>
      );
    case BoardFieldTypes.NUMBER:
      return (
        <ColumnField
          isOpen={true}
          sx={{
            color: custom.numberColors[value],
          }}
          data-testid="field"
        >
          {value === 0 ? "" : value}
        </ColumnField>
      );
  }
};

export default memo(Field, (prevProps, newProps) => {
  return prevProps.type === newProps.type && prevProps.value === newProps.value;
});
