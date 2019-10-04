import React from 'react';

const testMoodLogs = [
    {
        madeOn: "some date",
        notes: "some note I made",
        moodScales: [
            {
                scaleName: "Happiness",
                scaleType: "text",
                scaleItem: {
                    index: 1,
                    alias: 2
                }
            },
            {
                scaleName: "Wellbeing",
                scaleType: "text",
                scaleItem: {
                    index: 0,
                    alias: 1
                }
            }
        ],
    }
]

const tableRow = moodLog => {
    return(
        <tr>
            <th>{moodLog.madeOn}</th>
            <td></td>
        </tr>
    );
}

const historyTable = moodLogs => {
    return(
        <table>
            <tr>{moodLogs.map(moodLog => (<th>moodLog.moodScale</th>))}</tr>
        </table>
    );
}

const userHome = () => {
    return (
        <div>
            
        </div>
    )
}