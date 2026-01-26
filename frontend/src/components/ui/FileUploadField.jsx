import { Box, Button, Typography } from '@mui/material';

const FileUploadField = ({
  label,
  accept,
  multiple,
  onFilesSelected,
  helperText,
  ...buttonProps
}) => {
  const handleChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : null;
    onFilesSelected(files);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        {...buttonProps}
      >
        {label}
        <input
          hidden
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
      </Button>
      {helperText && (
        <Typography variant="caption" color="text.secondary">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploadField;