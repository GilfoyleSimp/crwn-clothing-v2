import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect, Fragment } from 'react'
import { CatergoriesContext } from '../../contexts/catergories.context'
import ProductCard from '../../components/product-card/product-card.component'
import './catergory.styles.scss'

const Catergory = () => {
    const { catergory } = useParams()
    const { catergoriesMap } = useContext(CatergoriesContext)
    const [products, setProducts] = useState(catergoriesMap[catergory])

    useEffect(() => {
        setProducts(catergoriesMap[catergory])
    }, [catergory, catergoriesMap])

    return (
        <Fragment>
            <h2 className='catergory-title'>{catergory.toUpperCase()}</h2>
            <div className='catergory-container'>
                {products && //if products is undefined dont render
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </Fragment>

    )
}

export default Catergory