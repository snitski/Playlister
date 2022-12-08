import {
    Tab,
    Tabs
} from '@mui/material';
import { useState } from 'react'
import VideoPlayer from './VideoPlayer';
import CommentSection from './CommentSection';

export default function PlayerCommentWrapper() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='content-card'>
        <Tabs value={value} onChange={handleChange} centered sx={{position:'relative', zIndex:'900', backgroundColor:'white', borderRadius:'5px'}}>
            <Tab label="Player" />
            <Tab label="Comments" />
        </Tabs>
            { !value ? 
                <div id='player-section-wrapper' className='center-children'><VideoPlayer value={value} index={0} /></div>
                :
                <CommentSection value={value} index={1}/>
            }
    </div>
  );
}