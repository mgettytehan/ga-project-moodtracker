import React, { useReducer } from 'react';
import { formReducer } from '../Utils.js';

const moodScaleSelect = (moodScale = {}, handleChange = f=>f) => {
    return (
        <div>
            <div>{moodScale.scaleName}</div>
            {moodScale.scaleItems ?
            moodScale.scaleItems.map(scaleItem =>
                (<label>
                <input type="radio"
                name={moodScale.id}
                value={scaleItem.index}
                onChange={evnt => handleChange( {key: evnt.target.name, value: evnt.target.value} )} />
                    {scaleItem.alias}
                </label>)) :
            (<p>"Something went wrong - no items on this scale."</p>)
            }
        </div>);
}

const MoodForm = (props) => {

    const [ moodValues, setMoodValues ] = useReducer(formReducer, {});
    //transform and submit moodValues

    return (
        <div>
            <form onSubmit={f=>f}>
                {props.moodScales ? props.moodScales.map(moodScale => moodScaleSelect(moodScale, setMoodValues)) : (<p>"Please make some scales to start creating logs."</p>)}
                <input type="submit" value="Submit" disabled={!props.moodScale} />
            </form>
        </div>
    );
}

export { MoodForm };