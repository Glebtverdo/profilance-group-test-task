import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { deleteNews, makeSubmited } from "../../store/slicers/dataSlicer";
import ReactDOM from 'react-dom';
import ModalNewNews from "../modal/modalNewNews";
import "./news.sass"

const portal = document.getElementById("portal") as HTMLElement

export default function News(){
  const {data} = useSelector((state: RootState) => state.dataReducer);
  const {isAdmin, isLoggedIn} = useSelector((state: RootState) => state.usersReducer)
  const dispatcher = useDispatch();
  const [showNewsToSubmit, setShowNewsToSubmit] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchData = searchValue === "" ? data.filter(el => showNewsToSubmit ? !el.isSubmited : el.isSubmited ) :
    data.filter(el => (showNewsToSubmit ? !el.isSubmited : el.isSubmited) 
      && el.name.indexOf(searchValue) === 0);
  
  const toggleShowModal = () => {
    setShowModal(!showModal);
  }

  const delet = (id : number) => {
    setIsLoading(true);
    dispatcher(deleteNews(id));
    setIsLoading(false);
  }

  const submit = (id:number) => {
    dispatcher(makeSubmited(id))
  }

  const toggleShowNewsToSubmit = () => {
    setShowNewsToSubmit(!showNewsToSubmit);
  }

  return <>
   <div className="news">
    <p>Поиск</p>
    <input value={searchValue} onChange={e => {setSearchValue(e.target.value)}}/>
    <div className="new__buttons_container">
      { isAdmin && <button onClick={toggleShowNewsToSubmit}> Утвердить новости </button>}
      { isLoggedIn && <button onClick={toggleShowModal}> Добавить новость</button>}
    </div>
    {searchData.map(el => {
        return <div key={el.id} className="news__container">
          <div className="news__title">
            <p>{el.name}</p>
            <p>{el.date}</p>
          </div>
          <p className="news__content">{el.text}</p>
          { isAdmin && <div className="new__buttons_container">
            <button onClick={() => delet(el.id)}
            disabled={isLoading}
            className="news__buttons button_color_red"> Удалить </button>
            { showNewsToSubmit && <button onClick={() => submit(el.id)}
            disabled={isLoading}
            className="news__buttons button_color_green"> Утвердить </button>}
          </div>
          }
        </div>
      })
    }
  </div>
  {ReactDOM.createPortal( <ModalNewNews showModal={showModal} toggleShowModal={toggleShowModal}/> , portal)}
  </>
}