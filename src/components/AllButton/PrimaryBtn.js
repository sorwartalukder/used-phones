import React from 'react';

const PrimaryBtn = ({ children }) => {
    return (
        <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white hover:shadow-secondary hover:shadow-md">{children}</button>
    );
};

export default PrimaryBtn;