import React from 'react';

import './ContentHeader.css';

const ContentHeader: React.FC = () => {
	return (
		<div className='contentHeader'>
			<h1 className='contentHeader-left'>Tasks</h1>
			<div className='contentHeader-right'>
				<button className='btn'>Add Task List</button>
			</div>
		</div>
	);
};

export default ContentHeader;
