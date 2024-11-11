import React, { useEffect, useState } from 'react';
import apiClient from '../components/services/api-service';

const ResultsSMS = () => {
	const [academicyear, setAcademicYear] = useState([]);
	const [classes, setClasses] = useState([]);
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);

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
	const [term, setTerm] = useState('');
	const [search, setSearch] = useState('');
	const [loadClicked, setLoadClicked] = useState(false);

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

	const getStudentsResults = (acYear, program, cla, term) => {
		setLoading(true);
		apiClient
			.get('/results/' + acYear + '/' + program + '/' + cla + '/' + term)
			.then((response) => {
				setStudents(response.data);
				setLoading(false);
				console.log(response.data);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	};

	const getEntireStudentsResults = (acYear, term, program) => {
		setLoading(true);
		apiClient
			.get('/entire/' + acYear + '/' + term + '/' + program)
			.then((response) => {
				setStudents(response.data);
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

	const handleSubmit = () => {
		setLoading(true);
		apiClient
			.post('/smsresults', dataTouse)
			.then((response) => {
				console.log(response.data);
				setApiResponse(response.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
		setStudents([]);
	};

	const handleSearch = (e) => {
		setSearch(e.currentTarget.value);
	};

	const data = {
		filteredStudents: students.filter(
			(m) => m.StudentName.toLowerCase().includes(search.toLowerCase()) //||
			//m.class?.toLowerCase().includes(cla.toLowerCase())
		),
	};

	const dataTouse = search.length === 0 ? students : data.filteredStudents;

	const sendSMS = async () => {};
	return (
		<div className="container">
			<div className="alert alert-primary text-center" role="alert">
				<h1>Send Students Results !</h1>
				<p>
					A simple way to disseminate examination results. Sending students
					results has never been this easy...
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
							setStudents([]);
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
							setStudents([]);
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
							setStudents([]);
						}}
						className="form-select"
						aria-label="Default select example"
					>
						{/* <option>{null}</option> */}
						{classes.map((c) => (
							<option>{c.class}</option>
						))}
					</select>
					<label htmlFor="" className="col-form-label">
						Term
					</label>
					<select
						className="form-select"
						aria-label="Default select example"
						onChange={(e) => {
							setTerm(e.currentTarget.value);
							setStudents([]);
						}}
					>
						<option>First</option>
						<option>Second</option>
						<option>Third</option>
					</select>

					{!loading && (
						<button
							onClick={() => {
								getStudentsResults(acYear, program, cla, term);
								setLoadClicked(!loadClicked);
							}}
							type="button"
							className="mt-3 col-12 btn btn-outline-primary"
						>
							Load Results
						</button>
					)}

					{students.length > 1 && (
						<button
							onClick={handleSubmit}
							type="button"
							className="mt-5 col-12 btn btn-success"
						>
							Send
						</button>
					)}
				</div>
				{students.length > 1 && (
					<div className="col-sm-12 col-md-6 col-lg-9">
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
							className="table-info table table-striped table-hover table-bordered "
						>
							<thead>
								<tr>
									{/* <th>
										<input
											className="mb-3"
											type="checkbox"
											name="select"
											//checked={checked}
											onChange={handleCheckboxChange}
										></input>
									</th> */}
									<th>StudentID</th>
									<th>Name</th>
									<th>Grade</th>
									<th>Phone</th>
								</tr>
							</thead>
							<tbody>
								{dataTouse.map((s, index) => (
									<tr key={s.studentNumber}>
										{/* <td>
											{<input
												type="checkbox"
												name="select"
												//checked={s.studentNumber}
												value={s.studentNumber}
												onChange={handleMyCheckBox}
											/> 
										</td> */}
										<td>{s.StudentNumber}</td>
										<td>{s.StudentName}</td>
										<td>{s.Grade}</td>
										<td>{s.phone_Number}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default ResultsSMS;
