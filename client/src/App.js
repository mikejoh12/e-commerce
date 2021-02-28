import Nav from './components/Nav'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="App flex flex-col min-h-screen">
      <Nav />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App
