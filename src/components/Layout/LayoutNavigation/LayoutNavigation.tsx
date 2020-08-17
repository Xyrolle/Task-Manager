import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from 'context/AppContext';
import './LayoutNavigation.css';

const LayoutNavigation: React.FC = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const { activeLink, setActive } = ctx;

	return (
		<div className='layoutNavigation'>
			<ul>
				<li
					className={

							activeLink === 'Overview' ? 'active-link' :
							''
					}
				>
					<Link to='Overview' onClick={() => setActive('Overview')}>
						Overview
					</Link>
				</li>
				<li
					className={

							activeLink === 'Tasks' ? 'active-link' :
							''
					}
				>
					<Link to='Tasks' onClick={() => setActive('Tasks')}>
						Tasks
					</Link>
				</li>
				<li
					className={

							activeLink === 'Milestones' ? 'active-link' :
							''
					}
				>
					<Link to='Milestones' onClick={() => setActive('Milestones')}>
						Milestones
					</Link>
				</li>
				<li
					className={

							activeLink === 'Messages' ? 'active-link' :
							''
					}
				>
					<Link to='Messages' onClick={() => setActive('Messages')}>
						Messages
					</Link>
				</li>
				<li
					className={

							activeLink === 'Files' ? 'active-link' :
							''
					}
				>
					<Link to='Files' onClick={() => setActive('Files')}>
						Files
					</Link>
				</li>
				<li
					className={

							activeLink === 'Time' ? 'active-link' :
							''
					}
				>
					<Link to='Time' onClick={() => setActive('Time')}>
						Time
					</Link>
				</li>
				<li
					className={

							activeLink === 'Notebooks' ? 'active-link' :
							''
					}
				>
					<Link to='Agenda' onClick={() => setActive('Notebooks')}>
						Notebooks
					</Link>
				</li>
				<li
					className={

							activeLink === 'Links' ? 'active-link' :
							''
					}
				>
					<Link to='Links' onClick={() => setActive('Links')}>
						Links
					</Link>
				</li>
				<li
					className={

							activeLink === 'Settings' ? 'active-link' :
							''
					}
				>
					<Link to='Settings' onClick={() => setActive('Settings')}>
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default LayoutNavigation;
