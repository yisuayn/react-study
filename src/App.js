import './App.scss';

// import { useEffect } from 'react';
// import axios from 'axios'
import IndexRouter from './router/indexRouter'

function App() {
  // useEffect(() => {
  //   axios.get("/api/mmdb/movie/v3/list/hot.json?ct=%E9%87%8D%E5%BA%86&ci=45&channelId=4").then(res => {
  //     console.log(res.data)
  //   })
  // })
  return (
    <IndexRouter>
    </IndexRouter>
  );
}

export default App;
