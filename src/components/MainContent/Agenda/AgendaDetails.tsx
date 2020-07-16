import React, { useState } from 'react';
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

export const AgendaDetails: React.FC<{ id: string }> = ({ id }) => {
	const { status, data, error } = useQuery(id, getAgendaById);

	if (status === 'loading') return <div>loading</div>;
	if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

	return (
		<div className='agendaDetailsContainer'>
			{console.log(data)}
			{/* <div className="agendaWrap">
                <img src={Notebook} width="35" height="44" />
                <div>
                    <Link to={`/agenda/${data.id}`} >
                        <p>{data.title}</p>
                        <p>Content:{data.content}</p>
                    </Link>
                    <p>Last modified by:{data.user} at {data.last_update}</p>
                </div>
            </div> */}
			<Agenda agenda={data} style={'notebookDetails'} />
		</div>
	);
};
