// import { useState } from 'react';
// import { Tab } from '@mui/material';
// import { 
//     TabContext,
//     TabList,
//     TabPanel
// } from '@mui/lab';
import VideoPlayer from './VideoPlayer';
import CommentSection from './CommentSection';

// export default function PlayerCommentWrapper() {
//     const [value, setValue] = useState('1');
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     }
//     return(
//         <div className='content-card'>
//             <TabContext value={value} >
//                 <TabList onChange={handleChange} centered>
//                     <Tab label="Player" value="1" />
//                     <Tab label="Comments" value="2" />
//                 </TabList>
//                 <TabPanel value="1" className='center-children'><VideoPlayer /></TabPanel>
//                 <TabPanel value="2" ><CommentSection /></TabPanel>
//             </TabContext>
//         </div>
//     )
// }

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

export default function PlayerCommentWrapper() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='content-card'>
        <Tabs value={value} onChange={handleChange} centered sx={{position:'relative', zIndex:'900'}}>
            <Tab label="Player" />
            <Tab label="Comments" />
        </Tabs>
            { !value ? 
                <div id='player-section-wrapper' className='center-children'><VideoPlayer value={value} index={0} /></div>
                :
                <CommentSection value={value} index={1}/>
            }
        {/* <TabPanel value={value} index={0}>
            Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel> */}
    </div>
  );
}