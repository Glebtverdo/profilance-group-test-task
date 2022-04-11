import { useState } from "react"
import Logo from "../logo"
import ModalReg from "../modal/modalReg";
import ReactDOM from 'react-dom';
import "./header.sass"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logOut } from "../../store/slicers/usersSlicer";

const portal = document.getElementById("portal") as HTMLElement

export default function Header(){
  const [showModal, setShowModal] = useState(false);
  const {isLoggedIn} = useSelector((state: RootState) => state.usersReducer);
  const logInOrLogOutText = isLoggedIn ? "Выход" : "Вход"
  const dispatch = useDispatch()
  
  const toggleShowModal = () => {
    setShowModal(!showModal);
  }

  const logInOrLogOut = () => {
    if(!isLoggedIn)
    {
      toggleShowModal()
    }
    else
    {
      dispatch(logOut(null))
    }
  }

  return (<>
    <div className="header header_dark">
      <NavLink to="./">
        <Logo />
      </NavLink>
      <div className="header__nav_menu">
        <NavLink style={{color: "#f7f0ed"}} to="./news" className="header__nav_button header__nav_button_no_decoration">
          Новости
        </NavLink>
        <div className="header__nav_button" onClick={logInOrLogOut}>
          {logInOrLogOutText}
        </div>
      </div>
    </div>
    {ReactDOM.createPortal( <ModalReg showModal={showModal} toggleShowModal={toggleShowModal}/> , portal)}
  </>
  )
}