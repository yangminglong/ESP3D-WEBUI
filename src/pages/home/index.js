import { h } from 'preact';
import { useQueuing } from '../../hooks/useQueuing'

const Home = () => {
	const {
		createNewRequest,
		abortRequest,
		data
	} = useQueuing()

	const addNewRequest = () => {
		createNewRequest(
			`http://slowwly.robertomurray.co.uk/delay/${3000}/url/https://jsonplaceholder.typicode.com/todos/1`,
			{ method: 'GET' },
			{
				onSuccess: result => console.log(result),
				onFail: error => console.log(error)
			}
		)
	}

	return (
		<div className="container">
			<h2>Home</h2>
			<p>This is the Home component.</p>
			<button onClick={addNewRequest}>Add request</button>
			<button onClick={abortRequest}>Abort XHR</button>
			<pre>
				<code>{data}</code>
			</pre>
		</div>
	)
}

export default Home
