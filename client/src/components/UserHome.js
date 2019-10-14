import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMoodLogs, colorSquare } from '../Utils.js'

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

const scaleItemDisplay = (alias, type) => {
    if (type === "color")
        return colorSquare(alias);
    else
        return (<div className="scale-item">{alias}</div>);
}

const moodRow = (moodLog = {scaleItems:[]}) => {
    return(
        <tr>
            <th className="column-header">{dateTimeFormat(moodLog.madeOn)}</th>
            <td className="notes">{moodLog.notes}</td>
            {moodLog.scaleItems.map(scaleItem => (<td>{scaleItemDisplay(scaleItem.alias, scaleItem.scaleType)}</td>))}
        </tr>
    );
}

const oneLog = (moodLog = {}) => {
    return (
        <>
        <tr>
            <th></th>
            <th>Notes</th>
            {moodLog.scaleItems ? moodLog.scaleItems.map(scaleItem => (<th>{scaleItem.scaleName}</th>)) : "No mood found"}
        </tr>
        {moodRow(moodLog)}
        </>
    );
}

const historyTable = (moodLogs = []) => {
    console.log(moodLogs);
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

    useEffect(getTableData, [moodScales]);
    return (
        <div>
            <Link to="/editscales"><button>Edit Scales</button></Link>
            <hr/>
            <h2>Mood History</h2>
            <Link to="/addentry"><button>New Entry</button></Link>
            {historyTable(tableMoodScales)}
        </div>
    );
}

export { UserHome };