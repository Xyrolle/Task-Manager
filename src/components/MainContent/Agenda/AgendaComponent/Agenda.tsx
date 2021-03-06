import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, queryCache } from 'react-query';
import { DataAgendaInterface } from '../interfaces';
import Notebook from '../../../../assets/Notebook.png';
import tag from '../../../../assets/tag.png';
import TagDropdown from '../TagDropdown/TagDropdown';
import { DeleteTagInterface, tagInterface, AgendaInterface } from '../interfaces'
import { deleteTag } from '../queries'
import './../Agenda.css';
import '../TagDropdown/TagDropdown.css';

const Agenda: React.FC<{ agenda: DataAgendaInterface; style?: string }> = ({ agenda, style }) => {
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const { agendaID, projectId } = useParams()

  const [mutateDeleteTag] = useMutation(deleteTag, {
    onMutate: (newData: { agendaId: number, tagId: number }) => {
      queryCache.cancelQueries(['getAllAgendas', `${projectId}`]);
      queryCache.setQueryData(['getAllAgendas', `${projectId}`],
        (prev: AgendaInterface[] | undefined) => {
          let index;
          prev && prev[0].data.map(({ tags }: tagInterface[] | any) => {
            console.log('tags', tags)
            index = tags.findIndex((tag: tagInterface) => {
              return tag.id === newData.tagId
            })
            if (index >= 0) {
              tags.splice(index, 1)
            }
          })
          return prev;
        }
      );
    },
    onError: (error) => console.log(error),
  });

  return (
    <div className='agendaContainer' data-testid='agenda-testid'>
      <div className='agendaWrap changeColor'>
        <img src={Notebook} className={`notebook ${style}`} />
        <div>
          <h4 className="">{agenda.title.charAt(0).toUpperCase()}.</h4>
          <div className="agendaTitleWrap" >
            <Link to={`agenda/${agenda.id}/`}>
              <p >{agenda.title}</p>
            </Link>
            {agenda.tags.map((tag: tagInterface, key: number) =>
              <span className="tagAgenda" key={key}>{tag.title}
                <span
                  onClick={() => mutateDeleteTag({
                    agendaId: agenda.id,
                    tagId: tag.id,
                  })}
                  className="deleteAgendaTag"
                > x</span>
              </span>)
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
            Last modified by:{agenda.user} at {agenda.last_update}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
