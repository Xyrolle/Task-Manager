import React, { useRef } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { AgendaInterface } from './interfaces';
import './Agenda.css';
import { useMutation, queryCache, useQuery } from 'react-query';

let axiosConfig = {
    headers: {
        'Authorization': `Basic YWRtaW46cXdlMTIz`
    }
}

const addAgenda = ({title, content}) => {
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
    const agendaTitleInput = useRef(null)
    const agendaContentTextArea = useRef(null)
    const [mutate] = useMutation(addAgenda, {
        onMutate: (newData) => {
            queryCache.cancelQueries('2');
            const current = queryCache.getQueries('2')
            console.log(current)
            queryCache.setQueryData('2', (prev) => [
                prev,
                { ...newData, id: new Date().toISOString() },
            ])
            return current;
        },
        onError: (error, newData, rollback) => rollback(),
        // onSettled: () => queryCache
    })

    return (
        <div className='agendaCreateContainer'>
            <h2>Create New Notebook</h2>
            <input ref={agendaTitleInput} type="text" placeholder="Title" />
            Content
            
            <textarea ref={agendaContentTextArea} className="createContentTextArea" placeholder="content"></textarea>
            <div className="textAreaButtonsWrap">
                <button
                    className="createAgendaButton"
                    onClick={() =>
                        mutate(
                            // agendaTitleInput.current!.value,
                            // agendaContentTextArea.current!.value
                            {
                                title: 'dimatitle',
                                content: 'dimacontent'
                            }
                        )
                    }
                >
                    add agenda
                </button>
            </div>
        </div>
    );
};

export default AgendaCreate;
