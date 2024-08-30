import p1 from '../assets/e4.png';
import p2 from'../assets/e1.png';
import p3 from'../assets/e2.png';
import p4 from'../assets/e5.png';
import p5 from'../assets/e6.png';
import p6 from'../assets/e7.png';
const employees = [
  { name: 'Abel Bekele',personalInfo: {
    firstName: 'Abel',
    lastName: 'Bekele',
    mobileNumber: '09000000',
    dateOfBirth: 'July 14, 1995',
    gender: 'Male',
    address: 'Adama',
    maritalStatus: 'Unmarried',
    nationality:'Ethiopia',
  },joiningDate :'10-1-2000',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,workingDays:5,educationLevel:'Bachelor\'s Degree',
  averageBreakTime: '60', email:'abelBekele@gmail.com',emergencyContactName:'Abrham Bekele',emergencyContactNumber:'0908070652',salary:'15000', id: 'EM3521231', department: 'Research And Development ', designation: 'Director', type: 'Full-time', profile: p2,baseSalary: 15000, Allowance: 3500, Deduction: 5990, Paystatus: 'Paid'  },
  { name: 'Abreham Demsew',personalInfo: {
    firstName: 'Abreham',
    lastName: 'Demsew',
    mobileNumber: '09000000',
    dateOfBirth: 'July 14, 1995',
    gender: 'Male',
    address: 'Adama',
    maritalStatus: 'Unmarried',
    nationality:'Ethiopia',
  },joiningDate :'10-1-2000',averageInTime: '8:00 AM', educationLevel:'Bachelor\'s Degree',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,workingDays:5,
  averageBreakTime: '60', email:'abrhamdemsew@gmail.com',emergencyContactName:'Abrham Bekele',emergencyContactNumber:'0908070652',salary:'15000', id: 'EM3521232', department: 'Hardware Intensive', designation: 'Hardware Project Manager', type: 'Full-time', profile: p3,baseSalary: 12000, Allowance: 2000, Deduction: 500, Paystatus: 'UnPaid',averageInTime: '8:00 AM',
  performanceHistory: [
    { month: 'July 2024', rating: 8, feedback: 'Great front-end skills and attention to detail' },
    { month: 'June 2024', rating: 7, feedback: 'Consistent performance but could improve on design feedback' },
    { month: 'May 2024', rating: 8, feedback: 'Strong coding abilities' },
  ] },
  { name: 'Ajmel Abes', id: 'EM3521233', department: 'Software Intensive', designation: 'Front-end Developer',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', type: 'Full-time', profile: p6 ,baseSalary: 18000, Allowance: 4000, Deduction: 600, Paystatus: 'UnPaid',performanceHistory: [
    { month: 'July 2024', rating: 8, feedback: 'Great front-end skills and attention to detail' },
    { month: 'June 2024', rating: 7, feedback: 'Consistent performance but could improve on design feedback' },
    { month: 'May 2024', rating: 8, feedback: 'Strong coding abilities' },
  ] },
  { name: 'Miraf Tsegaye', id: 'EM3521234', department: 'Software Intensive', designation: 'Front-end Developer',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', type: 'Full-time', profile: p4,  baseSalary: 16000, Allowance: 3000, Deduction: 550, Paystatus: 'Paid' ,performanceHistory: [
    { month: 'July 2024', rating: 8, feedback: 'Great front-end skills and attention to detail' },
    { month: 'June 2024', rating: 7, feedback: 'Consistent performance but could improve on design feedback' },
    { month: 'May 2024', rating: 8, feedback: 'Strong coding abilities' },
  ]  },
  { name: 'Shewit Chala', id: 'EM3521235', department: 'Academic Staff', designation: 'Project Manager', type: 'Full-time', averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60',profile:p1,baseSalary: 17000, Allowance: 3200, Deduction: 580, Paystatus: 'Paid'  },
  { name: 'Chala Kebede', id: 'EM3521236', department: 'Software Intensive', designation: 'UX/UI Designer', type: 'Part-time',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', profile: p6 ,baseSalary: 14000, Allowance: 2500, Deduction: 700, Paystatus: 'UnPaid'},
  { name: 'Amanuel Tesfaye', id: 'EM3521237', department: 'Hardware Intensive', designation: 'Back-end Developer', type: 'Contract',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', profile: p2 ,baseSalary: 15500, Allowance: 3100, Deduction: 520, Paystatus: 'Paid'},
  { name: 'Marta Desta', id: 'EM3521238', department: 'Hardware Intensive', designation: 'Hardware Project Manager', type: 'Full-time',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', profile: p4,baseSalary: 14500, Allowance: 2700, Deduction: 490, Paystatus: 'Paid' },
  { name: 'Tesfaye Abebe', id: 'EM3521239', department: 'Academic Staff', designation: 'Project Manager', type: 'Full-time',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', profile: p3,baseSalary: 16500, Allowance: 3300, Deduction: 600, Paystatus: 'UnPaid' },
  { name: 'Marta Tesfaye', id: 'EM3521241', department: 'Software Intensive', designation: 'Front-end Developer', averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', type: 'Full-time', profile: p5,baseSalary: 15000, Allowance: 3000, Deduction: 520, Paystatus: 'Paid' },
  { name: 'Amanuel Desta', id: 'EM3521242', department: 'Hardware', designation: 'Hardware Engineer', type: 'Full-time',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', profile: p6 ,baseSalary: 17000, Allowance: 3200, Deduction: 550, Paystatus: 'Paid'},
  { name: 'Bisrat Desta', id: 'EM3521243', department: 'Development', designation: 'Back-end Developer', type: 'Full-time',averageInTime: '8:00 AM',
  averageOutTime: '6:00 PM',averageWorkingHours: 8,
  averageBreakTime: '60', profile: p2, baseSalary: 17000, Allowance: 3200, Deduction: 550, Paystatus: 'Paid' },
];
const initialDepartments = [
  {
      mainDepartment: 'Academic',
      subDepartments: [
          { name: 'Registrar', employees: [] },
          { name: 'Academic Staff', employees: [] }
      ]
  },
  {
      mainDepartment: 'Research And Development',
      subDepartments: [
          { name: 'Hardware Intensive', employees: [] },
          { name: 'Software Intensive', employees: [] }
      ]
  },
  {
      mainDepartment: 'Production',
      subDepartments: [
          { name: 'Manufacturing', employees: [] },
          { name: 'Quality Control', employees: [] }
      ]
  }
];
export const leaveData = [
  { employeeId: 'EM3521231', leaveRecords: [{ date: '2023-08-01',dateTo:'2023-08-03', type: 'Sick Leave', status: 'Approved' }, ] },
  // More leave records
];

export const promotionData = [
  { employeeId: 'EM3521231', promotionRecords: [{ date: '2022-05-15', oldPosition: ' Developer', newPosition: 'Director',oldSalary : 10000,newsalary:15000 },] },
  // More promotion records
];

export const trainingData = [
  { employeeId: 'EM3521231', trainingRecords: [{ date: '2023-01-10', program: 'React Training', status: 'Completed' }, ] },
  // More training records
];

const attendance = [
  {
    employeeId: 'EM3521231',
    records: [
      {
        date: '2024-08-24',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        
      },
      {
        date: '2024-08-15',
        clockIn: '08:00 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '06:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521232',
    records: [
      {
        date: '2024-08-15',
        clockIn: '09:15 AM',
        lunchOut: '12:30 PM',
        lunchIn: '01:30 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-14',
        clockIn: '08:50 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:50 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '08:40 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:40 PM',
        status: 'On Time'
      }
    ],
  },
  {
    employeeId: 'EM3521233',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521234',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:01 PM',
        clockOut: '06:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521235',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521236',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521237',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521238',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521239',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521241',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521242',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
  {
    employeeId: 'EM3521243',
    records: [
      {
        date: '2024-08-15',
        clockIn: '08:30 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:30 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-14',
        clockIn: '08:45 AM',
        lunchOut: '12:00 PM',
        lunchIn: '01:00 PM',
        clockOut: '05:45 PM',
        status: 'On Time'
      },
      {
        date: '2024-08-13',
        clockIn: '09:15 AM',
        lunchOut: '12:15 PM',
        lunchIn: '01:15 PM',
        clockOut: '06:15 PM',
        status: 'Late'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'Absent'
      },
      {
        date: '2024-08-12',
        clockIn: '',
        lunchOut: '',
        lunchIn: '',
        clockOut: '',
        status: 'On leave'
      }
    ],
  },
];

export { employees, attendance, initialDepartments };
