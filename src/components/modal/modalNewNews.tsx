import { useDispatch} from "react-redux";
import { useState } from "react"
import { addNews } from "../../store/slicers/dataSlicer";
import "./modal.sass"

export default function ModalNewNews(params: {showModal: boolean, toggleShowModal: () => void}) {
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {showModal, toggleShowModal} = params;
  const mainDivClasses = showModal ? "modal__fixed" : "modal__none"

  const createNews = () => {
    setIsLoading(true);
    if(titleValue !== "" && textValue !== ""){
      const date = new Date();
      dispatch(addNews({name: titleValue, text: textValue, date: date.toDateString()}));
      toggleShowModal();
    }
    else
    {
      alert("Заполните поля")
    }
    setIsLoading(false);
  }

  return(
    <div className={"modal " + mainDivClasses}>
      <div className="modal__background" onClick={toggleShowModal}></div>
      <div className="modal__container">
        <p className="modal__text">Заголовок : </p>
        <input onChange={e => setTitleValue(e.target.value)} value={titleValue}
        disabled={isLoading}/>
        <p className="modal__text">Текст :</p>
        <input onChange={e => setTextValue(e.target.value)} value={textValue}
        disabled={isLoading}/>
        <button disabled={isLoading} onClick={createNews}>Создать новость</button>
      </div>
    </div>
  )
}