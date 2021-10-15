import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Tag from './Tag';
import { getAllTags } from "../../modules/tagManager";
import { Button } from "reactstrap";


const TagList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [tags, setTags] = useState([]);

  const history = useHistory();

  const getTags = () => {
    getAllTags().then(tags => setTags(tags));
  };

  useEffect(() => {
    getTags();
  }, []);


  return (
    <div>
      <br/>
        <div className="container">
          <div className="container justify-content-center">
              {console.log(tags)}
              {tags.map((tag) => (
                <Tag tag={tag} key={tag.id} />
              ))}
          </div>
        </div>
        <br/>
        <div className="container">
          <Button onClick={() => {history.push(`/tags/add`)}}>Create Tag</Button>
        </div>
    </div>
  );
};

export default TagList;

