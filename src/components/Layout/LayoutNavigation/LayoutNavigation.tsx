import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './LayoutNavigation.css';

const LayoutNavigation: React.FC = () => {
	const [ activeLink, setActive ] = useState('overview');
	return (
		<div className='layoutNavigation'>
			<ul>
				<li
					className={

							activeLink === 'overview' ? 'active-link' :
							''
					}
				>
					<Link to='/overview' onClick={() => setActive('overview')}>
						Overview
					</Link>
				</li>
				<li
					className={

							activeLink === 'tasks' ? 'active-link' :
							''
					}
				>
					<Link to='/tasks/1' onClick={() => setActive('tasks')}>
						Tasks
					</Link>
				</li>
				<li
					className={

							activeLink === 'milestones' ? 'active-link' :
							''
					}
				>
					<Link to='/milestones' onClick={() => setActive('milestones')}>
						Milestones
					</Link>
				</li>
				<li
					className={

							activeLink === 'messages' ? 'active-link' :
							''
					}
				>
					<Link to='/messages' onClick={() => setActive('messages')}>
						Messages
					</Link>
				</li>
				<li
					className={

							activeLink === 'files' ? 'active-link' :
							''
					}
				>
					<Link to='/files' onClick={() => setActive('files')}>
						Files
					</Link>
				</li>
				<li
					className={

							activeLink === 'time' ? 'active-link' :
							''
					}
				>
					<Link to='/time' onClick={() => setActive('time')}>
						Time
					</Link>
				</li>
				<li
					className={

							activeLink === 'notebooks' ? 'active-link' :
							''
					}
				>
					<Link to='/agenda' onClick={() => setActive('notebooks')}>
						Notebooks
					</Link>
				</li>
				<li
					className={

							activeLink === 'people' ? 'active-link' :
							''
					}
				>
					<Link to='/people' onClick={() => setActive('people')}>
						People
					</Link>
				</li>
				<li
					className={

							activeLink === 'settings' ? 'active-link' :
							''
					}
				>
					<Link to='/settings' onClick={() => setActive('settings')}>
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default LayoutNavigation;
