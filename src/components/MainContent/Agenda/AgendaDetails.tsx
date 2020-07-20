import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Notebook from '../../../assets/Notebook.png';
import './Agenda.css';
import Agenda from './Agenda';

const getAgendaById = async (id: string) => {
    const response = await axios.get(`http://46.101.172.171:8008/agenda/item/${id}`, {
        headers:
        {
            Authorization: `Basic YWRtaW46cXdlMTIz`
        }
    });
    return response.data;
};

let axiosConfig = {
    headers: {
        'Authorization': `Basic YWRtaW46cXdlMTIz`
    }
}

const updateAgendaContent = (id: number, title: string, content: string) => {
    axios.patch(`http://46.101.172.171:8008/agenda/item/${id}`, {
        title,
        content,
        project: '1',//project id
        user: '1',//current user id
        last_user: '1', // last updated userid
    },
        axiosConfig
    )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}
export const AgendaDetails: React.FC<{ id: string }> = ({ id }) => {
    const { status, data, error } = useQuery(id, getAgendaById);
    const [onEditContent, setonEditContent] = useState(false);
    const agendaContentTextArea = useRef<HTMLTextAreaElement>(null)

    if (status === 'loading') return <div>loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

    return (
        <div >
            <button className="editAgendaButton" onClick={() => setonEditContent(true)}>Edit content</button>
            <Agenda agenda={data} style={'notebookDetails'} />
            {onEditContent &&
                <div className="editContentWrap">
                    <textarea ref={agendaContentTextArea} className="contentTextArea">{data.content}</textarea>
                    <div className="textAreaButtonsWrap">
                        <button
                            className="publishAgendaButton"
                            onClick={async () => {
                                await updateAgendaContent(
                                    data.id,
                                    data.title,
                                    agendaContentTextArea.current!.value
                                )
                                await setonEditContent(false)
                            }
                            }
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
                </div>}
        </div>
    );
};
