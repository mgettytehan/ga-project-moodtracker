import React, { useReducer, useState } from 'react';
import { formReducer } from '../Utils.js';

const ScaleEdit = ({moodScale}) => {
    const [ formData, setFormData ] = useReducer(formReducer, moodScale);
    return (
        <form>
            <input type="text" name="scaleName" value={formData.scaleName} onChange={evnt => setFormData({key: evnt.target.name, value: evnt.target.value})} />
            {formData.scaleItems.map(scaleItem =>
                (<input type="text"
                data-index={scaleItem.index}
                data-prop="alias"
                name="scaleItems"
                value={scaleItem.alias}
                onChange={evnt => setFormData({key: evnt.target.name, value: evnt.target.value, index: evnt.target.dataset.index, prop: evnt.target.dataset.prop})} />))}
            <input type="button" value="Cancel" />
            <input type="submit" value="Save" />
        </form>
    );
}

const moodScaleShow = (moodScale, openForEdit) => {
    return (
        <div>
            <div>{moodScale.scaleName}</div>
            {moodScale.scaleItems.map(scaleItem => <div>{scaleItem.alias}</div>)}
            <button id={moodScale.id} onClick={evnt => openForEdit(Number(evnt.target.id))}>Edit</button>
        </div>
    );
}

const ScaleEditor = ({moodScales}) => {
    const [editOpen, setEditOpen] = useState(-1);
    const getMoodScale = (id) => moodScales.find(moodScale => moodScale.id === id);
    return (
        <div>
            {moodScales.map(scale =>
                editOpen == scale.id ?
                (<ScaleEdit moodScale={getMoodScale(editOpen)} />) :
                moodScaleShow(scale, setEditOpen)
            )}
            <button>Add Scale</button>
        </div>
    );
}

export {ScaleEditor};