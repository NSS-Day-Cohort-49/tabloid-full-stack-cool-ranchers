import React, { useEffect, useState } from "react";
import Tag from './Tag';
import { getAllTags} from "../../modules/tagManager";

const TagList = () => {
    // Array destructuring initializes variables and useState() hook returns an array of 2 things: the initial value of the state variable
    // that is set by what passed to the hook and a function/method that updates that state/variable
  const [tags, setTags] = useState([]);



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
    </div>
  );
};

export default TagList;

