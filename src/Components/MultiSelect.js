import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function MultiSelect(id,etiqueta,datos) {
  return (
    <Autocomplete
      disablePortal
      id={id}
      options={datos}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={etiqueta} />}
    />
  );
}
