import React, { useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export const CellEditor = (props) => {
    const { options, type } = props;
    const inputRef = useRef(null);
    
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    
    const handleKeyDown = (e) => {
        // If Enter or Tab is pressed, complete the editing
        if (e.key === 'Enter' || e.key === 'Tab') {
            options.editorCallback(e.target.value || e.value);
            e.preventDefault(); // Prevent default behavior
        }
    };
    
    if (type === 'number') {
        return (
            <InputNumber 
                ref={inputRef}
                value={options.value} 
                onChange={(e) => options.editorCallback(e.value)}
                onKeyDown={handleKeyDown}
                className="p-cell-editing w-full"
                useGrouping={false}
            />
        );
    }
    
    return (
        <InputText 
            ref={inputRef}
            type={type || 'text'} 
            value={options.value} 
            onChange={(e) => options.editorCallback(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-cell-editing w-full"
        />
    );
};