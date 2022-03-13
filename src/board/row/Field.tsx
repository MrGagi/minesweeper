import React, { memo, useCallback } from "react";
import { Box, useTheme } from "@mui/material";
import { BoardFieldTypes } from "../BoardTypes";

const ColumnField: React.FC<{ isOpen: boolean; onClick?: () => void }> = ({
  children,
  isOpen,
  onClick,
}) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        border: "1px solid gray",
        cursor: "pointer",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isOpen ? palette.background.default : "white",
        "&:hover": {
          backgroundColor: isOpen ? "white" : palette.primary.main,
        },
      }}
      onClick={onClick}
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
  const handleClick = useCallback(() => onClick(index), [index, onClick]);

  switch (type) {
    case BoardFieldTypes.BOMB:
      return (
        <ColumnField isOpen={true}>
          <img src="./images/bomb.png" width="30px" height="30px" />
        </ColumnField>
      );
    case BoardFieldTypes.EMPTY:
      return <ColumnField isOpen={false} onClick={handleClick}></ColumnField>;
    case BoardFieldTypes.NUMBER:
      return <ColumnField isOpen={true}>{value}</ColumnField>;
  }
};

export default memo(Field, (prevProps, newProps) => {
  return prevProps.type === newProps.type && prevProps.value === newProps.value;
});
