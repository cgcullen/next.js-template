import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks"
import {
  HELLO,
  LOGIN,
  LOGOUT,
  GET_USER,
  GET_USERS,
  REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CHANGE_ROLE,
  DELETE_USER,
} from "@/apollo/queries"

export const useHello = (id) => useQuery(HELLO, { variables: { id } })
export const useRegister = () => useMutation(REGISTER)
export const useLogin = () =>
  useMutation(LOGIN, {
    update(cache, { data: { logIn: loggedInUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: loggedInUser },
      })
    },
  })
export const useLogout = () => useMutation(LOGOUT)
export const useLazyGetUser = () => useLazyQuery(GET_USER)
export const useGetUser = () => useQuery(GET_USER)
export const useForgotPassword = () => useMutation(FORGOT_PASSWORD)
export const useResetPassword = () => useMutation(RESET_PASSWORD)
export const useGetUsers = () => useQuery(GET_USERS)
export const useChangeRole = () =>
  useMutation(CHANGE_ROLE, {
    update(cache, { data: { changeRole } }) {
      const { users } = cache.readQuery({ query: GET_USERS })
      const index = users.findIndex((element) => element.id == changeRole.id)
      users[index] = { ...users[index], role: changeRole.role }
      cache.writeQuery({
        query: GET_USERS,
        data: { users },
      })
    },
  })
export const useDeleteUser = () =>
  useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS })
      const index = users.findIndex((element) => element.id == deleteUser)
      users.splice(index, 1)
      cache.writeQuery({
        query: GET_USERS,
        data: { users },
      })
    },
  })
