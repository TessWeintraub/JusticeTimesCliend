import React, {useState, useRef } from "react";
import useOnClickOutside from "../../../utils/CustomHooks/useOnClickOutside";
import {selectArrow, selectArrowActive} from "../../../assets/icons";
import classes from "./Select.module.css";

const SelectFilter = ({allMethodsFiltering, setActiveMethodFiltering,activeMethodFiltering, placeholder, label}) => {
  const [isActive, setIsActive] = useState(false)
  const ref = useRef()
  useOnClickOutside(ref, () => setIsActive(false))

  const handlerClickSelect = () => {
    isActive ? setIsActive(false) : setIsActive(true)
  }

  const handlerClickOption = (option) => {
    if (!activeMethodFiltering.length) return setActiveMethodFiltering([option])
    const newActiveOptions = JSON.parse(JSON.stringify(activeMethodFiltering))
    const isExistedElement = newActiveOptions.includes(option)
    isExistedElement ? newActiveOptions.splice(newActiveOptions.indexOf(option), 1) : newActiveOptions.push(option)
    setActiveMethodFiltering(newActiveOptions)
  }

  return (
    <div className={classes.container}>
      {label && <p className={classes.container_label}>{label}</p>}
      <div
        className={classes.container_select}
        onClick={()=> handlerClickSelect()}
        style={{borderColor: isActive ? 'black' : '#8C8C8C'}}
      >
        <>
          {activeMethodFiltering.length
            ?
            <span className={classes.container_select_active}>{activeMethodFiltering.length > 1 ? activeMethodFiltering?.map(option => `${option}, `) : activeMethodFiltering[0]}</span>
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
        {allMethodsFiltering.length && allMethodsFiltering.map( methodFiltering =>
          <div
            className={classes[`container_option_${activeMethodFiltering.includes(methodFiltering)}`]}
            onClick={()=> handlerClickOption(methodFiltering)}
            key={methodFiltering}
          >
            <span>{methodFiltering}</span>
          </div>
        )}
      </div>
      }
    </div>
  )
};
export default SelectFilter;