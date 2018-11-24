import { h, Component } from "preact";
import axios from "axios";
import { H3, Button, Container } from "@wopify/ui-design";
import { Link } from "preact-router";
import style from "./style.less";

export default class Header extends Component {
	render() {
		let url =
			"https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly&response_type=code&client_id=418902873389-p3uqufaaju5588e1nt54euapt0h17f1s.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fmydata.now.sh%2Fauth%2Fgoogle%2Fcallback";

		const token = localStorage.getItem("token");
		return (
			<header class={style.header}>
				<nav>
					<H3>MyData™</H3>

					{token && (
						<Button
							onClick={() => {
								localStorage.removeItem("token");
								window.location.replace("/");
							}}
							warning
						>
							Logout
						</Button>
					)}
				</nav>
			</header>
		);
	}
}
