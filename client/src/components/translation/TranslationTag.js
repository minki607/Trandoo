import React, {useState, useEffect} from "react";
import axios from 'axios'
import ReactTags from "react-tag-autocomplete";
import '../../css/tags.scss'

function SuggestionComponent({ item }) {
  
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

  const tagArray = !value ? [] : value;

  const handleDelete = i => {
    const tags = [...tagArray];
    tags.splice(i, 1);
    onChange(tags);
  };

  const handleAdd = newtag => {
    var names = tagArray.map(({name}) => name)
    if (!names.includes(newtag.name) && tagArray.length < 3) {
      onChange([...tagArray, newtag])
    }
   
  };

  return (
      <div className='col s12'>
       <label>{label}</label>
        <ReactTags
        placeholderText={`Add Tag (Remaining ${3-tagArray.length})`}
        suggestionComponent={SuggestionComponent}
        noSuggestionsText='No Suggestion Found'
        tags={tagArray}
        suggestions={suggestions}
        onDelete={handleDelete}
        onAddition={handleAdd}
        allowNew
        delimiters={['Tab','Enter',',', ' ']}
        />
    </div>
  );
};

export default TranslationTag;
