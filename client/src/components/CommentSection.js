import { useContext, useState } from 'react'
import { 
    Typography,
    OutlinedInput
} from '@mui/material'
import GlobalStoreContext from "../store";
export default function CommentSection() {
    const { store } = useContext(GlobalStoreContext)
    const [ commentText, setCommentText ] = useState('');

    const handleKeyUp = (event) => {
        if(event.key === 'Enter') {
            console.log(commentText);
        }
    }

    if(!store.openedPlaylist) return '';
    return (
        <div id='comment-area-wrapper'>
            <div id='comment-card-wrapper'>
                {store.openedPlaylist.comments.map((comment) => (
                        <div className='comment-card'>
                            <Typography sx={{fontWeight:'bold'}}>{comment.username}</Typography>
                            <Typography variant='h6'>{comment.text}</Typography>
                        </div>
                    ))
                }
            </div>
            <OutlinedInput 
                placeholder='Leave a Comment'
                variant='filled'
                sx={{gridRow:'3/4', margin: '15px'}}
                disabled={!store.openedPlaylist.published}
                value={commentText}
                onChange={(e) => {setCommentText(e.target.value)}}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}