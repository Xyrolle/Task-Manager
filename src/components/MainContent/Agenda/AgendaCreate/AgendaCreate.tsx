import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './../Agenda.css';
import { addAgenda } from '../queries'

const AgendaCreate = () => {
	const agendaTitleInput = useRef<HTMLInputElement>(null);
	const agendaContentTextArea = useRef<HTMLTextAreaElement>(null);

	return (
		<div className='agendaCreateContainer'>
			<h2>Create New Notebook</h2>
			<input ref={agendaTitleInput} type='text' placeholder='Title' />
			Content
			<textarea ref={agendaContentTextArea} className='createContentTextArea' placeholder='content' />
			<div className='textAreaButtonsWrap'>
				<Link to={`/agenda`}>
					<button
						className='createAgendaButton'
						onClick={() => addAgenda(agendaTitleInput.current!.value, agendaContentTextArea.current!.value)}
					>
						add agenda
					</button>
				</Link>
			</div>
		</div>
	);
};

export default AgendaCreate;
