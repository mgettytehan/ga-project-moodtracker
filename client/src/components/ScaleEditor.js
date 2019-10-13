import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { formReducer, colorSquare } from '../Utils.js';

const colorOptionEditor = (scaleItem, saveData) =>
    <input type="color"
        data-index={scaleItem.index}
        data-prop="alias"
        name="scaleItems"
        value={scaleItem.alias}
        onChange={evnt => saveData({key: evnt.target.name, value: evnt.target.value, index: evnt.target.dataset.index, prop: evnt.target.dataset.prop})}
    />

const textOptionEditor = (scaleItem, saveData) =>
    <input type="text"
        data-index={scaleItem.index}
        data-prop="alias"
        name="scaleItems"
        value={scaleItem.alias}
        onChange={evnt => saveData({key: evnt.target.name, value: evnt.target.value, index: evnt.target.dataset.index, prop: evnt.target.dataset.prop})}
    />

const showScaleOptions = (scaleItems, scaleType, saveData=f=>f) => {
    if (!scaleItems)
        return "Error: no items detected";
    if (scaleType === "text")
        return scaleItems.map(scaleItem => textOptionEditor(scaleItem, saveData));
    else if (scaleType === "color")
        return scaleItems.map(scaleItem => colorOptionEditor(scaleItem, saveData));
}

const ScaleEdit = ({moodScale={}, updateScale=f=>f, cancelEdit=f=>f}) => {
    const [ formData, setFormData ] = useReducer(formReducer, moodScale);

    const handleSubmit = evnt => {
        evnt.preventDefault();
        updateScale({...moodScale, ...formData});
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="scaleName" value={formData.scaleName} onChange={evnt => setFormData({key: evnt.target.name, value: evnt.target.value})} />
            <div className="scale-items">{showScaleOptions(formData.scaleItems, formData.scaleType, setFormData)}</div>
            <input type="button" value="Cancel" onClick={() => cancelEdit(-1)} />
            <input type="submit" value="Save" disabled={!formData.scaleItems}/>
        </form>
    );
}

const showScaleItems = (alias, scaleType) => {
    if (scaleType === "text")
        return (<div className="scale-item">{alias}</div>);
    if (scaleType === "color")
        return colorSquare(alias);
}

const moodScaleShow = (moodScale={}, openForEdit=f=>f) => {
    return (
        <div className="mood-scale">
            <div><strong>{moodScale.scaleName}</strong></div>
            <div className="scale-items">
                {moodScale.scaleItems ?
                moodScale.scaleItems.map(scaleItem => <div>{showScaleItems(scaleItem.alias, moodScale.scaleType)}</div>) :
                (<p>Error: scale has no items.</p>)}
            </div>
            <button id={moodScale.id} onClick={evnt => openForEdit(Number(evnt.target.id))}>Edit</button>
        </div>
    );
}

const AddScale = ({addNewScale}) => {
    const [ newScaleData, setNewScaleData ] = useReducer(formReducer, {scaleName: "", scaleType: "text", scaleItems: "2"});
    
    const handleChange = evnt => setNewScaleData({key: evnt.target.name, value: evnt.target.value});  
    const handleSubmit = evnt => {
        evnt.preventDefault();
        addNewScale(newScaleData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="scaleName" value={newScaleData.scaleName} onChange={handleChange} />
            <label>Type:</label>
            <select name="scaleType" value={newScaleData.scaleType} onChange={handleChange}>
                <option value="text">Words/Numbers</option>
                <option value="color">Colors</option>
            </select>
            <label>Number of items (2-15):</label>
            <input type="number" name="scaleItems" min="2" max="15" value={newScaleData.scaleItems} onChange={handleChange}/>
            <input type="submit" value="Add Scale" />
        </form>
    )
}

const ScaleEditor = ({moodScales, addNewScale, updateScale}) => {
    const [editOpen, setEditOpen] = useState(-1);
    const getMoodScale = (id) => moodScales.find(moodScale => moodScale.id === id);

    return (
        <div>
            <div><Link to="/home">Back</Link></div>
            <h2>Edit Scales</h2>
            {moodScales ?
            moodScales.map(scale =>
                editOpen == scale.id ?
                (<ScaleEdit moodScale={getMoodScale(editOpen)} updateScale={updateScale} cancelEdit={setEditOpen} />) :
                moodScaleShow(scale, setEditOpen)
            ) :
            (<p>"You have no scales. Please add some to get started."</p>)}
            <hr />
            <h2>Add New Scale</h2>
            <AddScale addNewScale={addNewScale} />
        </div>
    );
}

export {ScaleEditor};