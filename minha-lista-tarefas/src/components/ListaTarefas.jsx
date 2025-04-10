import { useState, useEffect, use } from 'react';

//importa o css
import './ListaTarefas.css';

//estados para armazenar as tarefas, o texto da nova tarefa, as tarefas concluídas e a ordem de exibição.
function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [concluidas, setConcluidas] = useState([]);
    const [ordemAa, setOrdemAa] = useState([]);
    const [ordemData, setOrdemData] = useState([]);

    //useEffect que busca as tarefas e conclusões salvas (só roda uma vez quando carrega).
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

    //useEffect que roda toda vez que as tarefas ou as conclusões mudam, salvando no localStorage.
    useEffect(() => {
        if (tarefas.length > 0) {
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            localStorage.setItem("concluidas", JSON.stringify(concluidas));
        }
    }, [tarefas, concluidas]); 

    //função para adicionar uma nova tarefa
    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, novaTarefa]);
            setOrdemData([...tarefas, novaTarefa]);
            setConcluidas([...concluidas, false]);
            setNovaTarefa("");
        }
    };

    //função para remover uma tarefa
    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i) => i !== indice));
        setConcluidas(concluidas.filter((_, i) => i !== indice));
    };

    //função para alternar o estado de concluída de uma tarefa
    const alternarConcluida = (indice) => {
        const novasConcluidas = [...concluidas];
        novasConcluidas[indice] = !novasConcluidas[indice];
        setConcluidas(novasConcluidas);
    }

    //função para ordenar as tarefas entre ordem alfabética ou por data
    const ordenar = () => {
        if (ordemAa) {
            setTarefas (ordemData);
            setConcluidas(ordemData.map((_, i) => concluidas[tarefas.indexOf(ordemData[i])]));
        }else{
            const tarefasOrganizadas = [...tarefas]
            .map((tarefa, i) => ({ tarefa, concluida: concluidas[i] }))
            .sort((a, b) => a.tarefa.localeCompare(b.tarefa));

            setTarefas(tarefasOrganizadas.map(item => item.tarefa));
            setConcluidas(tarefasOrganizadas.map(item => item.concluida));
        }

        setOrdemAa (!ordemAa);
    }

        //retorna o html da lista de tarefas
        return (
        <div class="divMae">
            <h2>Lista de Tarefas</h2>
            {/*input para adicionar uma tarefa*/}
            <input
                type = 'text'
                value = {novaTarefa}
                onChange = {(e) => setNovaTarefa(e.target.value)}
                placeholder = 'Digite uma nova tarefa'
                className='input-tarefa'
            />
            {/*botões para adicionar e ordenar as tarefas*/}
            <button onClick = {adicionarTarefa}>Adicionar</button>
            <button onClick = {ordenar}>Ordenar Aa ou Data</button>
            <ul>
                {tarefas.map((tarefa,indice) => (
                    <li key = {indice}>
                        {/*checkbox para marcar a tarefa como concluida*/}
                        <input
                            type="checkbox"
                            checked={concluidas[indice]}
                            onChange={() => alternarConcluida(indice)}
                        />
                        <span className={concluidas[indice] ? 'concluida' : ''}>
                        {/*se a tarefa for maior que 35 caracteres corta e adiciona tres pontinhos*/}
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