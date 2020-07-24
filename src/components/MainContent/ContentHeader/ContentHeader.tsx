import React, { useContext } from 'react';
import './ContentHeader.css';
import { AppContext } from '../../../context/AppContext';

const ContentHeader: React.FC = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	console.log('hello');

	return (
		<div className='contentHeader'>
			<h1 className='contentHeader-left'>Tasks</h1>
			<div className='contentHeader-right'>
				<button className='btn' onClick={() => ctx.openTaskListModal()}>
					<span>+</span> Add Task List
				</button>
			</div>
		</div>
	);
};

export default ContentHeader;
