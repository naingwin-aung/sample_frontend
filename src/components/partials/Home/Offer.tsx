import Container from '../../global/Container'
import OfferCard from './OfferCard'

const Offer = () => {
  return (
    <Container>
        <h2 className="text-3xl font-semibold mb-8">Offers for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <OfferCard />
            <OfferCard />
            <OfferCard />
        </div>
      </Container>
  )
}

export default Offer