import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import {
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaLinux,
	FaAndroid,
	FaSms,
	FaComment,
	FaDiscourse,
	FaWeixin,
} from 'react-icons/fa';

const LandingPage = () => {
	return (
		<>
			<div className="mt-3 container px-4 text-center ">
				<div className="alert alert-primary text-center" role="alert">
					<h1>Welcome !</h1>
					<h3>Sending Information to students made easier...</h3>
					<p>
						A simple way to disseminate information to students. Sending
						information accross has never been this easy
					</p>
				</div>
			</div>

			{/* <Link to="/about">About</Link> */}
			{/* <div className="row gx-20"> */}
			<div className="container">
				<div className="row justify-content-center align-items-center">
					{/* <div className="container-fluid min-vh-100 w-100 d-flex flex-column justify-content-center align-items-center"> */}
					<div className="col-sm-10 col-md-6 col-lg-6 p-3">
						<FaSms size={90} className="card-img-top" color="red" />

						<Card
							cardTitle="General SMS"
							cardText="Send general sms to students from here"
							btnText="Send"
							link="/generalsms"
						/>
						{/* <Link to="/generalsms">General SMS</Link> */}
					</div>
					<div className="col-sm-10 col-md-6 col-lg-6 p-3">
						<FaWeixin size={90} className="card-img-top" color="blue" />
						<Card
							cardTitle="Exam Results"
							cardText="Send exam results to students from here"
							link="/resultssms"
						/>
					</div>
				</div>
			</div>
			<div className="fs-6 card-footer text-body-secondary text-center mb-3">
				<p>Powered by: Connect Solutions Ghana - 0500008001</p>
			</div>
		</>
	);
};
export default LandingPage;
