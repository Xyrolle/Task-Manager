import React, { Fragment } from 'react';

import TimePoints from '../TimePoints';

const TimeTable: React.FC<any> = ({ timeGroup }: any) => {
	return (
		<Fragment>
			<div className='tableHeaderWrap'>
				<div className='tableHeader'>
					<div className='timeDescription'>
						<p>Description</p>
					</div>
					<div className='timeTaskList'>
						<p>Task list</p>
					</div>
					<div className='timeStartDate'>
						<p>Start</p>
					</div>
					<div className='timeEndDate'>
						<p>End</p>
					</div>
				</div>
			</div>
			<TimePoints id={timeGroup.id} />
		</Fragment>
	);
};

export default TimeTable;
