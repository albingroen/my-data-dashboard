import {
	H1,
	H2,
	H4,
	P,
	Container,
	Button,
	Input,
	Popup,
} from "@wopify/ui-design";
import { h, Component } from "preact";
import style from "./style.less";
import axios from "axios";

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: "",
			deletePopup: false,
			successPopup: false,
		};
	}

	componentDidMount() {
		// send this code to the server
		// Save this.props.matches.code to localstorage and use that one for every request
		// post to
		/*
		.post("http://localhost:3000/v1/auth/success", {
			code: this.props.matches.code,
		})
		to get your data

		*/
		console.log("props", this.props.matches.code);
		axios
			.post("http://localhost:3000/v1/auth/success", {
				code: this.props.matches.code,
			})
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div class={style.home}>
				<p>hej</p>
			</div>
		);
	}
}
