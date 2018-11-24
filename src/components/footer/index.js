import { h, Component } from "preact";
import { Link } from "preact-router";
import style from "./style.less";

export default class Header extends Component {
	render() {
		return (
			<footer>
				<p>This website is only used for demonstration purposes</p>
				<p>Made during hackjunction 2018</p>
			</footer>
		);
	}
}
