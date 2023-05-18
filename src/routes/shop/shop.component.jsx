import { Routes, Route } from 'react-router-dom'
import CatergoriesPreview from '../catergories-preview/catergories-preview.component'
import './shop.styles.scss'
import Catergory from '../catergory/catergory.component'

const Shop = () => {

    return (
        <Routes>
            <Route index element ={<CatergoriesPreview/>}/>
            <Route path=":catergory" element = {<Catergory/>}/>
        </Routes>
    )
}

export default Shop