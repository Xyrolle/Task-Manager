import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, queryCache, useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { axiosConfig } from 'utils/axiosConfig'
import moment from 'moment';
import './LinkComponent.css';
import link from 'assets/link.png';
import tag from 'assets/tag.png';
import TagDropdown from '../TagDropdown/TagDropdown';
import EditLinkModal from '../EditLinkModal/EditLinkModal';

interface LinkComponentInterface {
  data: {
    comments: Array<string>,
    content: string,
    date: string,
    id: number,
    project: number,
    tags: Array<number>,
    title: string,
    user: number,
  };
}

interface tagInterface {
  id: number;
  title: string;
}

interface deleteTagInterface {
  linkId: number;
  tagId: number;
}

const deleteTag = async ({ linkId, tagId }: deleteTagInterface) => {
  console.log('tag', tagId)
  const response = await axios.delete(`http://46.101.172.171:8008/tags/link_tag/set/${linkId}/${tagId}`,
    axiosConfig
  )
  console.log(response)
  return response;
}

const LinkComponent: React.FC<LinkComponentInterface> = ({ data }) => {
  const [isEditLinkModalOpen, setIsEditLinkModalOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const { linkId, projectId } = useParams();
  const handleShowModal = () => setIsEditLinkModalOpen(false);

  const [mutateDeleteTag] = useMutation(deleteTag, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(['getLinks', `${projectId}`]);
      queryCache.setQueryData(['getLinks', `${projectId}`],
        (prev: any) => {
          let index;
          prev[0].data.map(({ tags }: any) => {
            index = tags.findIndex((tag: any) => {
              return tag.id === newData.tagId
            })
            if (index > 0) {
              tags.splice(index, 1)
            }
          })
          return prev;
        }
      );
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
  });

  return (
    <div>
      <p className="linkFirstChar">{data.title.charAt(0).toUpperCase()}.</p>
      <div className="linkContentWrap">
        <div>
          <img src={link} alt="link icon" />
        </div>
        <div className="linkDetailsContainer">
          <div className="linkTitleWrap">
            <p className="linkTitle">
              <a href={'https:' + data.title}>{data.title}</a>
            </p>
            {!linkId && (
              <Link to={`links/${data.id}`} className="linkDetailsLink">
                (Details)
              </Link>
            )}
          </div>
          {!linkId &&
            data.tags.map((tag: any, key: number) => {
              return (
                <span className="tagLink" key={key}>
                  {tag.title}

                  <span
                    className="deleteLinkTag"
                    onClick={() => mutateDeleteTag({ linkId: data.id, tagId: tag.id })}>
                    x
                  </span>
                </span>
              );
            })}
          <div>
            <p className="linkContent">{data.content}</p>
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
            {isEditLinkModalOpen && (
              <EditLinkModal handleShowModal={handleShowModal} data={data} />
            )}
          </div>
          <div className="linkInfoWrap">
            <p className="linkInfo">
              Last updated at{' '}
              {moment.parseZone(data.date).format('MMMM Do YYYY, h:mm a')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkComponent;
