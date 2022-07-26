import React, { useRef, useState } from "react";
import classes from "../SelectFilter/Select.module.css";
import {selectArrow, selectArrowActive} from "../../../assets/icons";
import useOnClickOutside from "../../../utils/CustomHooks/useOnClickOutside";


const SelectSort = ({activeMethodSort,setActiveMethodSort, placeholder, label}) => {
  const [isActive, setIsActive] = useState(false)
  const ref = useRef()
  useOnClickOutside(ref, () => setIsActive(false))

  const handleClickSelect = () => {
    isActive ? setIsActive(false) : setIsActive(true)
  }

  const handleClickOption = (sortMethod) => {
    if(sortMethod.key === activeMethodSort.key) return setActiveMethodSort(false)
    setActiveMethodSort(sortMethod)
    setIsActive(false)
  }

  const allSortMethods = [
    {name: 'По дате', key: 'date'},
    {name: 'По популярности', key: 'views_count'}
  ]

  return (
    <div className={classes.container}>
      {label && <p className={classes.container_label}>{label}</p>}
      <div
        className={classes.container_select}
        onClick={()=> handleClickSelect()}
        style={{borderColor: isActive ? 'black' : '#8C8C8C'}}
      >
        <>
          {activeMethodSort
            ?
            <span className={classes.container_select_active}>{activeMethodSort.name}</span>
            :
            <span className={classes.container_select_placeholder}>{placeholder}</span>
          }
          {isActive
            ?
            selectArrowActive
            :
            selectArrow
          }
        </>
      </div>
      {isActive && <div className={classes.container_options} ref={ref}>
        {allSortMethods.map( sortMethod =>
          <div
            className={classes[`container_option_${activeMethodSort.key === sortMethod.key}`]}
            onClick={()=> handleClickOption(sortMethod)}
            key={sortMethod.key}
          >
            <span>{sortMethod.name}</span>
          </div>
        )}
      </div>
      }
    </div>
  )
};
export default SelectSort;