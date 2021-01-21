import { h } from 'preact'
import { useContext } from 'preact/hooks'
import { WsContext } from '../contexts/WsContext'

export const useWS = () => useContext(WsContext)