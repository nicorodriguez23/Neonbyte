import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Header = () => {
  const navigate = useNavigate()
  const [usuarioLogueado, setUsuarioLogueado] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setUsuarioLogueado(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    setUsuarioLogueado(false)
    navigate("/login")
  }


}

export default Header
