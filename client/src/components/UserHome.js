import React from 'react';

const testMoodLogs = [
    {
        id: 0,
        madeOn: "2019-03-04",
        notes: "some note I made",
        moodScales: [
            {
                id: 0,
                scaleName: "Happiness",
                scaleType: "text",
                scaleItem: {
                    index: 1,
                    alias: 2
                }
            },
            {
                id: 1,
                scaleName: "Wellbeing",
                scaleType: "text",
                scaleItem: {
                    index: 0,
                    alias: 1
                }
            }
        ],
    },
    {
        id: 1,
        madeOn: "2019-03-05",
        notes: "hey hey hey",
        moodScales: [
            {
                id: 0,
                scaleName: "Happiness",
                scaleType: "text",
                scaleItem: {
                    index: 1,
                    alias: 2
                }
            },
            {
                id: 1,
                scaleName: "Wellbeing",
                scaleType: "text",
                scaleItem: {
                    index: 0,
                    alias: 1
                }
            }
        ]
    }
]

const moodRow = (moodScales = [], date = "no date") => {
    return(
        <tr>
            <th>{date}</th>
            {moodScales.map(moodScale => (<td>{moodScale.scaleItem.alias}</td>))}
        </tr>
    );
}

const oneLog = (moodLog = {}) => {
    return (
        <>
        <tr>
            <th></th>
            {moodLog.moodScales.map(moodScale => (<th>{moodScale.scaleName}</th>))}
        </tr>
        {moodRow(moodLog.moodScales)}
        </>
    );
}

const historyTable = (moodLogs = []) => {
    return(
        <table>
            <tbody>
            {moodLogs.map(oneLog)}
            </tbody>
        </table>
    );
}

const UserHome = () => {
    return (
        <div>
            {historyTable(testMoodLogs)}
        </div>
    );
}

export { UserHome };