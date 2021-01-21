import { h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import { Loading } from '../../components/Spectre'
import { Router, Breadcrumbs } from '../../components/Router';
import { Filter } from './Filter'
import { capitalize } from '../../utils'

import panelList from './PanelList-APP_TARGET'

const Dashboard = () => {
	const [activePanels, setActivePanels] = useState({ ...panelList })
	const [isLoading, setIsLoading] = useState(true)

	const handleCheck = (a) => {
		if (a.target.checked === false) removePanel(a.target.value)
		else { addPanel(a.target.value) }
	}

	const addPanel = (id) => {
		setActivePanels({ ...activePanels, [id]: panelList[id] })
	}

	const removePanel = (id) => {
		const { [id]: value, ...rest } = activePanels
		setActivePanels({ ...rest })
	}

	useEffect(() => {
		setIsLoading(false)
	}, [activePanels])

	return (
		<div id="dashboard" className="container">
			<h2>Dashboard</h2>
			{isLoading && <Loading large />}
			{!isLoading && <div className="filter-wrapper mb-2">
				<Filter
					items={panelList}
					activePanels={Object.keys(activePanels)}
					action={handleCheck} />
			</div>}
			{!isLoading && <div className="columns">
				{activePanels && Object.keys(activePanels).map(panelKey => {
					const { comp } = activePanels[panelKey]
					const DashboardPanel = comp
					return (
						<div key={panelKey} className="column col-sm-12 cold-md-6 col-lg-6 col-xl-6 col-4 mb-2">
							<DashboardPanel title={capitalize(panelKey)} />
						</div>)
				})}
			</div>}
		</div>
	)
};

const routes = {
	DEFAULT: {
		component: <Dashboard />,
		path: '/dashboard',
	},
	temperatures: {
		component: panelList.temperatures.comp,
		path: '/dashboard/temperatures',
	},
	extrusion: {
		component: panelList.extrusion.comp,
		path: '/dashboard/extrusion',
	},
	files: {
		component: panelList.files.comp,
		path: '/dashboard/files',
	},
}

const DashboardWrapper = () => {
	return (<div id="dashboard" className="container">
		<Breadcrumbs />
		<Router routes={routes} />
	</div>)
}

export default DashboardWrapper;
