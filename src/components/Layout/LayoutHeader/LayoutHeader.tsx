import React from 'react';
import { Link } from 'react-router-dom';

import './LayoutHeader.css';

const LayoutHeader: React.FC = () => {
	return (
		<header className='layoutHeader'>
			<Link to='/projectName' className='projectName'>
				Project Name
			</Link>
			<span>Company Name</span>
		</header>
	);
};

export default LayoutHeader;
