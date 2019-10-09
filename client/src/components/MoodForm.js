import React, { useReducer } from 'react';

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
    const setFormValue = (state, action) => {
        state[action.key] = action.value;
        return state;
    }

    const [ moodValues, setMoodValues ] = useReducer(setFormValue, {});
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