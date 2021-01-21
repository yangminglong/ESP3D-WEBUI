import { h, Fragment, createContext } from 'preact';
import { useState, useEffect, useCallback, useContext } from 'preact/hooks'
import { Loading, Breadcrumb } from '../../components/Spectre'

const RouterContext = createContext()
RouterContext.displayName = 'RouterContext'

const RouterProvider = ({ children }) => {
    const [activeRoute, setActiveRoute] = useState('/')
    const [routes, setRoutes] = useState({})
    return (
        <RouterContext.Provider value={{
            activeRoute,
            setActiveRoute,
            routes,
            setRoutes
        }}>
            {children}
        </RouterContext.Provider>
    )
}

const parseLocation = () => (typeof window !== "undefined") ? location.hash.slice(1).toLowerCase() : '/'

const Router = ({ children, routes }) => {
    // const [ActiveRoute, setActiveRoute] = useState(parseLocation)
    const [isLoading, setIsLoading] = useState(true)
    const routerContext = useContext(RouterContext)
    const [ActiveComponent, setActiveComponent] = useState(routes.DEFAULT.component)

    const handleHashChange = useCallback(() => {
        setActiveRouteAndComp()
        console.log('hash changed')
    }, [])

    const setActiveRouteAndComp = () => {
        setIsLoading(true)
        const location = parseLocation().split('/')
        for (let i = 0; i < location.length; i++) {
            const subLocation = location.slice(0, i + 1).join('/')
            for (const key in routes) {
                if (Object.prototype.hasOwnProperty.call(routes, key)) {
                    const element = routes[key]
                    if (element.path === subLocation) {
                        console.log()
                        routerContext.setActiveRoute(element.path)
                        setActiveComponent(element.component)
                        setIsLoading(false)
                        break
                    }
                }
            }
        }
    }
    useEffect(() => {
        routerContext.setRoutes({ ...routerContext.routes, ...routes })
        setActiveRouteAndComp()

    }, [])

    useEffect(() => {
        setActiveRouteAndComp()
        // console.log(routerContext.activeRoute)
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [handleHashChange, routerContext.activeRoute])

    return (
        isLoading ? (<Loading large />) : (
            <Fragment>
                {ActiveComponent}
                {children}
            </Fragment>)

    )
}

const Breadcrumbs = () => {
    const [breadcrumbs, setBreadcrumbs] = useState()
    const { activeRoute } = useContext(RouterContext)

    useEffect(() => {
        let crumbs = activeRoute.split('/').reduce(
            (acc, curr) => ({ "crumbs": [...acc.crumbs, { name: curr, path: [...acc.globalPath, curr].join('/') }], "globalPath": [...acc.globalPath, curr] }),
            { crumbs: [], globalPath: [] })
        crumbs.crumbs[0] = { name: "home", path: "/" }
        setBreadcrumbs(crumbs.crumbs)
    }, [activeRoute])

    return (
        breadcrumbs && <Breadcrumb>
            {breadcrumbs.map(crumb =>
                <Breadcrumb.Item>
                    <a href={`#${crumb.path}`}>{crumb.name}</a>
                </Breadcrumb.Item>)}
        </Breadcrumb>)
}

/**
 * @todo handle activeClassName
 **/
const Link = ({ activeClassName = '', className = '', href, children, ...rest }) => {
    const { activeRoute } = useContext(RouterContext)
    const [mergedClassName, setMergedClassName] = useState()

    useEffect(() => {
        setMergedClassName((activeRoute === href) ? `${className} ${activeClassName}` : className)
    }, [activeRoute])

    return mergedClassName && <a href={`#${href}`} className={mergedClassName} {...rest}> {children}</a>
}

export { Router, RouterProvider, Link, Breadcrumbs }