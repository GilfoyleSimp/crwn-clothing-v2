import { createContext, useState, useEffect } from "react";
import { getCatergoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
// import SHOP_DATA from "../shop-data.js"; 
//WE NO LONGER NEED THE ABOVE AS WELL (AFTER INITIAL USE)

export const CatergoriesContext = createContext({
    catergoryMap: {}
});

export const CatergoriesProvider = ({children}) => {
    const [catergoriesMap, setCatergoriesMap] = useState({})

    useEffect(() => { 
        //when calling a function that returns a promise inside useEffect
        //we need to wrap it in a async method as well
        const getCatergoriesMap = async () =>{
            const catergoryMap = await getCatergoriesAndDocuments()
            setCatergoriesMap(catergoryMap)
        }
        getCatergoriesMap()
        
    }, )

    // useEffect(() => {
    //     addCollectionAndDocuments('catergories', SHOP_DATA)
    // }, [])

    //WE ONLY RUN THIS USEEFFECT ONCE TO STORE INTO OUR FIRESTORE, THEN DELETE
    // USUALLY THIS METHOD ISNT DONE ON THE FRONTEND

    const value = { catergoriesMap };

    return (
        <CatergoriesContext.Provider value={value}> {children} </CatergoriesContext.Provider>
    )
}

