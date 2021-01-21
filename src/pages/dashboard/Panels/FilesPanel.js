import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Upload, RefreshCcw, Home } from 'preact-feather';
import { Panel, Menu, Button, Loading, Progress, Breadcrumb } from '../../../components/Spectre'
import FileList from '../../../components/FileList'
import PanelDropdownMenu from '../../../components/PanelDropdownMenu'
import { useQueuing } from '../../../hooks/useQueuing'
import useUi from '../../../hooks/useUi'
import { UploadForm } from '../../../components/UploadForm'

const parseFileSizeString = (sizeString) => {
    const [size, unit] = sizeString.split(' ')
    const parsedSize = parseFloat(size)
    switch (unit) {
        case 'B': return parsedSize;
        case 'KB': return parsedSize * 1e3;
        case 'MB': return parsedSize * 1e6;
        case 'GB': return parsedSize * 1e9;
        case 'TB': return parsedSize * 1e12;
        default: return undefined;
    }
}

const FilesPanel = ({ title }) => {
    const { modals, toasts } = useUi()
    const { createNewRequest, abortRequest, data } = useQueuing()
    const [currentPath, setCurrentPath] = useState('/')
    const [fileList, setFileList] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const removeFile = (fullpath, isFile = true) => {
        const splittedPath = fullpath.split('/')
        const filename = splittedPath[splittedPath.length - 1];
        const path = splittedPath.slice(0, splittedPath.length - 1).join('/');
        createNewRequest(
            `http://localhost:8080/files?path=${encodeURIComponent(path)}&action=${(isFile) ? 'delete' : 'deletedir'}&filename=${filename}`,
            { method: 'GET' },
            {
                onSuccess: result => { displayFileList(result) },
                onFail: error => {
                    setIsLoading(false)
                    setFileList()
                    toasts.addToast({ content: error, type: 'error' })
                }
            }
        )
    }

    const BrowserBreadcrumb = () => {
        const breadcrum = [...currentPath.split('/').slice(0, -1)]
            .reduce((acc, curr, i, arr) => {
                const newCrumb = {
                    label: curr,
                    path: (curr !== '') ? [...arr.slice(0, i), curr, ''].join('/') : '/',
                }
                return [...acc, newCrumb]
            }, [])

        return (
            <Breadcrumb> {
                breadcrum.map(crumb => {
                    const { label, path } = crumb
                    return (
                        <Breadcrumb.Item onClick={e => { e.preventDefault(); setCurrentPath(path) }}>
                            <a href={path}>{label || <Home size={16} />}</a>
                        </Breadcrumb.Item>)
                })
            } </Breadcrumb>
        )
    }

    const displayFileList = (result) => {
        setFileList(JSON.parse(result))
        setIsLoading(false)
    }

    const getFileList = (path) => {
        setIsLoading(true)
        createNewRequest(
            `http://localhost:8080/files?path=${encodeURIComponent(path)}&action=list`,
            { method: 'GET' },
            {
                onSuccess: result => { displayFileList(result) },
                onFail: error => {
                    setIsLoading(false)
                    setFileList()
                    toasts.addToast({ content: error, type: 'error' })
                }
            }
        )
        setCurrentPath(path)
    }

    useEffect(() => {
        getFileList(currentPath)
    }, [currentPath])

    return (
        <Panel>
            <Panel.Header>
                <Panel.Title class="h5">{title}
                    <PanelDropdownMenu>
                        <Menu.Item>
                            <Button link block onClick={() => { getFileList(currentPath) }}><RefreshCcw size={16} /> Refresh</Button>
                        </Menu.Item>
                        {fileList && <Menu.Item>
                            <Button link block onClick={() => {
                                modals.addModal({
                                    title: 'Upload new file',
                                    content: <UploadForm currentPath={currentPath} />,
                                })
                            }}><Upload size={16} /> Upload</Button>
                        </Menu.Item>}
                    </PanelDropdownMenu>
                </Panel.Title>
            </Panel.Header>
            <Panel.Nav>
            </Panel.Nav>
            <Panel.Body>
                {isLoading && <Loading lg />}
                {fileList && (
                    <Fragment>
                        <BrowserBreadcrumb />
                        <FileList
                            files={fileList.files}
                            getFileList={setCurrentPath}
                            removeFile={removeFile}
                            currentPath={currentPath} />
                    </Fragment>
                )}
            </Panel.Body>
            <Panel.Footer>
                <div className="text-muted text-small text-center">{fileList && `${fileList.used} / ${fileList.total}`}</div>
                {fileList && <Progress value={Math.round(parseFileSizeString(fileList.used))} max={Math.round(parseFileSizeString(fileList.total))} />}
            </Panel.Footer>
        </Panel>
    )
}

export default FilesPanel