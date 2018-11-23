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
import { h, Component } from "preact";
import style from "./style.less";

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: "",
			deletePopup: false,
			successPopup: false
		};
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

	renderSuccessPoup() {
		return (
			<Popup
				title="Your data is now being removed!"
				width="500"
				text={`Success, we have now sent a request to about removing your data. The process might take a while and we will inform you when it has successfully been deleted.`}
				closeValue="Okay, close window"
				close={() => {
					this.setState({
						successPopup: false
					});
				}}
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
				name: "Linkedin",
				activity: "1 min ago"
			}
		];

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

				<div class={style.infoContainer}>
					<H2>Master your data in a few clicks.</H2>
					<P>
						By using MyData™ you can access and manage all of your data from all
						your registered services in only a few clicks.{" "}
					</P>
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
									<img src={`//logo.clearbit.com/${item.name}.com?size=200`} />
									<H2>{item.name}</H2>
									<H4 style={{ opacity: 0.7 }}>Last used: {item.activity}</H4>

									<Button
										onClick={() =>
											this.setState({
												deletePopup: true,
												selectedService: item
											})
										}
										warning
									>
										Remove data
									</Button>
								</Container>
							</div>
						))}
				</div>

				{this.state.deletePopup &&
					this.renderDeletePoup(this.state.selectedService)}

				{this.state.successPopup &&
					this.renderSuccessPoup(this.state.selectedService)}
			</div>
		);
	}
}
