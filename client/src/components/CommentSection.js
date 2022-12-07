import { useContext, useState } from 'react'
import { 
    Typography,
    OutlinedInput
} from '@mui/material'
import GlobalStoreContext from "../store";
import AuthContext from '../auth';

export default function CommentSection() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ commentText, setCommentText ] = useState('');

    const handleKeyUp = (event) => {
        if(event.key === 'Enter') {
            let updatedList = store.openedPlaylist;
            updatedList.comments.push({
                username: auth.user.username,
                text: commentText
            });
            // console.log(updatedList);
            // store.updateList(updatedList);
            store.commentOnList(store.openedPlaylist, {
                username: auth.user.username,
                text: commentText
            })

            setCommentText('');
        }
    }

    if(!store.openedPlaylist) return '';
    return (
        <div id='comment-area-wrapper'>
            <div id='comment-card-wrapper'>
                {store.openedPlaylist.comments.map((comment) => (
                        <div className='comment-card'>
                            <Typography sx={{fontWeight:'bold'}} className='username-link' onClick={() => {store.goToUser(comment.username)}}>{comment.username}</Typography>
                            <Typography variant='h6'>{comment.text}</Typography>
                        </div>
                    ))
                }
            </div>
            <OutlinedInput 
                placeholder={auth.loggedIn ? 'Leave a comment' : 'Log in to comment'}
                variant='filled'
                sx={{gridRow:'3/4', margin: '15px'}}
                disabled={!store.openedPlaylist.published || !auth.loggedIn}
                value={commentText}
                onChange={(e) => {setCommentText(e.target.value)}}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}