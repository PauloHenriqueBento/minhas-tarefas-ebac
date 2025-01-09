import { useDispatch } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'

import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'

import * as S from './styles'
import TarefaClass from '../../models/Tarefa'
import { Botao, BotaoSalvar } from '../../styles'

import * as enums from '../../utils/enums/Tarefas'

type Props = TarefaClass

const Tarefa = ({
  titulo,
  descricao: descricaoOriginal,
  prioridade,
  status,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    setDescricao(descricaoOriginal)
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(alteraStatus({ id, finalizado: evento.target.checked }))
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          onChange={alteraStatusTarefa}
          checked={status === enums.Status.CONCLUIDA}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag $prioridade={prioridade} $parametro="prioridade">
        {prioridade}
      </S.Tag>
      <S.Tag $status={status} $parametro="status">
        {status}
      </S.Tag>
      <S.Descricao
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        disabled={!estaEditando}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    id,
                    titulo,
                    status,
                    prioridade
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.botaoCancelarRemover onClick={() => cancelarEdicao()}>
              Cancelar
            </S.botaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.botaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.botaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
