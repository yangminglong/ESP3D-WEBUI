import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { Tile, Button, Menu } from '../../components/Spectre'
import { File, FileText, Folder, MoreVertical, Trash2, Download, Play } from 'preact-feather';

const detectType = (entry) => {
    if (entry.size === '-1') return 0
    if (/\.(gcode|nc)$/i.test(entry.name)) return 1
    return 2
}

const FileDropDown = ({ children, remove }) => {
    const fileDropDownMenu = useRef()
    return (
        <div class="dropdown dropdown-right" ref={fileDropDownMenu}>
            <Button class="dropdown-toggle" action link onClick={() => fileDropDownMenu.current.focus()}><MoreVertical /></Button>
            <Menu>
                {children}
                <Menu.Item><Button link block><Download size={16} /> Download</Button></Menu.Item>
                <Menu.Item><Button link block onClick={() => { remove() }}><Trash2 size={16} /> Delete</Button></Menu.Item>
            </Menu>
        </div>
    )
}

const FileItem = ({ item, remove }) => (
    <Tile centered>
        <Tile.Icon class="text-muted"><File size={32} /></Tile.Icon>
        <Tile.Content>
            <Tile.Title>{item.name}</Tile.Title>
            <Tile.Subtitle><small class="text-gray">{item.size}</small></Tile.Subtitle>
        </Tile.Content>
        <Tile.Action>
            <FileDropDown remove={remove} />
        </Tile.Action>
    </Tile>)

const GcodeFileItem = ({ item, remove }) => (
    <Tile className="folder" centered >
        <Tile.Icon class="text-muted"><FileText size={32} /></Tile.Icon>
        <Tile.Content>
            <Tile.Title>{item.name}</Tile.Title>
            <Tile.Subtitle><small class="text-gray">{item.size}</small></Tile.Subtitle>
        </Tile.Content>
        <Tile.Action>
            <FileDropDown remove={remove}>
                <Menu.Item><Button link block><Play size={16} /> Run</Button></Menu.Item>
            </FileDropDown>
        </Tile.Action>
    </Tile>
)

const FolderItem = ({ item, openFolder, remove }) => (
    <Tile centered>
        <Tile.Icon class="text-muted" onClick={openFolder}><Folder size={32} /></Tile.Icon>
        <Tile.Content onClick={openFolder}>
            <Tile.Title>/{item.name}</Tile.Title>
        </Tile.Content>
        <Tile.Action>
            <FileDropDown remove={remove} />
        </Tile.Action>
    </Tile>
)

const FileList = ({ files, getFileList, removeFile, currentPath }) => {
    const getPath = (filename) => {
        const result = [...currentPath.split('/').filter(entry => entry !== ''), filename].join('/')
        console.log(result)
        return result
    }
    return (
        <div className="file-list">
            {files && files.map(file => {
                const fileType = detectType(file)
                switch (fileType) {
                    case 0: return <FolderItem
                        item={file}
                        openFolder={() => { getFileList(`${currentPath}${file.name}/`) }}
                        getFileList={getFileList}
                        remove={() => {
                            removeFile(`${currentPath}${file.name}`, false)
                        }} />
                    case 1: return <GcodeFileItem
                        item={file}
                        getFileList={getFileList}
                        remove={() => {
                            removeFile(`${currentPath}${file.name}`)
                        }} />
                    default: return <FileItem
                        item={file}
                        getFileList={getFileList}
                        remove={() => {
                            removeFile(`${currentPath}${file.name}`)
                        }} />
                }
            })}
        </div>
    )
}

export default FileList