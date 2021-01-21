import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import useESP3D from './useESP3D'
import { useWS } from './useWS'

const addFileTypeProp = (entry) => {
    let type = 'file'
    if (/\.(gcode|nc|gco)$/i.test(entry.name)) type = 'gcode'
    if (entry.size === -1 || entry.name.startsWith('/')) type = 'folder'
    return { ...entry, type }
}

const useStorageSystem = () => {
    const [currentStorageSys, setCurrentStorageSys] = useState()
    const { parsedValues } = useWS()
    const [fileList, setFileList] = useState()
    const [capacity, setCapacity] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const updateFileList = (source) => {
        setFileList(source.map(file => addFileTypeProp(file)))
        setIsLoading(false)
    }

    const {
        getListSD,
        getEspFsList
    } = useESP3D()

    const list = [
        // {
        //     name: 'FAKE',
        //     actions: {
        //         upload: ()=>{},
        //         download: ()=>{},
        //         print: ()=>{},
        //         remove: ()=>{},
        //         mkdir: ()=>{},
        //         rmdir: ()=>{}
        //     }
        // },
        {
            id: 'ESP3DFS',
            name: 'ESP3D FS',
            actions: {
                list: async () => {
                    setIsLoading(true)
                    const resp = await getEspFsList();
                    const { files, total, used } = JSON.parse(resp)
                    updateFileList(files)
                    setCapacity({ total, used })
                },
                upload: () => { },
                download: () => { },
                remove: () => { },
                mkdir: () => { },
                rmdir: () => { }
            },
        },
        {
            id: "PRINTERSD",
            name: 'PRINTER SD',
            actions: {
                list: () => {
                    setIsLoading(true);
                    getListSD()
                    setCapacity()
                },
                upload: () => { },
                download: () => { },
                print: () => { },
                remove: () => { },
                mkdir: () => { },
                rmdir: () => { }
            }
        },
        {
            id: "TFTUSB",
            name: 'TFT USB',
            actions: {
                list: () => { updateFileList([]) },
                print: () => { }
            },
        },
    ]

    const systemListSelectOpt = list.map(({ id, name }, key) => ({ id, value: key, label: name }))

    const updateCurrentStorageSys = (id) => {
        list[id].actions.list()
        setCurrentStorageSys(list[id])
    }

    useEffect(() => {
        setCurrentStorageSys(list[0])
    }, [])


    useEffect(() => {
        updateFileList(parsedValues.files)
    }, [parsedValues.files])

    return {
        currentStorageSys,
        updateCurrentStorageSys,
        systemListSelectOpt,
        fileList,
        capacity,
        isLoading,
    }
}

export default useStorageSystem