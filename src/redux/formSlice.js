import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentStep: 0,
  formData: {
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    bank: '',
    accountNumber: '',
    ifsc: '',
    education: [{ courseName: '', university: '', percentage: '', passingYear: '' }],
    experience: [{ company: "", designation: "", joiningDate: "", leavingDate: "" }]
  },
  list: [
    {
      name: 'khushboo',
      email: 'khushboo@gmail.com',
      password: '123',
      address: 'gota',
      city: 'Ahmedabad',
      state: 'Gujarat',
      bank: 'hdfc',
      accountNumber: 353465657676786,
      ifsc: 'GRS665575',
      education: [{ courseName: 'MBA', university: 'RTU', percentage: '92', passingYear: '2015' }],
      experience: [{ company: "IBM", designation: "Engineer", joiningDate: "2022-05-11", leavingDate: "2023-12-09" }]
    },
    {
      name: 'john',
      email: 'john@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'olive',
      email: 'olive@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'max',
      email: 'max@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'farah',
      email: 'farah@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'matthew',
      email: 'matthew@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'kunal',
      email: 'kunal@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'sid',
      email: 'sid@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'shehnaaz',
      email: 'john@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'mandeep',
      email: 'mandeep@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'sanjana',
      email: 'sanjana@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'suresh',
      email: 'suresh@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'pramod',
      email: 'pramod@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },
    {
      name: 'neeta',
      email: 'neeta@gmail.com',
      password: '676',
      address: 'maninagar',
      city: 'pune',
      state: 'Maharashtra',
      bank: 'bob',
      accountNumber: 2435798966766,
      ifsc: 'PN446666',
      education: [{ courseName: 'IIT', university: 'GTU', percentage: '90', passingYear: '2021' }],
      experience: [{ company: "Accenture", designation: "Manager", joiningDate: "2018-08-28", leavingDate: "2020-01-21" }]
    },

  ],

};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    userList: (state, action) => {
      const formData = action.payload;

      const userData = [
        { name: formData.name, email: formData.email, address: formData.address, city: formData.city, state: formData.state, bank: formData.bank, accountNumber: formData.accountNumber, ifsc: formData.ifsc, education: formData.education, experience: formData.experience }
      ];
      state.list.push(...userData);
    },
    editFormData: (state, action) => {
      const { index, updatedData } = action.payload;
      state.list[index] = updatedData;
    },
    deleteFormData(state, action) {
      const index = action.payload;
      state.list.splice(index, 1);
    },



  },
});



export const { nextStep, prevStep, setFormData, userList, setCurrentStep, editFormData, deleteFormData } = formSlice.actions;

export default formSlice.reducer;
