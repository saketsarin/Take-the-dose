
const database = require('../database');
const Patient = database.model('Patient');

exports.loginPatient = async (req, res, next) => {
    try {
        const patient = await Patient.find({name: req.body.name})
        
        if (patient.length == 0) {
            return res.status(400).send('Cannot find patient name')
        }
         if (patient) {
             try {
                if (patient[0].password == req.body.password) {
                  return  res.status(200).send("successfully login")
                }
                else {
                 return   res.status(200).send("Wrong password")
                }
             }
             catch {
                return res.status(500).send()
             }
         }

    }
    catch (err) {
        next(err)
    }   
}

exports.postPatient = async (req, res, next) => {
  try {

    // const salt = await crypt.genSalt();
    // const hashPassword = await crypt.hash(req.body.password, salt)
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);

  } catch (err) {
    next(err);
  }
};

exports.getPatients = async (req, res, next) => {

    try {
        Patient.find({}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json(result);
            }
          });

    
      } catch (err) {
        next(err);
      }

}

exports.getPatient = async (req, res, next) => {
    try {
        const result     = await Patient.findById(req.params.patientId);

        if (!result) throw new NotFound('The resource could not be found.');
        // Send the team to the client.
        res.status(200).json(result);

    } catch (err) {
        next(err)
    }
}

exports.putPatient = async (req, res, next) => {
    try {
        const updatePatient = await Patient.findByIdAndUpdate(req.params.patientId,
             req.body, {runValidators: true, new: true});
        
        if (!updatePatient) throw new NotFound('The resource could not be found.');
        res.status(200).json(updatePatient);

    }
    catch(err) {
        next(err)

    }
}


exports. deletePatient = async (req, res, next) => {
    try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.patientId);
    if (!deletedPatient) throw new NotFound('The resource could not be found.');
    res.sendStatus(204);

    } catch (err) {
        next(err)
    }
}