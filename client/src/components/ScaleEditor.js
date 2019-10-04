import React from 'react';

// data for testing
const testMoodScales = [
    {
        id: 1,
        scaleName: "Happiness",
        scaleType: "text",
        scaleItems: [
            {
                index: 0,
                alias: 1,
                moodScale: 1
            },
            {
                index: 1,
                alias: 2,
                moodScale: 1
            }
        ]
    },
    {
        id: 2,
        scaleName: "Gumption",
        scaleType: "number",
        scaleItems: [
            {
                index: 0,
                alias: 1,
                moodScale: 1
            },
            {
                index: 1,
                alias: 2,
                moodScale: 1
            },
            {
                index: 2,
                alias: 3,
                moodScale: 1
            }
        ]
    },
]

const scaleItemTextEdit = (scaleItem) => {
    return (
        <input type="text" name={scaleItem.index} value={scaleItem.alias} />
    );
}

const scaleEdit = (moodScale) => {
    return (
        <form>
            <input type="text" name="scaleName" value={moodScale.scaleName} />
            {moodScale.scaleItems.map(scaleItem => scaleItemTextEdit(scaleItem))}
            <input type="button" value="Cancel" />
            <input type="submit" value="Save" />
        </form>
    );
}

const moodScaleShow = (moodScale) => {
    return (
        <div>
            <div>{moodScale.scaleName}</div>
            {moodScale.scaleItems.map(scaleItem => <div>{scaleItem.alias}</div>)}
            <button>Edit</button>
        </div>
    );
}

const scaleEditor = () => {
    return (
        <div>
            {testMoodScales.map(scale => moodScaleShow(scale))}
            {scaleEdit(testMoodScales[0])}
            <button>Add Scale</button>
        </div>
    );
}

export {scaleEditor};