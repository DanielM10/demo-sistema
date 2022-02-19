import React from 'react';
import Grid from '@material-ui/core/Grid';
import "./LoadingScreen.css";
export default class LoadingScreen extends React.Component {

	scrollTop = 0;

	componentDidUpdate(prevProps) {
		
		if (!this.props.loading && prevProps.loading) {
			document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop > 0 ? this.scrollTop + 50 : 0;
		}
		if(this.props.loading){
			this.scrollTop = document.documentElement.scrollTop;
			document.body.scrollTop = document.documentElement.scrollTop = 0;

		}
	}



	
	render() {
		const loadingIcon = <img id="loading-ring" src="./loader.gif" className="img-responsive center-block" alt="fultra" />;
		return (
			<div id="loading-fultra" className={this.props.loading ? '': 'loaded'}>
				{
					this.props.loading ? (
						<div className="center-content">

							<Grid
							container
							alignItems="center"
							justify="center"
							spacing={0}
							>
								

								<Grid item xs={12} md={12}>
								<img id="loading-logo" src='./fultrasintransporte.png' className="img-responsive center-block" alt="fultra-loading" />
									
									{
									this.props.message ?
									<p className="message mt-20">{this.props.message}</p>
										 : null
									}
								</Grid>
								<Grid item xs={12} md={6}>
									{loadingIcon}
								</Grid>

								
							</Grid>
						</div>
					) : null
				}
				

			</div>
			

		);
	}
}