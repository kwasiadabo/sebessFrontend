import React from 'react';

const Toast = (props) => {
	return (
		<>
			<div
				className="toast"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				<div className="toast-header">
					{/* <img src="..." className="rounded me-2" alt="..." /> */}
					<strong className="me-auto">{props.smsTitle}</strong>
					<small>{props.timeAgo}</small>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="toast"
						aria-label="Close"
					></button>
				</div>
				<div className="toast-body">{props.msg}</div>
			</div>
		</>
	);
};

export default Toast;
