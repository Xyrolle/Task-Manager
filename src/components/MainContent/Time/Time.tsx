import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { getTimeGroups } from './queries';
import TimePoints from './TimePoints';
import AddTimeModal from './AddTimeModal/AddTimeModal'

const Time: React.FC = () => {
    const { status, data, error } = useQuery('getTimeGroups', getTimeGroups);
    const [isAddTimeModalOpen, setIsAddTimeModalOpen] = useState(false)
    const handleShowModal = () => setIsAddTimeModalOpen(false);

    if (status === 'loading') return <div data-testid="loading">loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

    return (
        <div >
            vasea
            <button
                onClick={() =>
                    setIsAddTimeModalOpen(!isAddTimeModalOpen)}
                className="addProjectButton"
            >
                + Add Time
            </button>
            {isAddTimeModalOpen && <AddTimeModal handleShowModal={handleShowModal} />}
            {data && data.map((timeGroup: any, key: any) => {

                return (
                    <div>
                        <div>{timeGroup.id}</div>
                        <TimePoints id={timeGroup.id} />
                    </div>
                )
            })}
        </div>
    );
};

export default Time;
