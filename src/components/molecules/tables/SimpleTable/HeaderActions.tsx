import React, { FC, ChangeEvent } from 'react';
import { FiSearch as SearchIcon, FiPlus as AddIcon } from 'react-icons/fi';
import {
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import Box from 'src/components/utilities/Box';

export interface SortOption {
  value: string;
  label: string;
}

interface HeaderActionsProps {
  className?: string;
  searcheable?: {
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  sortable?: {
    options: SortOption[];
  };
  addResource?: {
    label: string;
    onClick: () => void;
  };
}

const HeaderActions: FC<HeaderActionsProps> = ({ className, searcheable, addResource, sortable, ...rest }) => {
  return (
    <Box className={className} {...rest}>
      {searcheable && (
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          onChange={searcheable.onChange}
          placeholder={searcheable.placeholder}
          value={searcheable.value}
          variant="outlined"
          size="small"
        />
      )}

      {sortable && (
        <FormControl variant="outlined" size="small">
          <InputLabel>Ordernar por</InputLabel>
          <Select label="Ordernar por" value="label|asc" name="sort">
            {sortable.options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {addResource && (
        <Button startIcon={<AddIcon />} onClick={addResource.onClick} variant="contained" color="primary">
          {addResource.label}
        </Button>
      )}
    </Box>
  );
};

export default HeaderActions;
