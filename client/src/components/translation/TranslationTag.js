import React, {useState, useEffect} from "react";
import axios from 'axios'
import ReactTags from "react-tag-autocomplete";
import '../../css/tags.scss'

function SuggestionComponent({ item, query }) {
  

  return (
    <div id={item.id}>
      <div className='item-name'>{item.name}</div> <div>{item.description}</div>
    </div>
  );
}
const TranslationTag = ({ label, input: { value, onChange } }) => {

    const [suggestions, setList] = useState([])

    useEffect(() => {
      axios.get(`/api/tags`).then(res => {
          setList(res.data)
      })
  }, [])

  const newValue = !value ? [] : value;

  const handleDelete = i => {
    const tags = [...newValue];
    tags.splice(i, 1);
    onChange(tags);
  };

  const handleAdd = e => {
    onChange([...newValue, e]);
  };

  return (
      <div className='col s12'>
       <label>{label}</label>
        <ReactTags
        suggestionComponent={SuggestionComponent}
        tags={newValue}
        suggestions={suggestions}
        onDelete={handleDelete}
        onAddition={handleAdd}
        />
    </div>
  );
};

export default TranslationTag;
