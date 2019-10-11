import React, { useState, useEffect } from 'react';
import { getMoodLogs } from '../Utils.js'

const moodRow = (moodScales = [], date = "no date") => {
    return(
        <tr>
            <th>{date}</th>
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
            {historyTable(tableMoodScales)}
        </div>
    );
}

export { UserHome };