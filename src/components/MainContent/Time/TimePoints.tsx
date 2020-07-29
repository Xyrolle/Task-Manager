import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { getTimePoints } from './queries'

const TimePoints: React.FC<{ id: number }> = ({ id }) => {
    const { status, data, error } = useQuery(id.toString(), getTimePoints);

    if (status === 'loading') return <div data-testid="loading">loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

    return (
        <div >
            {data && data.map((timePoint: any, key: any) => {
                return (
                    <div>
                        <div>Description:{timePoint.description}</div>
                        <div>{timePoint.time_start}</div>
                        <div>{timePoint.time_end}</div>
                        <div>Task list id:{timePoint.task_list}</div>
                    /////////////
                    </div>
                )
            })}

            ds
        </div>
    );
};

export default TimePoints;
