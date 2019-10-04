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

const moodScaleSelect = moodScale => {
    return (
        <div>
            <span>{moodScale.scaleName}</span>
            {moodScale.scaleItems.map(scaleItem =>
                (<label>
                <input type="radio" name={moodScale.id} value={scaleItem.index} />
                    {scaleItem.alias}
                </label>))
            }
        </div>);
}

const moodForm = () => {
    return (
        <div>
            <form>
                {testMoodScales.map(moodScale => moodScaleSelect(moodScale))}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export { moodForm };