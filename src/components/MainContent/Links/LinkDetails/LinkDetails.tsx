import React, { useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, queryCache, useQuery } from 'react-query';
import './LinkDetails.css'
import LinkComponent from '../LinkComponent/LinkComponent'
import { AppContext } from '../../../../context/AppContext';
import { AddCommentInterface, LinkCommentInterface } from '../interfaces'
import { getLink, addComment } from '../queries';

const LinkDetails: React.FC = () => {
    const { projectId, linkId } = useParams();
    const ctx = useContext(AppContext);
    const commentInput = useRef<HTMLTextAreaElement>(null)
    const { status, data, error } = useQuery(['getLink', projectId, linkId], getLink);

    if (!ctx) {
        throw new Error('You probably forgot to put <AppProvider>.');
    }

    const [mutate] = useMutation(addComment, {
        onMutate: (newData: AddCommentInterface) => {
            queryCache.cancelQueries(['getLink', projectId]);
            queryCache.setQueryData(['getLink', projectId, linkId], (prev: any) => {
                prev.comments.push({
                    id: new Date().getTime(),
                    text: newData.comment,
                    author: newData.userId,
                    user: newData.userId,
                });
                return prev;
            });
        },
        onError: (error) => console.log(error),
        onSettled: () => queryCache.invalidateQueries(['getLink', projectId])
    })
    return (
        <div className="linkDetailsComponentContainer">
            {data && <LinkComponent data={data} />}
            <h3>Comments</h3>
            <div className="commentInputLinkWrap">
                <div className="profileImage">DS</div>
                <div className="linkDetailsTextAreaWrap">
                    <textarea ref={commentInput} className="linkDetailsTextArea" placeholder="Add your comments here"></textarea>
                    <button onClick={() => {
                        mutate({
                            comment: commentInput.current!.value,
                            linkId,
                            projectId,
                            userId: ctx.userDetails.id
                        })
                    }}>
                        save
                    </button>
                </div>
            </div>
            <div>
                {data && data.comments.map((comment: LinkCommentInterface, key: number) => {
                    return <div className="commentLinkWrap" key={key}>
                        <div className="profileImage">DS</div>
                        <div className="commentDetailsLink">
                            <p className="authorCommentLink">{comment.author}</p>
                            <p className="textCommentLink">{comment.text}</p>
                        </div>
                    </div>

                })}
            </div>
        </div>
    );
};

export default LinkDetails;
