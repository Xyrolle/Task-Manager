import React, { useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import './../Agenda.css';
import { addAgenda } from '../queries'
import { AppContext } from '../../../../context/AppContext';

const AgendaCreate = () => {
	const agendaTitleInput = useRef<HTMLInputElement>(null);
	const agendaContentTextArea = useRef<HTMLTextAreaElement>(null);
	const { projectId } = useParams();
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}
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
						onClick={() => addAgenda(
							agendaTitleInput.current!.value,
							agendaContentTextArea.current!.value,
							projectId,
							ctx.userDetails.id
						)}
					>
						add agenda
					</button>
				</Link>
			</div>
		</div>
	);
};

export default AgendaCreate;
