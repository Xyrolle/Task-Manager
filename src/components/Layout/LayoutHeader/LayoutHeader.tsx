import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { AppContext } from '../../../context/AppContext';

import { getProjectDetails } from './utils';

import './LayoutHeader.css';

const LayoutHeader: React.FC = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const { data: projectInfo } = useQuery(['project', ctx.projectId], getProjectDetails);

	return (
		<header className='layoutHeader'>
			<span className='projectName'>{projectInfo && projectInfo.name}</span>
			<span className='companyName'>{projectInfo && projectInfo.company}</span>
		</header>
	);
};

export default LayoutHeader;
