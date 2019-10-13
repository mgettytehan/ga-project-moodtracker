import React, { useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
                value={scaleItem.id}
                onChange={handleChange} />
                    {scaleItem.alias}
                </label>)) :
            (<p>"Something went wrong - no items on this scale."</p>)}
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
            <form onSubmit={handleSubmit}>
                {moodScales ? moodScales.map(moodScale => moodScaleSelect(moodScale, handleChange)) : (<p>"Please make some scales to start creating logs."</p>)}
                <input type="text" name="notes" value={moodValues.notes} onChange={handleChange}/>
                <input type="submit" value="Submit" disabled={!moodScales} />
            </form>
        </div>
    );
}

export { MoodForm };