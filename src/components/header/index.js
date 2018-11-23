import { h, Component } from "preact";
import axios from "axios";
import { H3, Button, Container } from "@wopify/ui-design";
import { Link } from "preact-router";
import style from "./style.less";

export default class Header extends Component {
	handleAuth() {
		console.log("handleAuth()");

		axios
			.post("http://localhost:8080/auth/google")
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<header class={style.header}>
				<nav>
					<H3>MyData™</H3>
					<Button onClick={() => this.handleAuth()} primary>
						Login with Google
					</Button>
				</nav>
			</header>
		);
	}
}
