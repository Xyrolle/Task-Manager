import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './LinkComponent.css';
import link from 'assets/link.png'
import tag from 'assets/tag.png'
import TagDropdown from '../TagDropdown/TagDropdown';

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
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

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
                        <Link to={`links/${data.id}`} className="linkDetailsLink">(Details)</Link>
                    </div>
                    {data.tags.map((tag: any, key: number) => {
                        return <span className="tag" key={key}>{tag.title} <span>x</span></span>
                    })}
                    <div className="tagWrap">
                        {/* {data && data.map((tag: tagInterface, key: number) => {
                            <div>

                            </div>
                        })} */}

                    </div>
                    <div>
                        <p className="linkContent">
                            {data.content}
                        </p>
                    </div>
                    <div className="buttonsWrap">
                        <span>
                            <div
                                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                                className="tagIconWrap"
                            >
                                <img src={tag} alt="tag icon" className="tagIcon" />
                                Add tag
                            </div>
                            {isTagDropdownOpen && <TagDropdown linkId={data.id} />}
                        </span>
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
