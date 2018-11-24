import { h, Component } from "preact";
import axios from "axios";
import { H3, Button, Container } from "@wopify/ui-design";
import { Link } from "preact-router";
import style from "./style.less";
import Header from "../header";
import GoogleButton from "react-google-button";
export default class Login extends Component {
	render() {
		let url =
			"https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly&response_type=code&client_id=418902873389-p3uqufaaju5588e1nt54euapt0h17f1s.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fmydata.now.sh%2Fauth%2Fgoogle%2Fcallback";
		return (
			<div className={style.wrapper}>
				<div className={style.leftSide}>
					<img
						src={"../../assets/icons/loginImg.png"}
						style={{ width: "80%" }}
						alt=""
					/>
				</div>
				<div className={style.leftSide}>
					<div
						style={{
							flex: 1,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
							flexDirection: "column"
						}}
					>
						<h1 style={{ color: "black" }}>
							MANAGE <b>YOUR</b> DATA
						</h1>
						<h3>You decide who uses your data</h3>
					</div>
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						}}
					>
						<a style={{ textDecoration: "none" }} href={url}>
							<GoogleButton onClick={() => {}} />
						</a>
						<p
							style={{
								width: "60%",
								textAlign: "center",
								marginTop: 20,
								color: "grey"
							}}
						>
							By signing in you agree to our terms and that you have read our
							Data use policy
						</p>
					</div>
				</div>
			</div>
		);
	}
}
