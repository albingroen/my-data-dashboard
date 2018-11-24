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
		let url =
			"https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly&response_type=code&client_id=120720206824-cibobt957sd9rtmlu4l71toorl15ngap.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fgoogle%2Fcallback";
		return (
			<header class={style.header}>
				<nav>
					<H3>MyData™</H3>
					<Button onClick={() => this.handleAuth()} primary>
						Login with Google
					</Button>
					<a href={url}>Login with Google</a>
				</nav>
			</header>
		);
	}
}
