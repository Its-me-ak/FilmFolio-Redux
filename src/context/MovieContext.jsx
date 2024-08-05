import { createContext, useState } from 'react';

const MovieContext = createContext();


const MovieProvider = ({ children }) => {
    const [header, setHeader] = useState('Genres')
    const [loading, setLoading] = useState(true);
    const [mobileMenu, setMobileMenu] = useState(false)

    const movieCollection = () => {
        setLoading(false);
        setHeader("My Collection")
    }

    return (
        <MovieContext.Provider value={{
             loading, setLoading, header, setHeader, mobileMenu, setMobileMenu, movieCollection
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
