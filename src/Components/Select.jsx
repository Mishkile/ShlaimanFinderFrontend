import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({text, getData, options}) {
    const [data, setData] = React.useState('')

    const handleChange = (event) => {
        setData(event.target.value);
        getData(event.target.value)
    };

    return (
        <Box sx={{ maxWidth: "50%", backgroundColor: "rgb(255,255,255,0.8)" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{text}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data}
                    label="Age"
                    onChange={handleChange}
                >
                    {options.map((option, index) => {
                        return <MenuItem key={index} value={option}>{option}</MenuItem>
                    })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}
