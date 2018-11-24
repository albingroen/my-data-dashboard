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
	Popup,
} from "@wopify/ui-design";
import axios from "axios";
import warning from "../../../src/warning.png";
import style from "./style.less";

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: "",
			deletePopup: false,
			data: [],
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
						data: res.data,
					});
				})
				.catch(err => {
					localStorage.removeItem("token");
					window.location.replace("/");
					console.log(err);
				});
		}
	}

	handleSearchChange(e) {
		this.setState({
			searchValue: e.target.value,
		});
	}

	renderDeletePoup(service) {
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		return (
			<Popup
				title={`Remove data from ${capitalizeFirstLetter(
					service.domain.split(".")[0]
				)}?`}
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
						deletePopup: false,
					})
				}
				close={() =>
					this.setState({
						deletePopup: false,
					})
				}
			/>
		);
	}

	render() {
		const { data, searchValue } = this.state;
		const staticData = [
			{
				name: "Facebook",
				activity: "Yesterday",
			},
			{
				name: "Snapchat",
				activity: "1 day ago",
			},
			{
				name: "Wopify",
				activity: "1 min ago",
			},
			{
				name: "Dribbble",
				activity: "1 min ago",
			},
		];

		return (
			<div class={style.home}>
				<label htmlFor="">Dashboard</label>
				<H1
					style={{
						fontSize: "2.25em",
						fontWeight: "lighter",
						paddingBottom: "2rem",
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
						display: "block",
						width: "100%",
					}}
					placeholder="Search for services..."
					value={this.state.searchValue}
					onChange={e => this.handleSearchChange(e)}
				/>

				<div class={style.cards}>
					{data
						.filter(item =>
							item.domain
								.toLocaleLowerCase()
								.includes(searchValue.toLowerCase())
						)
						.map(item => (
							<ServiceItem
								onDelete={() =>
									this.setState({
										deletePopup: true,
										selectedService: item,
									})
								}
								item={item}
							/>
						))}
				</div>

				{this.state.deletePopup &&
					this.renderDeletePoup(this.state.selectedService)}
			</div>
		);
	}
}

export const ServiceItem = props => {
	const { item, onDelete } = props;
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<div class={style.containerWrapper}>
			<Container
				style={{
					textAlign: "center",
					display: "inline-block",
					alignItems: "center",
					width: "100%",
					minHeight: "200px",
					position: "relative",
					boxSizing: "border-box",
				}}
			>
				<div
					class={style.logo}
					style={{
						backgroundImage: `url(${`//logo.clearbit.com/${
							item.domain.split(".")[0]
						}.com?size=200`})`,
					}}
				/>

				<H2>{capitalizeFirstLetter(item.domain.split(".")[0])}</H2>
				<H4 style={{ opacity: 0.7 }}>Registered: {item.date}</H4>

				<Button
					onClick={() => onDelete()}
					style={{
						background: "none",
						color: "orangered",
						padding: 0,
						marginBottom: "1rem",
					}}
				>
					Delete data
				</Button>
				<br />

				<a href="https://www.facebook.com/help/1701730696756992?helpref=hc_global_nav">
					<Button primary>Download data</Button>
				</a>

				<div style={{ borderWidth: 0 }}>
					<p style={{ marginTop: 20, color: "grey" }}>
						{capitalizeFirstLetter(item.domain.split(".")[0])} shares this data
						with
					</p>
					<p style={{ color: "grey" }}>
						{Math.floor(Math.random() * 10)} other services/companies
					</p>
					<p style={{ alignSelf: "center", color: "grey", marginTop: 10 }}>
						Read more
					</p>
				</div>
			</Container>
		</div>
	);
};
