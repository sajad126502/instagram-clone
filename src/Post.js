import React from 'react'
import "./post.css"
import { Avatar } from '@mui/material';
function Post({username,caption,imageUrl}) {
    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar className="post__avatar"
                    alt={username}
                    src="/static/images/avafgtar/1.jpg">

                </Avatar>
                <h3>{username}</h3>
            </div>

            {/* header -> avatar + username */}
            <img className="post__image" src={imageUrl}></img>

            {/* image */}



            {/* username + caption */}
            <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default Post