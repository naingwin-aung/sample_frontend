import Container from '../../global/Container'
import WhereNextCard from './whereNextCard'

const WhereNext = () => {
  return (
    <Container>
        <h2 className="text-3xl font-semibold mb-8">Where to next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <WhereNextCard />
            <WhereNextCard />
            <WhereNextCard />
            <WhereNextCard />
        </div>
      </Container>
  )
}

export default WhereNext