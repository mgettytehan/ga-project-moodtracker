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
    console.log(d)
    console.log(d.getMonth())
    return (<span>{`${d.getMonth()+1}-${d.getDate()}`}<br/>at {`${convertToAmPm(d.getHours())}`}</span>);
}

const moodRow = (moodScales = [], date = "no date") => {
    return(
        <tr>
            <th className="column-header">{dateTimeFormat(date)}</th>
            {moodScales.map(moodScale => (<td>{moodScale.alias}</td>))}
        </tr>
    );
}

const oneLog = (moodLog = {}) => {
    return (
        <>
        <tr>
            <th></th>
            {moodLog.scaleItems ? moodLog.scaleItems.map(scaleItem => (<th>{scaleItem.scaleName}</th>)) : "No mood found"}
        </tr>
        {moodRow(moodLog.scaleItems, moodLog.madeOn)}
        </>
    );
}

const historyTable = (moodLogs = []) => {
    console.log(moodLogs)
    return(
        <table>
            <tbody>
            {moodLogs.map(oneLog)}
            </tbody>
        </table>
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
            .then(moodLogs => setTableMoodScales(constructLogs(moodLogs, moodScales)))
            .catch(err => console.log(err));
    }

    useEffect(getTableData, []);
    return (
        <div>
            <h2>Mood History</h2>
            <Link to="/addentry"><button>New Entry</button></Link>
            {historyTable(tableMoodScales)}
        </div>
    );
}

export { UserHome };