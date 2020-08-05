import React, { useRef } from 'react';
import { createTag } from '../queries';

import './Tag.css';

const TagDropdown: React.FC = () => {
    const tagInput = useRef<HTMLInputElement>(null)
    return (
        <div className='plusDropdownContainer'>
            <header className='plusDropdownHeader'>Quick Add</header>
            <div className='plusDropdownContent'>
                <input ref={tagInput} type="text" placeholder="Tag Name" />
                <button
                    onClick={() => createTag(tagInput.current!.value)}
                >
                    Add tag
                </button>
            </div>
        </div>
    );
};

export default TagDropdown;
