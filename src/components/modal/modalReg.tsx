import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react"
import {logIn} from "../../store/slicers/usersSlicer"
import "./modal.sass"
import { RootState } from "../../store";

export default function ModalReg(params: {showModal: boolean, toggleShowModal: () => void}) {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {users} = useSelector((state: RootState) => state.usersReducer);
  const dispatch = useDispatch();
  const {showModal, toggleShowModal} = params;
  const mainDivClasses = showModal ? "modal__fixed" : "modal__none"

  useEffect(() => {
    setLoginValue("")
    setPasswordValue("")
  }, [showModal])

  const makeAuth = () => {
    setIsLoading(true);
    const user = users.filter(el => el.login === loginValue);
    if (user.length !== 0)
    {
      if(user[0].password === passwordValue){
        dispatch(logIn(user[0]));
        toggleShowModal();
      }
      else
      {
        alert("Ошибка неверный пароль");
      }
    }
    else
    {
      alert("Ошибка неверный логин");
    }
    setIsLoading(false);
  }

  return(
    <div className={"modal " + mainDivClasses}>
      <div className="modal__background"></div>
      <div className="modal__container">
        <p className="modal__text">Логин:</p>
        <input onChange={e => setLoginValue(e.target.value)} value={loginValue}
        disabled={isLoading}/>
        <p className="modal__text">Пароль:</p>
        <input onChange={e => setPasswordValue(e.target.value)} value={passwordValue}
        disabled={isLoading}/>
        <button disabled={isLoading} onClick={makeAuth}>Вход</button>
      </div>
    </div>
  )
}