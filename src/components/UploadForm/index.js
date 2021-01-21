import { h } from 'preact'
import { useState, useRef, useEffect } from 'preact/hooks'
import { Upload } from 'preact-feather'
import { useQueuing } from '../../hooks/useQueuing'
import { Button, Progress } from '../Spectre'

/**
 * @todo add CSS on hover
 * @todo add CSS to hide input
 * @todo handle upload path
 * @todo * handle multiple file
 * @todo handle progress upload
 * @todo close modal
 * @todo refresh list
 * @todo refresh list
 */

const UploadForm = ({ currentPath }) => {
    const { createNewRequest, abortRequest, data } = useQueuing()
    const [selectedFiles, setSelectedFiles] = useState([])
    const [errorMessage, setErrorMessage] = useState()
    const [progressionList, setProgressionList] = useState()
    const fileInputRef = useRef()
    const dropzoneRef = useRef()

    const dragOver = (e) => {
        e.preventDefault()
    }

    const dragEnter = (e) => {
        e.preventDefault()
        console.log('dragEnter')
        dropzoneRef.current.classList.toggle("active")

    }

    const dragLeave = (e) => {
        e.preventDefault()
        console.log('dragLeave')
        dropzoneRef.current.classList.toggle("active")
    }

    const fileDrop = (e) => {
        e.preventDefault()
        dropzoneRef.current.classList.toggle("active")
        const files = e.dataTransfer.files
        // console.log(files)
        if (files.length) {
            handleFiles(files)
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        const foo = [...files].reduce((acc, curr, i) => {
            return [...acc, { file: curr, progress: 0 }]
        }, [])
        console.log('foo', foo)
        setSelectedFiles([...selectedFiles, ...foo])
        /* for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                // add to an array so we can display the name of file
                console.log(files[i])
                setSelectedFiles([...selectedFiles, files[i]]) // add to the same array so we can display the name of the file
            } else {
                files[i]['invalid'] = true; // add a new property called invalid
                alert('File type not permitted') // set error message
            }
        } */
    }

    const validateFile = (file) => {
        // const validTypes = ['text/plain', 'text/csv', 'image/png', 'image/gif', 'image/x-icon'];
        // if (validTypes.indexOf(file.type) === -1) {
        //     return false;
        // }
        return true;
    }
    const handleProgress = (i, e) => {
        const newSelectedFiles = [...selectedFiles.slice(0, i), { file: selectedFiles[i].file, progress: e }, ...selectedFiles.slice(i + 1)];
        setSelectedFiles(newSelectedFiles)
        console.log(`${i} progress : ${e}`)
    }


    const uploadFiles = () => {
        for (let i = 0; i < selectedFiles.length; i++) {
            const formData = new FormData()
            formData.append('myfile', selectedFiles[i].file);
            createNewRequest(
                `http://localhost:8080/files?path=${encodeURIComponent(currentPath)}&action=list&PAGEID=3`,
                {
                    method: 'POST',
                    body: formData
                },
                {
                    onSuccess: result => { console.log(result) },
                    onFail: error => {
                        // setIsLoading(false)
                        // setFileList()
                        // toasts.addToast({ content: error, type: 'error' })

                    },
                    onProgress: (e) => { handleProgress(i, e) }
                }
            )
        }
    }

    return (
        <div class="upload-wrapper">
            <div className="drag-drop-zone"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                onClick={fileInputClicked}
                ref={dropzoneRef}
            >
                <div className="content">
                    <Upload />
                    <p>
                        Drag and drop here or click to browse
                    </p>
                </div>

            </div>
            <input
                ref={fileInputRef}
                className="file-input"
                type="file"
                multiple
                onChange={filesSelected}
            />
            <p className="upload-path">Uploading path : {currentPath}</p>
            <div className="upload-list">
                <ul>
                    {
                        selectedFiles.map((data, i) => {
                            const { name, size } = data.file
                            return (
                                <li key={`upload-list-${i}`}>
                                    {name} - { size} <Progress value={data.progress} max={100} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Button onClick={() => uploadFiles()}>Upload</Button>
        </div>
    )
}

export { UploadForm }