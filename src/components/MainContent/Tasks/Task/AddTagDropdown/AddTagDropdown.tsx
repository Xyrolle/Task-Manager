import React from 'react';

import './AddTagDropdown.css';

const AddTagDropdown: React.FC = () => {
	return (
		<div className='tagDropdownContainer-task tags-to-task'>
			<header className='tagDropdownHeader'>
				<input type='text' placeholder='Add Tag' />
			</header>
			<button className='btn addTag-btn'>Create new tag</button>
		</div>
	);
};

export default AddTagDropdown;
