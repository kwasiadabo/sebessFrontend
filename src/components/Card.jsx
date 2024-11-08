import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
	const { cardTitle, cardText, btnText, link } = props;
	return (
		<>
			<div className="card" width="18rem">
				{/* <FaSms size={90} className="card-img-top" color="red" /> */}
				{/* <img src="..." className="card-img-top" alt="..." /> */}
				<div className="card-body">
					<h5 className="card-title">{cardTitle}</h5>
					<p className="card-text">{cardText}</p>
					<Link to={link}>
						<button type="button" className="btn btn-outline-primary">
							Send
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Card;
