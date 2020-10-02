import React from 'react';

const Comments = ({ comments }) => {


    
    return (
        <>
              {comments.map(comment => (
             <div key={comment._id} className="box">
                <h5>{comment.bruger.fornavn} {comment.bruger.efternavn}</h5>
                <p className="date">{comment.oprettet}</p>
            <p className="text">{comment.kommentaren}</p>
            </div>
             ))}
        </>
    )
}

export default Comments;
