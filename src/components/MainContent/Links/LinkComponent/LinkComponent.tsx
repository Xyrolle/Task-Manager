import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import './LinkComponent.css';
import link from 'assets/link.png'
import tag from 'assets/tag.png'
import TagDropdown from '../TagDropdown/TagDropdown';
import EditLinkModal from '../EditLinkModal/EditLinkModal'

interface LinkComponentInterface {
    data: {
        comments: Array<string>;
        content: string;
        date: string;
        id: number;
        project: number;
        tags: Array<number>;
        title: string;
        user: number
    }
}
interface tagInterface {
    id: number;
    title: string;
}


const LinkComponent: React.FC<LinkComponentInterface> = ({ data }) => {
    const [isEditLinkModalOpen, setIsEditLinkModalOpen] = useState(false)
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
    const { linkId } = useParams();
    const handleShowModal = () => setIsEditLinkModalOpen(false);

    return (
        <div>
            <p>{data.title.charAt(0).toUpperCase()}.</p>
            <div className="linkContentWrap">
                <div>
                    <img src={link} alt="link icon" />
                </div>
                <div className="linkDetailsContainer">
                    <div className="linkTitleWrap">
                        <p className="linkTitle"><a href={'https:' + data.title}>{data.title}</a></p>
                        {!linkId &&
                            <Link to={`links/${data.id}`} className="linkDetailsLink">
                                (Details)
                            </Link>
                        }
                    </div>
                    {!linkId && data.tags.map((tag: any, key: number) => {
                        return <span className="tagLink" key={key}>{tag.title} <span>x</span></span>
                    })}

                    <div>
                        <p className="linkContent">
                            {data.content}
                        </p>
                    </div>
                    <div className="buttonsLinkInfoWrap">
                        <div
                            onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                            className="tagLinkIconWrap"
                        >
                            <img src={tag} alt="tag icon" className="tagIcon" />
                            Add tag
                        </div>
                        {isTagDropdownOpen && <TagDropdown linkId={data.id} />}
                        <div
                            onClick={() => setIsEditLinkModalOpen(!isEditLinkModalOpen)}
                            className="tagLinkIconWrap"
                        >
                            <img src={tag} alt="tag icon" className="tagIcon" />
                            Edit
                        </div>
                        {isEditLinkModalOpen && <EditLinkModal handleShowModal={handleShowModal} data={data} />}
                    </div>
                    <div className="linkInfoWrap">
                        <p className="linkInfo">
                            Last updated at {moment.parseZone(data.date).format('MMMM Do YYYY, h:mm a')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkComponent;
