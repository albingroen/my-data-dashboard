import { h, Component } from "preact";
import { Link } from "preact-router";
import style from "./style.less";

export default class Header extends Component {
	render() {
		return (
			<footer>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://clearbit.com"
				>
					Logos provided by Clearbit™
				</a>
			</footer>
		);
	}
}
