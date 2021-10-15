import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addTag } from "../../modules/tagManager";

const TagForm = () => {

    const [tagToAdd, setTagToAdd] = useState({
        name: "",
    });

    const history = useHistory();

    const handleAddNewTag = () => {
        addTag(tagToAdd).then(() => {
            setTagToAdd({
                name: "",
            });
            history.push("/tags");
        });
    };

    // method that stores user input:
    const handleInputChange = (event) => {
        // making a copy of state:
        const newTag = {...tagToAdd}
        // dynamically creating properties and setting the values of user input in form:
        newTag[event.target.id] = event.target.value 
        setTagToAdd(newTag);
    };

    return (
        <div className="row tagFormContainer">
            <h3>Add A Tag</h3>
            <div className="tagForm">
                <br/><Label>Name:</Label><br/><br/>
                <input id="name" type="text" defaultValue={tagToAdd.name} value={tagToAdd.name} onChange={(event) => {handleInputChange(event)}} placeholder="tag name..." required />
                <br/><br/><Button className="btn btn-primary" value ="Create Tag" onClick={() => {handleAddNewTag()}}>Create Tag</Button><br/><br/>
            </div>
        </div>
    );
};

export default TagForm;
