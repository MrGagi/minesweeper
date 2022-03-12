import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface LevelPickerOption {
  name: string;
  value: number;
}

interface LevelPickerProps {
  options: LevelPickerOption[];
  value: number;
  onChange: (option: number) => void;
}

const LevelPicker = ({ value, options, onChange }: LevelPickerProps) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    onChange(Number(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select<number>
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LevelPicker;
