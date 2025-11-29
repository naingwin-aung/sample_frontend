import Container from '../../global/Container'
import TravelerCard from './TravelerCard'

const TravelerChoice = () => {
  return (
    <Container>
        <h2 className="text-3xl font-semibold mb-8">Travelers' favorite choices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <TravelerCard />
            <TravelerCard />
            <TravelerCard />  
            <TravelerCard />  
        </div>
      </Container>
  )
}

export default TravelerChoice