import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import DebugLogProvider from 'preact-usedebuglog'
import { Router, RouterProvider } from '../Router'
import WsContextProvider from '../../contexts/WsContext'
import UiContextProvider from '../../contexts/UiContext'
import QueueingContextProvider from '../../contexts/QueueingContext'
import SettingsContextProvider from '../../contexts/SettingsContext'
import { TranslateContextProvider, useTranslateContext } from '../../components/Translate'
import Navbar from '../Navbar';
import { ToastsContainer } from '../Toast';
import { Modal } from '../Modal';
import Home from '../../pages/home';
import About from '../../pages/about';
import Dashboard from '../../pages/dashboard';
import Settings from '../../pages/settings';

const routes = {
    DEFAULT: {
        component: <Home />,
        path: '/',
    },
    HOME: {
        component: <Home />,
        path: '/',
    },
    DASHBOARD: {
        component: <Dashboard />,
        path: '/dashboard',
    },
    ABOUT: {
        component: <About />,
        path: '/about',
    },
    SETTINGS: {
        component: <Settings />,
        path: '/settings',
    },
}

const App = () => {
    return (
        <div id="app">
        <DebugLogProvider dev>
            <WsContextProvider>
                <RouterProvider>
                    <QueueingContextProvider>
                        <TranslateContextProvider>
                            <UiContextProvider>
                                <SettingsContextProvider>
                                    <ToastsContainer />
                                    <Modal />
                                    <Navbar />
                                    <div id="main-container">
                                        <Router routes={routes} />
                                    </div>
                                </SettingsContextProvider>
                            </UiContextProvider>
                        </TranslateContextProvider>
                    </QueueingContextProvider>
                </RouterProvider>
            </WsContextProvider>
        </DebugLogProvider>
        </div>
    )
}

export { App }
