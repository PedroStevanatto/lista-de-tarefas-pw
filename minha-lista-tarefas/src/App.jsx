import ListaTarefas from './components/ListaTarefas';

//importa o css
import './App.css';

//inicializa o aplicativo
function App() {
  
  return (
    <>
      <h1>Gerenciador de Tarefas</h1>
      {/*em baixo do h1, roda o ListaTarefas*/}
      <ListaTarefas />
    </>
  );
}

export default App;