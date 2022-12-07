import { useState } from 'react';
import { Tab, Box } from '@mui/material';
import { 
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab';
import VideoPlayer from './VideoPlayer';

export default function PlayerCommentWrapper() {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return(
        <div className='content-card'>
            <TabContext value={value}>
                <TabList onChange={handleChange} centered>
                    <Tab label="Player" value="1" />
                    <Tab label="Comments" value="2" />
                </TabList>
                <TabPanel value="1"><VideoPlayer /></TabPanel>
                <TabPanel value="2">Comment Section</TabPanel>
            </TabContext>
        </div>
    )
}