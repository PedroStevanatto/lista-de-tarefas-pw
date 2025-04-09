import { useState, useEffect } from 'react';

import './ListaTarefas.css';

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [concluidas, setConcluidas] = useState([]);

    useEffect(() => {
        const tSalvas = JSON.parse(localStorage.getItem("tarefas"));
        const concSalvas = JSON.parse(localStorage.getItem("concluidas"));
        if (tSalvas) {
            setTarefas(tSalvas);
        }
        if (concSalvas) {
            setConcluidas(concSalvas);
        }
    }, []); 

    useEffect(() => {
        if (tarefas.length > 0) {
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            localStorage.setItem("concluidas", JSON.stringify(concluidas));
        }
    }, [tarefas, concluidas]); 

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, novaTarefa]);
            setConcluidas([...concluidas, false]);
            setNovaTarefa("");
        }
    };

    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i) => i !== indice));
        setConcluidas(concluidas.filter((_, i) => i !== indice));
    };

    const alternarConcluida = (indice) => {
        const novasConcluidas = [...concluidas];
        novasConcluidas[indice] = !novasConcluidas[indice];
        setConcluidas(novasConcluidas);
    }

        return (
        <div>
            <h2>Lista de Tarefas</h2>
            <input
                type = 'text'
                value = {novaTarefa}
                onChange = {(e) => setNovaTarefa(e.target.value)}
                placeholder = 'Digite uma nova tarefa'
                className='input-tarefa'
            />
            <button onClick = {adicionarTarefa}>Adicionar</button>
            <ul>
                {tarefas.map((tarefa,indice) => (
                    <li key = {indice}>
                        <input
                            type="checkbox"
                            checked={concluidas[indice]}
                            onChange={() => alternarConcluida(indice)}
                        />
                        <span className={concluidas[indice] ? 'concluida' : ''}>
                        {tarefa.length > 35 ? tarefa.slice(0, 35) + "..." : tarefa}</span>
                         <button onClick = {() =>
                            removerTarefa(indice)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;