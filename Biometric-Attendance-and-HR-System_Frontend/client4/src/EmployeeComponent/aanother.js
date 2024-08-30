import p1 from '../assets/e4.png';
import p2 from '../assets/e1.png';
import p3 from '../assets/e2.png';
import p4 from '../assets/e5.png';
import p5 from '../assets/e6.png';
import p6 from '../assets/e7.png';
const employees = [
  {
    name: 'Abel Bekele', id: 'EM3521231', department: 'Software Intensive', designation: 'Back-end Developer', type: 'Full-time', profile: p2,
    personalInfo: {
      firstName: 'Abel',
      lastName: 'Bekele',
      mobileNumber: '091000000',
      dateOfBirth: 'July 15, 1995',
      gender: 'Male',
      address: 'Adama',
      maritalStatus: 'Unmarried',
      nationality: 'Ethiopia',
    }, joiningDate: '10-1-2000', email: 'abelBekele@gmail.com', emergencyContactName: 'Abrham Bekele', emergencyContactNumber: '0908070652', salary: '15000'
  },
  {
    name: 'Abraham Demsew', id: 'EM3521232', department: 'Hardware Intensive', designation: 'Hardware Project Manager', type: 'Full-time', profile: p3,
    personalInfo: {
      firstName: 'Abraham',
      lastName: 'Bekele',
      mobileNumber: '091000000',
      dateOfBirth: 'July 15, 1995',
      gender: 'Male',
      address: 'Adama',
      maritalStatus: 'Unmarried',
      nationality: 'Ethiopia',
    }, joiningDate: '10-1-2000', email: 'abelBekele@gmail.com', emergencyContactName: 'Abrham Bekele', emergencyContactNumber: '0908070652', salary: '15000'

  },
  { name: 'Ajmel Abes', id: 'EM3521233', department: 'Software Intensive', designation: 'Front-end Developer', type: 'Full-time', profile: p6 },
  { name: 'Miraf Tsegaye', id: 'EM3521234', department: 'Software Intensive', designation: 'Front-end Developer', type: 'Full-time', profile: p4 },
  { name: 'Shewit Chala', id: 'EM3521235', department: 'Academic Staff', designation: 'Project Manager', type: 'Full-time', profile: p1 },
  { name: 'Chala Kebede', id: 'EM3521236', department: 'Software Intensive', designation: 'UX/UI Designer', type: 'Part-time', profile: p6 },
  { name: 'Amanuel Tesfaye', id: 'EM3521237', department: 'Hardware Intensive', designation: 'Back-end Developer', type: 'Contract', profile: p2 },
  { name: 'Marta Desta', id: 'EM3521238', department: 'Hardware Intensive', designation: 'Hardware Project Manager', type: 'Full-time', profile: p4 },
  { name: 'Tesfaye Abebe', id: 'EM3521239', department: 'Academic Staff', designation: 'Project Manager', type: 'Full-time', profile: p3 },
  { name: 'Marta Tesfaye', id: 'EM3521241', department: 'Software Intensive', designation: 'Front-end Developer', type: 'Full-time', profile: p5 },
  { name: 'Amanuel Desta', id: 'EM3521242', department: 'Hardware', designation: 'Hardware Engineer', type: 'Full-time', profile: p6 },
  { name: 'Bisrat Desta', id: 'EM3521243', department: 'Development', designation: 'Back-end Developer', type: 'Full-time', profile: p2 },
];

const attendance = [
  {
    employeeId: 'EM3521231',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T08:30:00', clockOut: '2024-08-15T17:30:00', status: 'On Time' },
      { date: '2024-08-14', clockIn: '2024-08-14T08:45:00', clockOut: '2024-08-14T17:45:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '2024-08-13T09:15:00', clockOut: '2024-08-13T18:15:00', status: 'Late' },
      { date: '2024-08-12', clockIn: '', clockOut: '', status: 'Absent' },
    ],
  },
  {
    employeeId: 'EM3521232',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T09:15:00', clockOut: '2024-08-15T18:15:00', status: 'Late' },
      { date: '2024-08-14', clockIn: '2024-08-14T08:50:00', clockOut: '2024-08-14T17:50:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '', clockOut: '', status: 'Absent' },
      { date: '2024-08-12', clockIn: '2024-08-12T08:40:00', clockOut: '2024-08-12T17:40:00', status: 'On Time' },
    ],
  },
  {
    employeeId: 'EM3521233',
    records: [
      { date: '2024-08-15', clockIn: '', clockOut: '', status: 'On leave' },
      { date: '2024-08-14', clockIn: '2024-08-14T08:40:00', clockOut: '2024-08-14T17:40:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '2024-08-13T08:50:00', clockOut: '2024-08-13T17:50:00', status: 'On Time' },
      { date: '2024-08-12', clockIn: '2024-08-12T09:10:00', clockOut: '2024-08-12T18:10:00', status: 'Late' },
    ],
  },
  {
    employeeId: 'EM3521234',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T08:45:00', clockOut: '2024-08-15T17:45:00', status: 'On Time' },
      { date: '2024-08-14', clockIn: '2024-08-14T09:00:00', clockOut: '2024-08-14T18:00:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '2024-08-13T09:10:00', clockOut: '2024-08-13T18:10:00', status: 'Late' },
      { date: '2024-08-12', clockIn: '', clockOut: '', status: 'Absent' },
    ],
  },
  {
    employeeId: 'EM3521235',
    records: [
      { date: '2024-08-15', clockIn: '', clockOut: '', status: 'On leave' },
      { date: '2024-08-14', clockIn: '2024-08-14T08:50:00', clockOut: '2024-08-14T17:50:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '2024-08-13T09:20:00', clockOut: '2024-08-13T18:20:00', status: 'Late' },
      { date: '2024-08-12', clockIn: '2024-08-12T08:35:00', clockOut: '2024-08-12T17:35:00', status: 'On Time' },
    ],
  },
  {
    employeeId: 'EM3521236',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T08:40:00', clockOut: '2024-08-15T17:40:00', status: 'On Time' },
      { date: '2024-08-14', clockIn: '2024-08-14T09:05:00', clockOut: '2024-08-14:05:00', status: 'Late' },
      { date: '2024-08-13', clockIn: '', clockOut: '', status: 'Absent' },
      { date: '2024-08-12', clockIn: '2024-08-12T08:50:00', clockOut: '2024-08-12T17:50:00', status: 'On Time' },
    ],
  },
  {
    employeeId: 'EM3521237',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T08:55:00', clockOut: '2024-08-15T17:55:00', status: 'Late' },
      { date: '2024-08-14', clockIn: '2024-08-14T08:40:00', clockOut: '2024-08-14T17:40:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '2024-08-13T09:00:00', clockOut: '2024-08-13T18:00:00', status: 'On Time' },
      { date: '2024-08-12', clockIn: '', clockOut: '', status: 'Absent' },
    ],
  },
  {
    employeeId: 'EM3521238',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T08:35:00', clockOut: '2024-08-15T17:35:00', status: 'On Time' },
      { date: '2024-08-14', clockIn: '2024-08-14T09:10:00', clockOut: '2024-08-14T18:10:00', status: 'Late' },
      { date: '2024-08-13', clockIn: '', clockOut: '', status: 'Absent' },
      { date: '2024-08-12', clockIn: '2024-08-12T08:45:00', clockOut: '2024-08-12T17:45:00', status: 'On Time' },
    ],
  },
  {
    employeeId: 'EM3521239',
    records: [
      { date: '2024-08-15', clockIn: '', clockOut: '', status: 'Absent' },
      { date: '2024-08-14', clockIn: '2024-08-14T08:55:00', clockOut: '2024-08-14T17:55:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '2024-08-13T09:10:00', clockOut: '2024-08-13T18:10:00', status: 'Late' },
      { date: '2024-08-12', clockIn: '2024-08-12T08:40:00', clockOut: '2024-08-12T17:40:00', status: 'On Time' },
    ],
  },
  {
    employeeId: 'EM3521241',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T08:50:00', clockOut: '2024-08-15T17:50:00', status: 'On Time' },
      { date: '2024-08-14', clockIn: '2024-08-14T08:30:00', clockOut: '2024-08-14T17:30:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '2024-08-13T09:05:00', clockOut: '2024-08-13T18:05:00', status: 'Late' },
      { date: '2024-08-12', clockIn: '', clockOut: '', status: 'Absent' },
    ],
  },
  {
    employeeId: 'EM3521242',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T09:00:00', clockOut: '2024-08-15T18:00:00', status: 'On Time' },
      { date: '2024-08-14', clockIn: '2024-08-14T08:45:00', clockOut: '2024-08-14T17:45:00', status: 'On Time' },
      { date: '2024-08-13', clockIn: '', clockOut: '', status: 'Absent' },
      { date: '2024-08-12', clockIn: '2024-08-12T08:55:00', clockOut: '2024-08-12T17:55:00', status: 'On Time' },
    ],
  },
  {
    employeeId: 'EM3521243',
    records: [
      { date: '2024-08-15', clockIn: '2024-08-15T08:40:00', clockOut: '2024-08-15T17:40:00', status: 'On Time' },
      { date: '2024-08-14', clockIn: '2024-08-14T09:00:00', clockOut: '2024-08-14T18:00:00', status: 'Late' },
      { date: '2024-08-13', clockIn: '2024-08-13T08:50:00', clockOut: '2024-08-13T17:50:00', status: 'On Time' },
      { date: '2024-08-12', clockIn: '', clockOut: '', status: 'Absent' },
    ],
  },
];

const Payrol = [
  {
    employeeId: 'EM3521231',
    PayrollRecords: [
      { date: 'augst', baseSalary: 15000, Allowance: 3500, Deduction: 5990, Paystatus: 'Paid', NetSalary: '12510' },
    ],
  },
  {
    employeeId: 'EM3521232',
    PayrollRecords: [
      { date: 'augst', baseSalary: 12000, Allowance: 2000, Deduction: 500, Paystatus: 'UnPaid', NetSalary: '12510' }
    ],

  },
  {
    employeeId: 'EM3521233',
    PayrollRecords: [
      { baseSalary: 18000, Allowance: 4000, Deduction: 600, Paystatus: 'UnPaid', NetSalary: '12510' }
    ],
  },
  {
    employeeId: 'EM3521234',
    PayrollRecords: [
      { baseSalary: 16000, Allowance: 3000, Deduction: 550, Paystatus: 'Paid', NetSalary: '12510' }
    ],
  },
  {
    employeeId: 'EM3521235',
    PayrollRecords: [
      { baseSalary: 17000, Allowance: 3200, Deduction: 580, Paystatus: 'Paid', NetSalary: '13510' }
    ],
  },
  {
    employeeId: 'EM3521236',
    PayrollRecords: [
      { baseSalary: 14000, Allowance: 2500, Deduction: 700, Paystatus: 'UnPaid', NetSalary: '12410' }
    ],
  },
  {

    employeeId: 'EM35212337',
    PayrollRecords: [
      { baseSalary: 15500, Allowance: 3100, Deduction: 520, Paystatus: 'Paid', NetSalary: '12810' }
    ],
  },
  {
    employeeId: 'EM3521238',
    PayrollRecords: [
      { baseSalary: 14500, Allowance: 2700, Deduction: 490, Paystatus: 'Paid', NetSalary: '12599' }
    ],
  },
  {
    employeeId: 'EM3521239',
    PayrollRecords: [
      { baseSalary: 16500, Allowance: 3300, Deduction: 600, Paystatus: 'UnPaid', NetSalary: '12530' }
    ],
  },
  {
    employeeId: 'EM3521241',
    PayrollRecords: [
      { baseSalary: 15000, Allowance: 3000, Deduction: 520, Paystatus: 'Paid', NetSalary: '13510' }
    ],
  },
  {
    employeeId: 'EM3521241',
    PayrollRecords: [
      { baseSalary: 17000, Allowance: 3200, Deduction: 550, Paystatus: 'Paid', NetSalary: '13410' }
    ],
  },
  {
    employeeId: 'EM3521243',
    PayrollRecords: [
      { baseSalary: 17000, Allowance: 3200, Deduction: 550, Paystatus: 'Paid', NetSalary: '13333' }
    ],
  },
];
const leave = [
  {
    employeeId: 'EM3521231',
    leaveRecords: [
      { appiDate: '2024-08-01', leaveFrom: '2024-08-10', leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept', description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition" },
    ]
  },
  {
    employeeId: 'EM3521232',
    leaveRecords: [
      { appiDate: '2024-07-15', leaveFrom: '2024-07-20', leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept', description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus" },
    ]
  },
  {
    employeeId: 'EM3521233',
    leaveRecords: [
      { appiDate: '2024-06-20', leaveFrom: '2024-06-25', leaveTo: '2024-06-30', leaveType: 'Casual Leave', status: 'Rejected', description: "The employee has requested casual leave to address an urgent personal matter that requires immediate attention. This short-term absence is critical to resolving the issue without impacting work responsibilities. The employee will ensure a smooth transition back to work after the matter is resolved" },
    ]
  },
  {
    employeeId: 'EM3521234',
    leaveRecords: [
      { appiDate: '2024-08-01', leaveFrom: '2024-08-10', leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept', description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition" },
    ]
  },
  {
    employeeId: 'EM3521235',
    leaveRecords: [
      { appiDate: '2024-07-15', leaveFrom: '2024-07-20', leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept', description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus" },
    ]
  },
  {
    employeeId: 'EM3521236',
    leaveRecords: [
      { appiDate: '2024-06-20', leaveFrom: '2024-06-25', leaveTo: '2024-06-30', leaveType: 'Casual Leave', status: 'Rejected', description: "The employee has requested casual leave to address an urgent personal matter that requires immediate attention. This short-term absence is critical to resolving the issue without impacting work responsibilities. The employee will ensure a smooth transition back to work after the matter is resolved" },
    ]
  },
  {
    employeeId: 'EM3521237',
    leaveRecords: [
      { appiDate: '2024-08-01', leaveFrom: '2024-08-10', leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept', description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition" },
    ]
  },
  {
    employeeId: 'EM3521238',
    leaveRecords: [
      { appiDate: '2024-07-15', leaveFrom: '2024-07-20', leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept', description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus" },
    ]
  },
  {
    employeeId: 'EM3521239',
    leaveRecords: [
      { appiDate: '2024-06-20', leaveFrom: '2024-06-25', leaveTo: '2024-06-30', leaveType: 'Casual Leave', status: 'Rejected', description: "The employee has requested casual leave to address an urgent personal matter that requires immediate attention. This short-term absence is critical to resolving the issue without impacting work responsibilities. The employee will ensure a smooth transition back to work after the matter is resolved" },
    ]
  },
  {
    employeeId: 'EM3521241',
    leaveRecords: [
      { appiDate: '2024-08-01', leaveFrom: '2024-08-10', leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept', description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition" },

    ]
  },
  {
    employeeId: 'EM3521242',
    leaveRecords: [
      { appiDate: '2024-07-15', leaveFrom: '2024-07-20', leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept', description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus" },
    ]
  },
  {
    employeeId: 'EM3521243',
    leaveRecords: [
      { appiDate: '2024-06-20', leaveFrom: '2024-06-25', leaveTo: '2024-06-30', leaveType: 'Casual Leave', status: 'Rejected', description: "The employee has requested casual leave to address an urgent personal matter that requires immediate attention. This short-term absence is critical to resolving the issue without impacting work responsibilities. The employee will ensure a smooth transition back to work after the matter is resolved" }
    ]
  },
];

export { employees, attendance, leave, Payrol };
