import React from 'react';

import { IComment } from './IComment';

import './Comment.css';

const Comment: React.FC<IComment> = ({ text, date, author, id }: IComment) => {
	let dateOne = new Date();
	let dateTwo = new Date(date);
	let ms;
	if (date !== '0') {
		ms = +dateOne + -+dateTwo;
	} else {
		ms = 0;
	}

	const whenPosted = (ms: number) => {
		if (ms > 60000 && ms < 3600000) return Math.round(ms / 1000 / 60) + ' minutes ago';
		else if (ms > 3600000 && ms < 3600000 * 24) {
			return Math.round(ms / 1000 / 60 / 24) + ' hours ago';
		} else if (ms < 1000) return 'a few seconds ago';
		else return Math.round(ms / 1000) + ' seconds ago';
	};

	return (
		<div className='comment'>
			<span className='comment-profile'>SH</span>
			<div className='comment-content'>
				<h3 className='author'>{author}</h3>
				<p>{text}</p>
				<div className='when-posted'>{whenPosted(ms)}</div>
			</div>
		</div>
	);
};

export default Comment;
