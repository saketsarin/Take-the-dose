const router = require('express').Router();
const patientController = require('../controllers/patient-controller');

console.log('router')

router.post('/patients/login', patientController.loginPatient)

router.post('/patients', patientController.postPatient);

router.get('/patients', patientController.getPatients);

router.get('/patients/:patientId', patientController.getPatient);

router.put('/patients/:patientId', patientController.putPatient);

router.delete('/patients/:patientId', patientController.deletePatient)




module.exports = router;