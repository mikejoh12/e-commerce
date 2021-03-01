import ProductCard from './ProductCard'

const MainContent = () => {
  
  const cards = []
  for (let i = 0; i < 12; i++) {
    cards.push(<ProductCard />)
  }
  
  return (
      <div className="flex-grow p-5">
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 max-w-7xl mx-auto">
              {cards} 
            </div>
      </div>
    )
  }
  
  export default MainContent