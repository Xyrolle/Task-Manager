import React, { useState } from 'react';
import { Route, useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getLinks } from './queries'
import AddTLinkModal from './AddLinkModal/AddLinkModal'
import './LinkContent.css';

const LinkContent: React.FC = () => {
    const { projectId } = useParams();
    const { status, data, error } = useQuery(['getLinks', projectId], getLinks);
    const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
    const handleShowModal = () => setIsAddLinkOpen(false);

    return (
        <div>
            <button
                onClick={() =>
                    setIsAddLinkOpen(!isAddLinkOpen)}
                className="addLinkButton"
            >
                + Add Link
            </button>
            {isAddLinkOpen && <AddTLinkModal handleShowModal={handleShowModal} />}

            {data && data.map((link: any, key: number) => (
                <div key={key}>
                    <Link to={`${link.id}`}>
                        {link.content}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default LinkContent;
