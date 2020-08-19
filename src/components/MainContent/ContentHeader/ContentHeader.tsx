import React, { useContext } from 'react';
import './ContentHeader.css';
import { AppContext } from 'context/AppContext';
import Layout from 'components/Layout/Layout';
const ContentHeader: React.FC = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}
	const { activeLink, setOpenModal } = ctx;

	return (
		<div className='contentHeader'>
			<h1 className='contentHeader-left'>{activeLink}</h1>
			<div className='contentHeader-right'>
				{activeLink !== 'Overview' &&
					activeLink !== 'Settings' && (
						<button className='btn open-main-modal' onClick={() => setOpenModal(activeLink.toLowerCase())}>
							<span>&#43; </span>
							{`Add ${
								activeLink[activeLink.length - 1] === 's' ? activeLink
									.slice(0, activeLink.length - 1)
									.toLowerCase() :
									activeLink.toLowerCase()}`}
						</button>
					)}
			</div>
		</div>
	);
};

export default ContentHeader;
