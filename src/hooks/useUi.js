import { useState, useEffect, useContext, useRef } from 'preact/hooks'
import { UiContext } from '../contexts/UiContext'

const useUi = () => {
    return useContext(UiContext)
}

export default useUi