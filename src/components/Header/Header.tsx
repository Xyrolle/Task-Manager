import React, { useContext, useState } from 'react';

import './Header.css';
import Vector from '../../assets/Vector.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import Bell from '../../assets/Bell.svg';
import Logo from '../../assets/Logo.png';
import PlusDropdown from './PlusDropdown/PlusDropdown';
import { AppContext } from '../../context/AppContext';

const Header: React.FC = () => {
	const [ plusDropdownIsOpen, setPlusDropdownIsOpen ] = useState<boolean>(false);
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}
	return (
		<header className='mainHeader'>
			<nav className='nav'>
				<div className='mainHeadList'>
					<div className='logo'>
						<img src={Logo} alt='logo' />
					</div>
					<div className='burgerMenuWrap'>
						<input type='checkbox' className='burgerToggler' />
						<div className='hamburger'>
							<div />
						</div>
						<div className='burgerMenu'>
							<div>
								<div>
									<ul>
										<li>Home</li>
										<li>Projects</li>
										<li>Planning</li>
										<li>Everything</li>
										<li>Calendar</li>
										<li>People</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* <ul>
            <li>Home</li>
            <li>Projects</li>
            <li>Planning</li>
            <li>Everything</li>
            <li>Calendar</li>
            <li>People</li>
          </ul> */}
				</div>
				<div className='mainHeadBtns'>
					<button type='button' className='addTeamBtn' onClick={ctx.openModal}>
						<img
							src='//cdn-pjs.teamwork.com/tko/public/assets/svg/inlinehelp/inviteusers.svg'
							alt='add team'
						/>
						<span>Add Your Team</span>
					</button>
					<button type='button' className='upgradeBtn'>
						Upgrade Now
					</button>
					<span className='searchCircle'>
						<img src={SearchIcon} alt='search' className='search' />
					</span>
					<div className='plusContainer'>
						<div
							className={

									!plusDropdownIsOpen ? 'plus' :
									'whitePlus'
							}
							onClick={() => setPlusDropdownIsOpen(!plusDropdownIsOpen)}
						/>
						{plusDropdownIsOpen && <PlusDropdown />}
					</div>
					<div className='folder' />
					<span className='bellContainer'>
						<img src={Bell} alt='bell' className='bell' />
					</span>
					<span className='profileCircle'>EO</span>
					<img src={Vector} alt='vector' className='vector' />
				</div>
			</nav>
		</header>
	);
};

export default Header;
