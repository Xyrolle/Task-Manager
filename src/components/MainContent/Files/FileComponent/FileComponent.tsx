import React from 'react';
import { Link } from 'react-router-dom'
import './FileComponent.css';
import fileIcon from '../../../../assets/file.png';
import { FileInterface } from '../interfaces'
import moment from 'moment';

const FileComponent: React.FC<{ file: FileInterface }> = ({ file }) => {
    return (
        <div className="fileComponentContainer">
            <p className="fileTitleFirstChar">{file.title.charAt(0).toUpperCase()}</p>
            <div className="fileIconWrap">
                <img src={fileIcon} alt="file icon" className="fileIcon" />
                <div className="fileDetailsWrap">
                    <Link to={`files/${file.id}`}>
                        <p className="fileTitle">{file.title}</p>
                    </Link>
                    <p className="fileUploadedDate">Uploaded at: {moment
                        .parseZone(file.date)
                        .format('MMMM Do YYYY, h:mm a')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FileComponent;
