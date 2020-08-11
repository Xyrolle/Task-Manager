import React, { useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, queryCache, useQuery } from 'react-query';
import { axiosConfig } from '../../../../utils/axiosConfig'
import axios from 'axios';
import './LinkDetails.css'
import LinkComponent from '../LinkComponent/LinkComponent'
import { AppContext } from '../../../../context/AppContext';

const getLink = async (key: string, projectId: string, linkId: string) => {
    const response = await axios.get(`http://46.101.172.171:8008/link/${projectId}/item/${linkId}`, axiosConfig)
    return response.data
}
interface foo {
    comment: string;
    linkId: string;
    projectId: string;
    userId: number;
}
const addComment = async ({ comment, linkId, projectId, userId }: foo) => {
    const response = await axios.post(`http://46.101.172.171:8008/link/item/${linkId}/comments`, {
        text: comment
    },
        axiosConfig)

    if (response.status === 200) {
        queryCache.setQueryData(['getLink', projectId, linkId], (prev: any) => {
            prev.comments.push({
                id: response.data.id,
                text: comment,
                author: userId,
                user: userId,
            });
            return prev;
        });
    }
    return response.data
}

const LinkDetails: React.FC = () => {
    const { projectId, linkId } = useParams();
    const ctx = useContext(AppContext);
    const commentInput = useRef<HTMLTextAreaElement>(null)
    const { status, data, error } = useQuery(['getLink', projectId, linkId], getLink);

    if (!ctx) {
        throw new Error('You probably forgot to put <AppProvider>.');
    }

    const [mutate] = useMutation(addComment, {

        onMutate: (newData: any) => {
            queryCache.cancelQueries(['getLink', projectId]);
            const snapshot = queryCache.getQueryData(['getLink', projectId]);

            return () => queryCache.setQueryData('getLink', snapshot);
        },

        onError: (error: any, newData: any, rollback: any) => rollback(),
        // onSettled: () => queryCache.prefetchQuery('getTimeGroups')
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
                {data && data.comments.map((comment: any, key: number) => {
                    return <>
                        <div className="commentLinkWrap">
                            <div className="profileImage">DS</div>
                            <div className="commentDetailsLink">
                                <p className="authorCommentLink">{comment.author}</p>
                                <p className="textCommentLink">{comment.text}</p>
                            </div>
                        </div>
                    </>
                })}
            </div>
        </div>
    );
};

export default LinkDetails;
