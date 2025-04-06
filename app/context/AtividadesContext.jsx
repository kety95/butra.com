import React, { createContext, useContext, useState } from 'react';

const AtividadesContext = createContext();

export const AtividadesProvider = ({ children }) => {
    const [minhasAtividades, setMinhasAtividades] = useState([]);

    const inscreverAtividade = (atividade) => {
        const jaInscrito = minhasAtividades.some(
            (a) => a.id === atividade.id && a.selectedDate === atividade.selectedDate
        );
    
        if (jaInscrito) {
            alert("Você já está inscrito nesta atividade para esta data!");
            return;
        }
    
        setMinhasAtividades((prev) => [...prev, atividade]);
    };
    

    const cancelarInscricao = (id) => {
        setMinhasAtividades((prev) => prev.filter((atividade) => atividade.id !== id));
    };

    return (
        <AtividadesContext.Provider value={{ minhasAtividades, inscreverAtividade, cancelarInscricao }}>
            {children}
        </AtividadesContext.Provider>
    );


};

export const useAtividades = () => useContext(AtividadesContext);
