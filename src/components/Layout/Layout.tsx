import React from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';
import LayoutHeader from './LayoutHeader/LayoutHeader';

const Layout: React.FC = () => {
	return (
		<div>
			<LayoutHeader />
			<div className='contentHeader'>
				<ul>
					<li>
						<Link to='/overview'>Overview</Link>
					</li>
					<li>
						<Link to='/tasks'>Tasks</Link>
					</li>
					<li>
						<Link to='/milestones'>Milestones</Link>
					</li>
					<li>
						<Link to='/messages'>Messages</Link>
					</li>
					<li>
						<Link to='/files'>Files</Link>
					</li>
					<li>
						<Link to='/time'>Time</Link>
					</li>
					<li>
						<Link to='/agenda'>Notebooks</Link>
					</li>
					<li>
						<Link to='/people'>People</Link>
					</li>
					<li>
						<Link to='/settings'>Settings</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Layout;
