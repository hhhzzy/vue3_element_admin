import Cookie from 'js-cookie'

// token
const tokenKey = 'hzy_vue3_element_token'
export const getToken = () => Cookie.get(tokenKey)
export const setToken = (token: string) => Cookie.set(tokenKey, token)
export const removeToken = () => Cookie.remove(tokenKey)

// set cookie
export const setCookie = (key: string, value: string) => Cookie.set(key, value)
export const getCookie = (key: string) => Cookie.get(key)

// set system style
const sysColorKey = 'elColorPrimary'
const menuColorKey = 'elMenuColor'
export const setSysColor = (value: string) => Cookie.set(sysColorKey, value)
export const getSysColor = (): string => Cookie.get(sysColorKey) || ''
export const setMenuColor = (value: string) => Cookie.set(menuColorKey, value)
export const getMenuColor = (): string => Cookie.get(menuColorKey) || ''
