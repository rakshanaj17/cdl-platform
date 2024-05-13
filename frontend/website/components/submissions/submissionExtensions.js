import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Grid, Button } from '@mui/material';
import Connections from './connections';
import SubmissionGraph from './submissionGraph';
import AddConnectionsButton from './addConnectionButton';

export default function SubmissionExtensions({ data, id, target }) {
    const [selectedOption, setSelectedOption] = useState('connections');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>

            <Grid container justifyContent={'space-between'}>

                <Grid item width={"80%"}>
                    <AddConnectionsButton setSelectedOption={setSelectedOption} />  
                </Grid>

            </Grid>

            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                <Connections submissionDataResponse={data} id={id} />
            </div>
        </div>

    );
}
