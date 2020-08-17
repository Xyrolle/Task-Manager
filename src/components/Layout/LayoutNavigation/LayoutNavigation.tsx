import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from 'context/AppContext';
import './LayoutNavigation.css';

const LayoutNavigation: React.FC = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const { activeLink, setActive, projectId } = ctx;

	const projectID = 115;

	return (
		<div className='layoutNavigation'>
			<ul>
				<li
					className={

						activeLink === 'Overview' ? 'active-link' :
							''
					}
				>
					<Link to={`/projects/${projectId}/overview`} onClick={() => setActive('Overview')}>
						Overview
					</Link>
				</li>
				<li
					className={

						activeLink === 'Tasks' ? 'active-link' :
							''
					}
				>
					<Link to={`/tasks/${projectID}`} onClick={() => setActive('Tasks')}>
						Tasks
					</Link>
				</li>
				<li
					className={

						activeLink === 'Milestones' ? 'active-link' :
							''
					}
				>
					<Link to='milestones' onClick={() => setActive('Milestones')}>
						Milestones
					</Link>
				</li>
				<li
					className={

						activeLink === 'Messages' ? 'active-link' :
							''
					}
				>
					<Link to='messages' onClick={() => setActive('Messages')}>
						Messages
					</Link>
				</li>
				<li
					className={

						activeLink === 'Files' ? 'active-link' :
							''
					}
				>
					<Link to={`/projects/${projectId}/files`} onClick={() => setActive('Files')}>
						Files
					</Link>
				</li>
				<li
					className={

						activeLink === 'Time' ? 'active-link' :
							''
					}
				>
					<Link to={`/projects/${projectId}/time`} onClick={() => setActive('Time')}>
						Time
					</Link>
				</li>
				<li
					className={

						activeLink === 'Notebooks' ? 'active-link' :
							''
					}
				>
					<Link to={`/projects/${projectId}/agenda`} onClick={() => setActive('Notebooks')}>
						Notebooks
					</Link>
				</li>
				<li
					className={

						activeLink === 'Links' ? 'active-link' :
							''
					}
				>
					<Link to={`/projects/${projectId}/links`} onClick={() => setActive('Links')}>
						Links
					</Link>
				</li>
				<li
					className={

						activeLink === 'Settings' ? 'active-link' :
							''
					}
				>
					<Link to={`/projects/${projectId}/overview`} onClick={() => setActive('Settings')}>
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default LayoutNavigation;
