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
			"https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=120720206824-cibobt957sd9rtmlu4l71toorl15ngap.apps.googleusercontent.com&as=Gu3Au4zrVq2c8Ckw2wNk5Q&destination=http%3A%2F%2Flocalhost%3A8080&approval_state=!ChRuV1l5RGIyUzFrOUdEZVN0bU1lWRIfTThicEo2RFBXNThSOERFdWhZOThQYzkxZElSTGRCWQ%E2%88%99APNbktkAAAAAW_pVqo_lVuMmi0JeJEx4E-6uVe4FOyR1&oauthgdpr=1&xsrfsig=AHgIfE-Eop4e_R-Gjd0S40h_cs6oJOzAMQ&flowName=GeneralOAuthFlow";

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
