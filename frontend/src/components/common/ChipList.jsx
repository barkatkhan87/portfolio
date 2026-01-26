// src/components/common/ChipList.jsx
import { Chip, Stack } from '@mui/material';

const ChipList = ({ items = [], variant = 'filled', sx, ...stackProps }) => {
  if (!items.length) return null;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ flexWrap: 'wrap', ...sx }}
      {...stackProps}
    >
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          variant={variant === 'outlined' ? 'outlined' : 'filled'}
        />
      ))}
    </Stack>
  );
};

export default ChipList;