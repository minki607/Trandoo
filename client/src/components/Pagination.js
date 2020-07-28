import React from 'react'
import IconButton from "@material-ui/core/IconButton";


//for Recommend flag indicates whether pagination style is for recommendation section or not
const renderPagination = (items, forRecommend = false) => {
    console.log(forRecommend)
    return (
        <div>
            <ul style={ forRecommend ? { display:'flex'} : {}}>
                {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;

                if (type === "start-ellipsis" || type === "end-ellipsis") {
                    children =  <i style={{fontSize: '10px'}} className="material-icons">more_vert</i>;
                } else if (type === "page") {
                    children = (
                    <IconButton
                        style={{
                        fontWeight: selected ? "bold" : undefined,
                        fontSize: '10px',
                        backgroundColor: selected ? "#cdc2c7" : "transparent",
                        height: '10px',
                        width: '10px',

                        }}
                        {...item}
                    >
                        {page} 
                    </IconButton>
                    );
                } else {
                    children = (
                    <IconButton style= {{ height: '10px', width: '10px'}} {...item}>
                        {type === "previous" 
                        ? <i className="material-icons">arrow_drop_up</i> 
                         : <i className="material-icons">arrow_drop_down</i>}
                    </IconButton>
                    );
                }
                return (
                    <li key={index} style={{ margin: "10px 0" }}>
                    {children}
                    </li>
                );
                })}
            </ul>
        </div>
    )
}

export default renderPagination
