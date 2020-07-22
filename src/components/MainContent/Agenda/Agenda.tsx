import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { AgendaInterface } from './interfaces';
import Notebook from '../../../assets/Notebook.png';
import './Agenda.css';

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

const Agenda: React.FC<{ agenda: AgendaInterface; style?: string }> = ({ agenda, style }) => {
    const [onEditContent, setonEditContent] = useState(false)
    const agendaContentTextArea = useRef<HTMLTextAreaElement>(null)

    return (
        <div className='agendaContainer'>
            <div className='agendaWrap changeColor'>
                <img src={Notebook} className={`notebook ${style}`} />
                <div>
                    <h4>{agenda.title.charAt(0).toUpperCase()}.</h4>
                    {console.log(agenda.tags)}
                    {agenda.tags.map((tag: any) => <span>{tag.title}</span>)}

                    <Link to={`/agenda/${agenda.id}`}>
                        <p>{agenda.title}</p>
                    </Link>
                    <p>
                        Last modified by:{agenda.user} at {agenda.last_update}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Agenda;
