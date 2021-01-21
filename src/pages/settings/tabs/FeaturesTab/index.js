/**
 * @todo Add validation
 * @todo Add data fetch
 * @todo Add data submitting
 */

import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { Field } from '../../../../components/Form/Field'
import { Loading } from '../../../../components/Spectre'
import { settingsFormatter, settingsState } from './settingsFormatter'
import { useQueuing } from '../../../../hooks/useQueuing'
import useUI from '../../../../hooks/useUi'


const FeaturesTab = () => {
    const { modals, toasts } = useUI()
    const { createNewRequest } = useQueuing()
    const [formState, setFormState] = useState()
    const [sectionsStructure, setSectionsStructure] = useState()
    const [updatableSettingsState, setUpdatableSettingsState] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    // const sectionsStructure = settingsFormatter(Settings)

    const handleValidation = (id, value) => { }

    const handleSubmit = (values) => { }

    const handleChange = (e) => {
        const { name, value } = e.target
        const isValid = true //for dev purpose, handeValidation todo
        const validation = { valid: isValid, message: 'test message' }
        const newValue = { [name]: { ...formState[name], value: value, validation } }
        setFormState({ ...formState, ...newValue })
        if (isValid.valid) setUpdatableSettingsState({ ...updatableSettingsState, [name]: value })
    }

    const saveFeaturesSettings = (updatedSettings) => {
        //[ESP401]P=329 T=B V=0&PAGEID=5
    }

    useEffect(() => {
        createNewRequest(
            `http://localhost:8080/command?cmd=${encodeURIComponent('[ESP400]')}`,
            { method: 'GET' },
            {
                onSuccess: result => {
                    const jsonResult = JSON.parse(result)
                    setSectionsStructure(settingsFormatter(jsonResult['Settings']))
                    setFormState(settingsState(jsonResult['Settings']))
                    setIsLoading(false)
                },
                onFail: error => {
                    setIsLoading(false)
                    toasts.addToast({ content: error, type: 'error' })
                },
            }
        )

        // console.log('updatableSettingsState', updatableSettingsState) //for dev purpose, handeValidation todo
    }, [])

    return (
        <div id="featuresSettingsPanel">
            {isLoading && <Loading large />}
            {!isLoading && sectionsStructure && <form className="form-horizontal ">
                {
                    Object.keys(sectionsStructure).map(sectionId => {
                        const section = sectionsStructure[sectionId]
                        return (
                            <div id={sectionId} key={sectionId} class="">
                                <h3>{sectionId}</h3>
                                <div class="columns">
                                    {Object.keys(section).map(subsectionId => {
                                        const subSection = section[subsectionId]
                                        return (
                                            <div className="column col-sm-12 col-md-6 col-4 mb-2">
                                                <div class="panel p-2 mb-2 ">
                                                    <div class="panel-header">
                                                        <div class="panel-title">
                                                            <h4>{subsectionId}</h4>
                                                        </div>
                                                    </div>
                                                    <div class="panel-body">
                                                        {subSection.map(
                                                            fieldId => {
                                                                {/* console.log({ ...formState[fieldId] }) */ }
                                                                return (<Field
                                                                    {...formState[fieldId]}
                                                                    horizontal
                                                                    onChange={(e) => { handleChange(e) }}
                                                                />)
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    })}</div>

                            </div>
                        )
                    })
                }
            </form>}
        </div>
    )
}

export default FeaturesTab