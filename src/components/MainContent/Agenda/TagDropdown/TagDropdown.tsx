import React, { useRef } from 'react';
import './Tag.css';
import axios from 'axios'

let axiosConfig = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
const addTagInAgenda = (id: number, title: string) => {
    axios.get(`http://46.101.172.171:8008/tags/agenda_tag/set/4/${id}`,
        axiosConfig
    )
        .then(function () {
            // addTagInAgenda(data.id, title)
        })
        .catch(function () {
            // console.log(error);
        })
}

const createTag = (title: string) => {
    axios.post('http://46.101.172.171:8008/tags/create', {
        title
    },
        axiosConfig
    )
        .then(function ({ data }) {
            addTagInAgenda(data.id, title)
        })
        .catch(function (error) {
            console.log(error);
        })
}
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
