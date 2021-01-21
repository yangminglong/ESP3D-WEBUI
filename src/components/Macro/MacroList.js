import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Tile, Button } from '../../components/Spectre'
import { File, FileText, Folder, Play, Trash2 } from 'preact-feather';

const mockeFile = [
    { name: "Macro" },
    { name: "Macro" },
    { name: "Macro" },
    { name: "Macro" },
    { name: "Macro" },
]

const displayIcon = (id) => {
    switch (id) {
        case 0: return <Folder />; break;
        case 1: return <FileText />; break;
        default: return <File />; break;
    }

}

const MacroList = (macroSrc) => {
    const [macroList, setMacroList] = useState(mockeFile)

    useEffect(() => { }, [])
    return (
        macroList && macroList.map(macro => (
            <Tile centered>
                <Tile.Icon>{displayIcon(macro.type)}</Tile.Icon>
                <Tile.Content>
                    <Tile.Title>{macro.name}</Tile.Title>
                    <Tile.Subtitle>subtitle</Tile.Subtitle>
                </Tile.Content>
                <Tile.Action>
                    <Button action ><Play /></Button>
                </Tile.Action>
            </Tile>
        )
        )
    )
}

export default MacroList