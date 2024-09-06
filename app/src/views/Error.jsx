import { useState } from 'react'
import { Header } from '../components/index.js'

export default function Error() {
    const [search, setSearch] = useState(true)

    return <>
        <Header search={search}/>

        <div className="site-header contenedor separador">
            <h2>404 Página no Encontrada</h2>
            <p className="tagline">¡Ups! Algo ha fallado... Inténtalo de nuevo más tarde</p>
        </div>
    </>
}