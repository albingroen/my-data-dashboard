import { h, Component } from "preact";
import axios from "axios";
import style from "./style.less";

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: "",
			deletePopup: false
		};
	}

	componentDidMount() {
		localStorage.setItem("token", this.props.matches.code);
		// Authenticate
		axios
			.post("https://thawing-mountain-85132.herokuapp.com/v1/auth/success", {
				code: this.props.matches.code
			})
			.then(res => {
				const { history } = this.props;
				window.location.replace("/");
			})
			.catch(err => {
				localStorage.removeItem("token");
				window.location.replace("/");
				console.log(err);
			});
	}

	render() {
		return <div class={style.home} />;
	}
}
