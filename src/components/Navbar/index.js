import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from '../Router'

const defaultLinks = [
	{ label: 'About', href: '/about' },
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Settings', href: '/settings' },
]
const Navbar = () => {
	const [links, setLinks] = useState([...defaultLinks])
	return (
		<header class="navbar">
			<section class="navbar-section">
				<span className="navbar-brand mr-2">ESP<strong>3D</strong></span>
				{links && links.map(({ label, href }) =>
					<Link className="btn btn-link" activeClassName="active" href={href}>{label}</Link>)}
			</section>
		</header>)
}

export default Navbar;
