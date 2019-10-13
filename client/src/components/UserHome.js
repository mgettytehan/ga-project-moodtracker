import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMoodLogs } from '../Utils.js'

const convertToAmPm = (hour) => {
    if (hour === 0)
        return "12 AM";
    else if (hour < 12)
        return hour + " AM";
    else if (hour === 12)
        return hour + " PM";
    else
        return (hour-12) + " PM";
}

const dateTimeFormat = (dateString) => {
    const d = new Date(dateString);
    return (<span>{`${d.getMonth()+1}-${d.getDate()}`}<br/>at {`${convertToAmPm(d.getHours())}`}</span>);
}

const sortByDate = (moodLog1, moodLog2) => {
    const date1 = new Date(moodLog1.madeOn);
    const date2 = new Date(moodLog2.madeOn);
    return Math.sign(date2.getTime() - date1.getTime());
}

const moodRow = (scaleItems = [], date = "no date", notes = "") => {
    return(
        <tr>
            <th className="column-header">{dateTimeFormat(date)}</th>
            {scaleItems.map(scaleItem => (<td>{scaleItem.alias}</td>))}
            <td>{notes}</td>
        </tr>
    );
}

const oneLog = (moodLog = {}) => {
    return (
        <>
        <tr>
            <th></th>
            {moodLog.scaleItems ? moodLog.scaleItems.map(scaleItem => (<th>{scaleItem.scaleName}</th>)) : "No mood found"}
            <th>Notes</th>
        </tr>
        {moodRow(moodLog.scaleItems, moodLog.madeOn, moodLog.notes)}
        </>
    );
}

const historyTable = (moodLogs = []) => {
    return(
        <div className="table-container">
        <table>
            <tbody>
            {moodLogs.map(oneLog)}
            </tbody>
        </table>
        </div>
    );
}

const constructLogs = (moodLogs, moodScales) => 
    moodLogs.map(
        moodLog => {
            const {scaleItems, ...newMoodLog} = moodLog;
            const newScaleItems = scaleItems.map(
                scaleItem => {
                    const scaleData = moodScales[scaleItem.moodScale]
                    return {...scaleItem, ...scaleData};
                }
            )
            return {...newMoodLog, scaleItems: newScaleItems};
        }
    );

const UserHome = ({moodScales={}}) => {
    const [tableMoodScales, setTableMoodScales] = useState([]);

    const getTableData = () => {
        getMoodLogs(localStorage.getItem('usertoken'))
            .then(moodLogs => setTableMoodScales((constructLogs(moodLogs, moodScales)).sort(sortByDate)))
            .catch(err => console.log(err));
    }

    useEffect(getTableData, []);
    return (
        <div>
            <Link to="/editscales"><button>Edit Scales</button></Link>
            <h2>Mood History</h2>
            <Link to="/addentry"><button>New Entry</button></Link>
            {historyTable(tableMoodScales)}
        </div>
    );
}

export { UserHome };