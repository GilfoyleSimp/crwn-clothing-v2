import { useContext } from "react"
import { CatergoriesContext } from "../../contexts/catergories.context"
import CatergoryPreview from "../../components/catergory-preview/catergory-preview.component"

const CatergoriesPreview = () => {
    const { catergoriesMap } = useContext(CatergoriesContext)

    return (
        <>
            {Object.keys(catergoriesMap).map(title => {
                const products = catergoriesMap[title]
                return (
                    <CatergoryPreview key={title} title={title} products={products} />
                )
            }

            )
            }
        </>
    )
}

export default CatergoriesPreview