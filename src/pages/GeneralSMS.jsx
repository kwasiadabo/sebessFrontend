import React, { useEffect, useState } from 'react';
import apiClient from '../components/services/api-service';
import { FaSms } from 'react-icons/fa';
import Toast from '../components/toast';
import { Modal } from 'bootstrap';

const GeneralSMS = () => {
	const [academicyear, setAcademicYear] = useState([]);
	const [classes, setClasses] = useState([]);
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [acYear, setAcYear] = useState('');
	const [cla, setCla] = useState('');
	const [sear, setSear] = useState('a');
	const [error, setError] = useState(null);
	const [checkedItems, setCheckedItems] = useState([]);
	const [checkAll, setCheckAll] = useState(false);
	const [allChecked, setAllChecked] = useState([]);
	const [checked, setChecked] = useState(true);
	const [smsMessage, setSmsMessage] = useState('');
	const [senderId, setSenderId] = useState('');
	const [apiResponse, setApiResponse] = useState('');
	const [show, setShow] = useState(false);
	const [program, setProgram] = useState('');
	const [programs, setPrograms] = useState([]);

	useEffect(() => {
		apiClient
			.get('/academicyear')
			.then((response) => {
				setAcademicYear(response.data);
				setLoading(false);
				//console.log(response.data);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		apiClient
			.get('/programs')
			.then((response) => {
				setPrograms(response.data);
				setLoading(false);
				//console.log(response.data);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		apiClient
			.get('/classes/' + program)
			.then((response) => {
				setClasses(response.data);

				//	console.log(response.data);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, [program]);

	// Function to handle input change and filter data
	const handleInputChange = (event) => {
		const query = event.target.value.toLowerCase();
		setSear(query);
		setFilteredStudents(
			students.filter((s) => s.FullName.toLowerCase().includes(query))
		);
	};

	const getStudents = (acYear, program, cla) => {
		console.log(
			'academicYear ' + acYear,
			' Program ' + program,
			' class ' + cla
		);
		setFilteredStudents([]);
		setLoading(true);
		apiClient
			.get('/student/' + acYear + '/' + program + '/' + cla)
			.then((response) => {
				setStudents(response.data);
				setFilteredStudents(response.data);
				setLoading(false);
				console.log(response.data);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	};

	const handleCheckboxChange = () => {
		console.log(checked);
		if (checked) {
			setChecked(true);
		} else {
			setChecked(false);
		}
	};

	const handleMyCheckBox = (e, s) => {
		let isChecked = e.currentTarget.checked;
		const value = e.currentTarget.value;
		if (isChecked) {
			setCheckedItems([...checkedItems, s.studentNumber]);
		} else {
			return setCheckedItems((prevData) => {
				console.log(prevData);
				prevData.filter((p) => p.studentNumber !== value);
			});
		}

		/*
            
        */
	};

	// Handle master checkbox change
	const handleCheckAllChange = () => {
		if (checked) {
			setAllChecked(filteredStudents);
		} else {
			setAllChecked([]);
		}
	};

	// Handle individual checkbox change
	// const handleCheckboxClicked = (index) => {
	// 	const updatedCheckedItems = [...checkedItems];
	// 	updatedCheckedItems[index] = !updatedCheckedItems[index];
	// 	setCheckedItems(updatedCheckedItems);
	// };

	// // Function to get the checked rows
	// const getCheckedRows = () => {
	// 	return filteredStudents.filter((item, index) => checkedItems[index]);
	// };

	const handleSubmit = () => {
		//console.log(smsMessage);
		//console.log(filteredStudents);
		setLoading(true);
		const xdata = dataTouse.map((i) => ({
			...i,
			message: smsMessage,
			senderId: senderId,
		}));
		//console.log(xdata);
		apiClient
			.post('/generalsms', xdata)
			.then((response) => {
				setLoading(false);
				setApiResponse(response.data);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
		setStudents([]);
		setSmsMessage('');
	};

	const handleSearch = (e) => {
		setSearch(e.currentTarget.value);
	};

	const data = {
		filteredStudents: students.filter(
			(m) => m.FullName.toLowerCase().includes(search.toLowerCase()) //||
			//m.class?.toLowerCase().includes(cla.toLowerCase())
		),
	};

	const dataTouse = search.length === 0 ? students : data.filteredStudents;

	const sendSMS = async () => {};
	return (
		<div className="container">
			<div className="alert alert-primary text-center" role="alert">
				<h1>General SMS !</h1>
				<p>
					A simple way to disseminate information to students. Sending
					information accross has never been this easy...
				</p>
			</div>
			<div className="row">
				<div className="col-sm-12 col-md-6 col-lg-3">
					<label for="inputPassword6" className=" text-muted col-form-label">
						Academic Year
					</label>

					<select
						className="form-select"
						aria-label="Default select example"
						onChange={(e) => {
							setAcYear(e.currentTarget.value);
							console.log(e.currentTarget.value);
						}}
					>
						{/* <option>{null}</option> */}
						{academicyear.map((a) => (
							<option>{a.Academicyear}</option>
						))}
					</select>

					<label htmlFor="" className="col-form-label">
						Program / Course
					</label>
					<select
						className="form-select"
						aria-label="Default select example"
						onChange={(e) => {
							setProgram(e.currentTarget.value);
							console.log(e.currentTarget.value);
						}}
					>
						{/* <option>{null}</option> */}
						{programs.map((a) => (
							<option>{a.programName}</option>
						))}
					</select>

					<label for="inputPassword6" className="col-form-label">
						Class
					</label>
					<select
						onChange={(e) => {
							setCla(e.currentTarget.value);
							//console.log(e.currentTarget.value);
						}}
						className="form-select"
						aria-label="Default select example"
					>
						{/* <option>{null}</option> */}
						{classes.map((c) => (
							<option>{c.class}</option>
						))}
					</select>
					{!loading && (
						<button
							onClick={() => getStudents(acYear, program, cla)}
							type="button"
							className="mt-3 mb-3 btn btn-primary col-12"
						>
							Load Students
						</button>
					)}
				</div>

				<div className="col-sm-12 col-md-6 col-lg-8 justify-content-center align-items-center">
					<div class="form-group">
						<label for="exampleFormControlTextarea1">Text Message</label>
						<textarea
							className="form-control"
							id="exampleFormControlTextarea1"
							rows="6"
							onChange={(e) => setSmsMessage(e.currentTarget.value)}
						></textarea>
					</div>

					{smsMessage.length > 1 && dataTouse.length > 0 && (
						<button
							onClick={handleSubmit}
							type="button"
							className="mt-3 col-2 btn btn-success float-end"
						>
							Send
						</button>
					)}
				</div>
			</div>
			<div class="input-group mb-3">
				<span class="input-group-text" id="basic-addon1">
					Search Student
				</span>
				<input
					type="text"
					className="form-control"
					//placeholder="Search Student"
					aria-label="Username"
					aria-describedby="basic-addon1"
					onChange={handleSearch}
				/>
			</div>
			<table
				border="2"
				className="table-info table table-striped table-hover table-bordered mt-3  "
			>
				<thead>
					<tr>
						<th>StudentID</th>
						<th>Name</th>
						<th>Phone</th>
					</tr>
				</thead>
				<tbody>
					{dataTouse.map((s, index) => (
						<tr key={s.studentNumber}>
							<td>{s.StudentNumber}</td>
							<td>{s.FullName}</td>
							<td>{s.Tel}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GeneralSMS;
