import React, { useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { formReducer, colorSquare } from '../Utils.js';

const scaleItemAlias = (alias, type) => {
    if (type === "text")
        return alias;
    if (type === "color")
        return colorSquare(alias);
}

const moodScaleSelect = (moodScale = {}, handleChange = f=>f) => {
    return (
        <div className="mood-scale" key={`${moodScale.id}-scale`}>
            <div><strong>{moodScale.scaleName}</strong></div>
            <div className="scale-items">{moodScale.scaleItems ?
            moodScale.scaleItems.map(scaleItem =>
                (<label key={`${scaleItem.id}-option`}>
                <input type="radio"
                name={moodScale.id}
                value={scaleItem.id}
                onChange={handleChange} />
                    <br/>{scaleItemAlias(scaleItem.alias, moodScale.scaleType)}
                </label>)) :
            (<p>"Something went wrong - no items on this scale."</p>)}
            </div>
        </div>
    );
}

const MoodForm = ({moodScales, createMoodLog}) => {
    const [ moodValues, setMoodValues ] = useReducer(formReducer, {notes: ""});
    const history = useHistory();

    //transform and submit moodValues
    const handleChange = evnt => {
        setMoodValues({key: evnt.target.name, value:evnt.target.value})
    }
    const handleSubmit = evnt => {
        evnt.preventDefault();
        createMoodLog(moodValues);
        //redirect home
        history.push('/home');
    };

    return (
        <div>
            <div><Link to="/home">Back</Link></div>
            <h2>How are you feeling?</h2>
            <form onSubmit={handleSubmit}>
                {moodScales ? moodScales.map(moodScale => moodScaleSelect(moodScale, handleChange)) : (<p>"Please make some scales to start creating logs."</p>)}
                <label>Notes</label><input type="text" name="notes" value={moodValues.notes} onChange={handleChange} maxLength="400"/>
                <input type="submit" value="Submit" disabled={!moodScales} />
            </form>
        </div>
    );
}

export { MoodForm };