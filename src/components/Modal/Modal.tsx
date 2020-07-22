import React, { useContext } from 'react';

import './Modal.css';
import { AppContext } from '../../context/AppContext';

const Modal: React.FC = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}
	// const addTodo = (e: any) => {
	//   e.preventDefault();

	//   if (newTodo.name === '') {
	//     alert('No-no-no, no empty fields, plz!!');
	//     return;
	//   }
	//   const newArr: any = ctx.todoListDB;
	//   newArr.push(newTodo);
	//   localForage.setItem<TodoList>('todoList', newArr).then(function (value) {
	//     console.log(value);
	//   });
	//   ctx.setTodoListDB(newArr);

	//   if (
	//     byPrioritytodoList.length &&
	//     byPrioritytodoList[0].priority === newTodo.priority
	//   ) {
	//     const newPriorityArr = ctx.todoListDB.filter(
	//       (item) => item.priority === newTodo.priority
	//     );
	//     setByPrioritytodoList(newPriorityArr);
	//   }
	//   setNewTodo({
	//     id: 0,
	//     name: '',
	//     description: '',
	//     priority: 1,
	//     complete: false,
	//   });
	//   closeModal();
	// };

	return (
		<div>
			<div className='modalContainer'>
				<form className='modalForm' id='modalForm'>
					<div className='upperModalContainer'>
						<h3>Add your team</h3>
						<span>Start collaborating today by adding your team</span>
					</div>
					<input placeholder='Email' />
					//   onChange=
					<span>Add to a project</span>
					<select
						name='priorityList'
						required
						//   onChange=
					>
						<option>Project 1</option>
						<option>Project 2</option>
						<option>Project 3</option>
					</select>
					<div className='modalBtns'>
						<button
							type='button'
							className='cancelModalButton'
							data-testid='submitBtn'
							//   onClick=
						>
							Cancel
						</button>
						<button
							type='button'
							className='inviteModalButton'
							data-testid='submitBtn'
							//   onClick=
						>
							Invite
						</button>
					</div>
				</form>
			</div>

			<div className='bg' onClick={ctx.closeModal} />
		</div>
	);
};

export default Modal;
