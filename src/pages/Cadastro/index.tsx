import BarraLateral from '../../containers/BarraLateral'
import Formulario from '../../containers/Formulario'

const Cadastro = () => {
  return (
    // BarraLateral
    <>
      <BarraLateral mostrarFiltros={false} />
      <Formulario />
    </>
  )
}

export default Cadastro
