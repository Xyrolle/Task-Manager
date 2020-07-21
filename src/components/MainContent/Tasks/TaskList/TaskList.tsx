import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

import arrow from '../../../../assets/arrow.svg';

import Task from '../Task/Task';

import './TaksList.css';

const TaskList = () => {
	const [ isOpen, setIsOpen ] = useState(false);

	let { projectID } = useParams();

	return (
		<Fragment>
			<div className='task-list-row'>
				<img
					src={arrow}
					alt='arrow'
					className={
						'show-tasks-arrow ' +
						(
							isOpen ? 'arrow-close' :
							'')
					}
					onClick={() => setIsOpen((isOpen) => !isOpen)}
				/>
				<h3 className='list-label'>List Name</h3>
			</div>
			<div className='task-container'>
				<Task />
				<Task />
				<Task />
			</div>
		</Fragment>
	);
};

export default TaskList;
