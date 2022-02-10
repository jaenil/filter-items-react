import './App.css';
import {useEffect , useState} from 'react' ;
import { motion,AnimatePresence } from 'framer-motion' ;
import Movie from './Movie' ;
import Filter from './Filter';

function App() {
  const [ popular ,setPopular ] = useState([]) ;
  const [filtered, setFiltered] = useState([]) ;
  const [activeGenre, setActiveGenre] = useState(0) ;

  useEffect(() => {
    fetchPopular() ;
  },[]) ;

  const fetchPopular = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=d61ff42953ce8d01a7cd6d32ab723618&language=en-US')
    const movies = await data.json() ;
    setPopular(movies.results) ;
    setFiltered(movies.results) ;
  }
  return (
    <div className="App">
      <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
      <motion.div layout className="popular-movies">
      <AnimatePresence>
        {filtered.map(movie => {
          return<Movie key={movie.id} movie={movie} />
        })}
      </AnimatePresence>
      </motion.div>

    </div>
  );
}

export default App;
