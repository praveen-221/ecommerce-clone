import React, { useEffect } from 'react';
import "./styles.css";
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../actions";

function SubHeader() {
  const category = useSelector(state => state.Categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [])

  const renderCategories = (categoryList) => {
    let clientCategories = [];
    for(let i of categoryList) {
        clientCategories.push(
            <li key={i.name}>
              {
                i.parentId ? <a href={i.slug}>{i.name}</a> : <span>{i.name}</span>
              }
              {i.children.length > 0 ? (<ul>{renderCategories(i.children)}</ul>) : null}
            </li>
        );
    }
    return clientCategories;
  }

  return (
    <div className='subHeader'>
      <ul>
        {
          category.categories.length > 0 ? renderCategories(category.categories) : null
        }
      </ul>
    </div>
  )
}

export default SubHeader;