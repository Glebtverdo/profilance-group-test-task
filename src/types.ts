export type dataItemType = 
{
  id: number,
  name: string,
  text: string,
  isSubmited: boolean,
  date: string
}

export type dataItemForCreateType = 
{
  name: string,
  text: string,
  date: string
}

export type userType =
{
  id: number,
  login: string,
  isAdmin: boolean,
  password: string,
}

export type usersSlicerStateType = {
  users: userType[],
  isLoggedIn: userType | false,
  isAdmin: boolean
}