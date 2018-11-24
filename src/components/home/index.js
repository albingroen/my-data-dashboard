import { h, Component } from "preact";
import cx from "classnames";
import {
	H1,
	H2,
	H4,
	P,
	Container,
	Button,
	Input,
	Popup
} from "@wopify/ui-design";
import axios from "axios";
import warning from "../../../src/warning.png";
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
		const token = localStorage.getItem("token");

		if (token) {
			axios
				.get(
					`https://thawing-mountain-85132.herokuapp.com/v1/my-data?code=${token}`
				)
				.then(res => {
					this.setState({
						realData: res.data
					});
				})
				.catch(err => console.log(err));
		}
	}

	handleSearchChange(e) {
		this.setState({
			searchValue: e.target.value
		});
	}

	renderDeletePoup(service) {
		return (
			<Popup
				title={`Remove data from ${service.name}?`}
				width="500"
				text="Are you sure you want to delete all of your data from this service? This cannot be undone."
				warning
				confirmValue="Yes, delete data"
				confirm={() => {
					this.setState({ deletePopup: false });
				}}
				denyValue="No please"
				deny={() =>
					this.setState({
						deletePopup: false
					})
				}
				close={() =>
					this.setState({
						deletePopup: false
					})
				}
			/>
		);
	}

	render() {
		const data = [
			{
				name: "Facebook",
				activity: "Yesterday"
			},
			{
				name: "Snapchat",
				activity: "1 day ago"
			},
			{
				name: "Wopify",
				activity: "1 min ago"
			},
			{
				name: "Dribbble",
				activity: "1 min ago"
			}
		];

		console.log(this.state.realData);

		return (
			<div class={style.home}>
				<label htmlFor="">Dashboard</label>
				<H1
					style={{
						fontSize: "2.25em",
						fontWeight: "lighter",
						paddingBottom: "2rem"
					}}
				>
					Your {data.length} registered services
				</H1>

				<div className={style.infoContainers}>
					<div class={style.infoContainer}>
						<div class={style.text}>
							<H2>Data security (Good)</H2>
							<P>
								By scanning all of your services and analysing the content we
								can estimate a average security-level on your used services.
							</P>
						</div>
					</div>

					<div class={cx(style.infoContainer, style.warning)}>
						<div class={style.text}>
							<H2>Data Spreadage (Wide)</H2>
							<P>
								Data Spreadage means how many actors besides the services you
								registered has access to the data. This can be dangerous since
								you do not know which one these are.
							</P>
						</div>
						<img src={warning} alt="" />
					</div>
				</div>

				<Input
					style={{
						marginBottom: "1rem",
						marginTop: "1.5rem",
						display: "block"
					}}
					placeholder="Search for services..."
					value={this.state.searchValue}
					onChange={e => this.handleSearchChange(e)}
				/>

				<div class={style.cards}>
					{data
						.filter(item =>
							item.name
								.toLocaleLowerCase()
								.includes(this.state.searchValue.toLowerCase())
						)
						.map(item => (
							<div class={style.containerWrapper}>
								<Container
									style={{
										textAlign: "center",
										display: "inline-block",
										alignItems: "center",
										width: "100%",
										minHeight: "200px",
										position: "relative",
										boxSizing: "border-box"
									}}
								>
									<div
										class={style.logo}
										style={{
											backgroundImage: `url(${`//logo.clearbit.com/${
												item.name
											}.com?size=200`})`
										}}
									/>

									<H2>{item.name}</H2>
									<H4 style={{ opacity: 0.7 }}>Registered: {item.activity}</H4>

									<Button
										onClick={() =>
											this.setState({
												deletePopup: true,
												selectedService: item
											})
										}
										style={{
											background: "none",
											color: "orangered",
											padding: 0,
											marginBottom: "1rem"
										}}
									>
										Delete data
									</Button>
									<br />

									<a href="https://www.facebook.com/help/1701730696756992?helpref=hc_global_nav">
										<Button primary>Download data</Button>
									</a>
								</Container>
							</div>
						))}
				</div>

				{this.state.deletePopup &&
					this.renderDeletePoup(this.state.selectedService)}
			</div>
		);
	}
}
