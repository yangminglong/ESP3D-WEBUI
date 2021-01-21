import { h } from 'preact';

export const capitalize = (s) => (typeof s === 'string') ? s.charAt(0).toUpperCase() + s.slice(1) : ''

export const getColClasses = ({ col, ...responsive }) => {
    const responsiveClasses =
        Object
            .keys(responsive)
            .reduce((acc, key, i) => i == 0 ? acc : `${acc} col-${key}-${responsive[key]}`, '')
    return `col-${col} ${responsiveClasses}`
}

/*
export const flattenNestedObjSchema = (arr) => {
    return Object.keys(arr).reduce((acc, cur) => {
        const element = arr[cur]
        if ('fields' in element) {
            const { fields, ...rest } = element
            return { ...acc, [cur]: { ...rest }, ...flattenNestedObjSchema(fields) }
        }
        return { ...acc, [cur]: { ...element } }
    }, {})
}
*/

export const generateUID = () => Math.random().toString(36).substr(2, 9)

export const removeEntriesByIDs = (src, uid) => (src.filter(({ id }) => !uid.includes(id)))

export const mergeFlatPrefToNestedSchema = (settings, schema) => {
    // console.log('mergeFlatPrefToNestedSchema', JSON.stringify(settings))
    // console.log('mergeFlatPrefToNestedSchema schema', JSON.stringify(schema))
    return Object.keys(schema).reduce((acc, key) => {
        if ('fields' in schema[key]) return {
            ...acc, [key]: {
                ...schema[key],
                value: settings[key],
                fields: mergeFlatPrefToNestedSchema(settings, schema[key].fields)
            }
        }
        return { ...acc, [key]: { ...schema[key], value: settings[key] } }
    }, { ...schema })
}

export const createComponent =
    (
        is,
        className,
        classModifier = {},
    ) =>
        ({
            is: Tag = is,
            class: c = '',
            id = '',
            ...props
        }) => {
            const splittedArgs = Object.keys(props)
                .reduce((acc, curr) => {
                    if (Object.keys(classModifier).includes(curr)) return { classes: [...acc.classes, classModifier[curr]], ...acc.props }
                    return { classes: [...acc.classes], props: { ...acc.props, [curr]: props[curr] } }
                }, { classes: [], props: {} })
            const classNames = `${className} ${splittedArgs.classes.join(' ')} ${c}`.trim()

            return <Tag class={classNames} id={id} {...splittedArgs.props} />
        }
