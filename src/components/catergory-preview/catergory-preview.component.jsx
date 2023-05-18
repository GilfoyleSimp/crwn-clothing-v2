import './catergory-preview.styles.scss'
import ProductCard from '../product-card/product-card.component'
import { Link } from 'react-router-dom'

const CatergoryPreview = ({ title, products }) => {
    return (
        <div className='catergory-preview-container'>
            <h2>
                <Link to={title} className='title'>{title.toUpperCase()}</Link>
            </h2>
            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        )
                        )
                }
            </div>
        </div>
    )

}

export default CatergoryPreview