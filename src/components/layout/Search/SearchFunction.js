import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

// SCSS
import './Search.scss';

 const SearchFunction = () => {
    const valueRef = useRef(null);
    let history = useHistory();

    const  handleClick = () => {
        history.push('/produkter/soeg/' + valueRef.current.value);
        valueRef.current.value = '';
    }

    const handleEnter = (event) => {

        if (event.keyCode === 13) {
            history.push('/produkter/soeg/' + valueRef.current.value);

            valueRef.current.value = '';
        }
    }

    return (
        <>
            <form className="form-search">
            <input list="result" name="result" ref={valueRef} onKeyDown={handleEnter} type="Search"/> 
            
                

                <button onClick={handleClick} type="submit">SØG</button>
            </form>
        </>
    )
}

export default SearchFunction;
