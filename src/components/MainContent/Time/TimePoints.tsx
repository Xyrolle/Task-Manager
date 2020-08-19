import React from 'react';
import { useQuery } from 'react-query';
import { getTimePoints } from './queries';
import moment from 'moment';
import { TimePointInterface } from './interfaces'

const TimePoints: React.FC<{ id: number }> = ({ id }) => {
  const { status, data, error } = useQuery(
    ['time points', id.toString()],
    getTimePoints
  );
  if (status === 'loading') return <div data-testid="loading">loading</div>;
  if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

  return (
    <>
      {data &&
        data.map((timePoint: TimePointInterface, key: number) => {
          return (
            <div className="tableContentWrap" key={key}>
              <div className="tableContent">
                <div className="timeDescription">
                  <p>{timePoint.description}</p>
                </div>
                <div className="timeTaskList">
                  <p>{timePoint.task_list}</p>
                </div>
                <div className="timeEndDate">
                  <p>
                    {moment
                      .parseZone(timePoint.time_end)
                      .format('MMMM Do YYYY, h:mm a')}
                  </p>
                </div>
                <div className="timeStartDate">
                  <p>
                    {moment
                      .parseZone(timePoint.time_start)
                      .format('MMMM Do YYYY, h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default TimePoints;
