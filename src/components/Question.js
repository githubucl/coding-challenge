import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const Question = ({ metric, result }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <article className='question'>
            <header>
                <h4>{metric}</h4>
                <button className='btn' data-testid='btn' onClick={() => setShowInfo(!showInfo)}>
                    {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </button>
            </header>
            <div data-testid='content'>
                {showInfo && <p >{result}</p>}
            </div>
        </article>
    );
};

export default Question;