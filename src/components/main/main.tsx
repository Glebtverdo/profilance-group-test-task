import { useSelector } from "react-redux"
import { RootState } from "../../store"

export default function MainScreen(){
  const {isLoggedIn} = useSelector((state: RootState) => state.usersReducer);
  const login = isLoggedIn ? isLoggedIn.login : "Гость"

  return <h2>
    {"Привет " + login}
  </h2>

}