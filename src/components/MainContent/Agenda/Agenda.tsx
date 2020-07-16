import React from 'react';
import { Link } from 'react-router-dom';
import { AgendaInterface } from './interfaces';
import Notebook from '../../../assets/Notebook.png';
import './Agenda.css';

const Agenda: React.FC<{ agenda: AgendaInterface; style?: string }> = ({ agenda, style }) => {
	return (
		<div className='agendaContainer'>
			<div className='agendaWrap changeColor'>
				<img src={Notebook} className={`notebook ${style}`} />
				<div>
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
