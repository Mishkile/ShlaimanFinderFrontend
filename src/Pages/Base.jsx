// BaseComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../public/styles/styles.css"
const BaseComponent = ({ title, children }) => {
    React.useEffect(() => {
        document.title = title || 'Shlaiman Finder';
    }, [title]);

    return (
        <div>
            <nav>
               
            </nav>
            <div>{children}</div>
        </div>
    );
};

export default BaseComponent;
