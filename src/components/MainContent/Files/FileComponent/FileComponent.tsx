import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './FileComponent.css';
import fileIcon from '../../../../assets/file.png';

interface fileInterface {
    id: number;
    date: string;
    project: number;
    title: string;
    upload: string;
}

const FileComponent: React.FC<{ file: fileInterface }> = ({ file }) => {
    return (
        <div className="fileComponentContainer">
            <p className="fileTitleFirstChar">{file.title.charAt(0).toUpperCase()}</p>
            <div className="fileIconWrap">
                <img src={fileIcon} alt="file icon" className="fileIcon" />
                <div className="fileDetailsWrap">
                    <Link to={`files/${file.id}`}>
                        <p className="fileTitle">{file.title}</p>
                    </Link>
                    <p className="fileUploadedDate">Uploaded at: {file.date}</p>
                </div>
            </div>
        </div>
    );
};

export default FileComponent;
