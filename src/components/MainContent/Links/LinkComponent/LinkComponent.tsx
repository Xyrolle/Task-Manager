import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './LinkComponent.css';
import link from '../../../../assets/link.png'
import tag from '../../../../assets/tag.png'

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

const LinkComponent: React.FC<LinkComponentInterface> = ({ data }) => {
    return (
        <div>
            <p>{data.title.charAt(0).toUpperCase()}.</p>
            <div className="linkContentWrap">
                <div>
                    <img src={link} alt="link icon" />
                </div>
                <div className="linkDetailsContainer">
                    <div className="linkTitleWrap">
                        <p className="linkTitle">{data.title}</p>
                        <Link to={`links/${data.id}`} className="linkDetailsLink">(Details)</Link>
                    </div>
                    <div className="tagWrap">
                        <span className="tag">tag <span>x</span></span>
                    </div>
                    <div >
                        <p className="linkContent">
                            {data.content}
                        </p>
                    </div>
                    <div className="buttonsWrap">
                        <span className="tagIconWrap">
                            <img src={tag} alt="tag icon" className="tagIcon" />
                            Add tag
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
