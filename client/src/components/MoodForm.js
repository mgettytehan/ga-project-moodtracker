import React, { useReducer } from 'react';
import { formReducer } from '../Utils.js';

const moodScaleSelect = (moodScale = {}, handleChange = f=>f) => {
    return (
        <div>
            <div>{moodScale.scaleName}</div>
            {moodScale.scaleItems.map(scaleItem =>
                (<label>
                <input type="radio"
                name={moodScale.id}
                value={scaleItem.index}
                onChange={evnt => handleChange( {key: evnt.target.name, value: evnt.target.value} )} />
                    {scaleItem.alias}
                </label>)
            )}
        </div>);
}

const MoodForm = (props) => {

    const [ moodValues, setMoodValues ] = useReducer(formReducer, {});
    //transform and submit moodValues

    return (
        <div>
            <form onSubmit={f=>f}>
                {props.moodScales.map(moodScale => moodScaleSelect(moodScale, setMoodValues))}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export { MoodForm };