import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AgendaInterface } from '../interfaces';

import './../Agenda.css';
import '../TagDropdown/TagDropdown.css';
import Notebook from '../../../../assets/Notebook.png';
import tag from '../../../../assets/tag.png';
import TagDropdown from '../TagDropdown/TagDropdown';

const deleteTag = () => {

}
interface tagInterface {
  title: string;
  id: number;
}

const Agenda: React.FC<{ agenda: AgendaInterface; style?: string }> = ({ agenda, style }) => {
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const agendaContentTextArea = useRef<HTMLTextAreaElement>(null)
  const { agendaID } = useParams()

  return (
    <div className='agendaContainer' data-testid='agenda-testid'>
      <div className='agendaWrap changeColor'>
        <img src={Notebook} className={`notebook ${style}`} />
        <div>
          <h4>{agenda.title.charAt(0).toUpperCase()}.</h4>
          <div className="agendaTitleWrap" >
            <Link to={`agenda/${agenda.id}`}>
              <p >v{agenda.title}</p>
            </Link>
            {console.log('agenda tags', agenda.tags)}
            {agenda.tags.map((tag: any, key: number) => console.log('agenda tag', agenda.tags))
              // <span className="tagAgenda" key={key}>{tag.title} <span>x</span></span>)
            }
          </div>
          {!agendaID &&
            <div className="buttonsAgendaInfoWrap">
              <div
                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                className="tagIconAgendaWrap"
              >
                <img src={tag} alt="tag icon" className="tagIcon" />
                Add tag
                        </div>
              {isTagDropdownOpen && <TagDropdown agendaId={agenda.id} />}
            </div>
          }
          <p className="agendaInfo">
            {/* <TagDropdown /> */}
            Last modified by:{agenda.user} at {agenda.last_update}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
