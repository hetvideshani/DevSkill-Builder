// src/context/TextContext.tsx
import React, { createContext, useContext, useState } from 'react';

const TextContext = createContext(null);

export const useText = () => useContext(TextContext);

export const TextProvider = ({ children }:any) => {
    const [text, setText] = useState('');

    return (
        <TextContext.Provider value={{ text, setText }}>
            {children}
        </TextContext.Provider>
    );
};
