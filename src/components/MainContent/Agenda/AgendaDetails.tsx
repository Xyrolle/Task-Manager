import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useMutation, queryCache, useQuery } from 'react-query';
import { axiosConfig } from '../../../utils/axiosConfig'
import './Agenda.css';
import Agenda from './Agenda';


const getAgendaById = async (id: string) => {
    const response = await axios.get(`http://46.101.172.171:8008/agenda/item/${id}`,
        axiosConfig
    );
    return response.data;
};

interface foo {
    id: number,
    title: string,
    content: string
}
const updateAgendaContent = ({ id, title, content }: foo): Promise<void> => {
    return axios.patch(`http://46.101.172.171:8008/agenda/item/${id}`, {
        title,
        content,
        project: '1',//project id
        user: '1',//current user id
        last_user: '1', // last updated userid
    },
        axiosConfig
    )
        .then(function (response: any) {
            console.log(response.data);
            const data = response.data
            // return data;
        })
        .catch(function (error) {
            console.log(error);
        })
}
export const AgendaDetails: React.FC = () => {
    const { agendaID } = useParams();
    const { status, data, error } = useQuery(agendaID, getAgendaById);
    const [onEditContent, setonEditContent] = useState(false);
    const agendaContentTextArea = useRef<HTMLTextAreaElement>(null)
    const [mutate] = useMutation(updateAgendaContent, {

        onMutate: (newData: any) => {
            queryCache.cancelQueries(agendaID);
            const snapshot = queryCache.getQueryData(agendaID);
            queryCache.setQueryData(agendaID, (prev: any) => {
                return {
                    content: newData.content,
                    tags: prev.tags,
                    title: prev.title,
                }
            });
            return () => queryCache.setQueryData(agendaID, snapshot);
        },
        onError: (error: any, newData: any, rollback: any) => rollback(),
        onSettled: () => queryCache.prefetchQuery(agendaID)
    })

    if (status === 'loading') return <div>loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

    return (
        <div >
            <button className="editAgendaButton" onClick={() => setonEditContent(true)}>Edit content</button>
            <Agenda agenda={data} style={'notebookDetails'} />
            {!onEditContent && <p>{data.content}</p>}
            <p>{data.id}</p>
            {onEditContent &&
                <div className="editContentWrap">
                    <textarea ref={agendaContentTextArea} className="contentTextArea">{data.content}</textarea>
                    <div className="textAreaButtonsWrap">
                        <button
                            className="publishAgendaButton"
                            onClick={async () => {
                                // await updateAgendaContent(
                                //     data.id,
                                //     data.title,
                                //     agendaContentTextArea.current!.value
                                // )
                                mutate({ id: data.id, title: data.title, content: agendaContentTextArea.current!.value })
                                await setonEditContent(false)
                            }}
                        >
                            Publish as New Version
                            </button>
                        <span> or </span>
                        <button
                            className="cancelButton"
                            onClick={() => setonEditContent(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};
