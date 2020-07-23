import React, { useRef } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { AgendaInterface } from './interfaces';
import './Agenda.css';
import { useMutation, queryCache, useQuery } from 'react-query';
import { axiosConfig } from '../../../utils/axiosConfig'

const addAgenda = (title: string, content: string) => {
    console.log(title)
    axios.post('http://46.101.172.171:8008/agenda/', {
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
            return response;
        })
        .catch(function (error) {
            console.log(error);
        })
}

const AgendaCreate = () => {
    const agendaTitleInput = useRef<HTMLInputElement>(null)
    const agendaContentTextArea = useRef<HTMLTextAreaElement>(null)

    return (
        <div className='agendaCreateContainer'>
            <h2>Create New Notebook</h2>
            <input ref={agendaTitleInput} type="text" placeholder="Title" />
            Content
            <textarea ref={agendaContentTextArea} className="createContentTextArea" placeholder="content"></textarea>
            <div className="textAreaButtonsWrap">
                <Link to={`/agenda`}>
                    <button
                        className="createAgendaButton"
                        onClick={() =>
                            addAgenda(
                                agendaTitleInput.current!.value,
                                agendaContentTextArea.current!.value
                            )
                        }
                    >
                        add agenda
                </button>
                </Link>
            </div>
        </div>
    );
};

export default AgendaCreate;
