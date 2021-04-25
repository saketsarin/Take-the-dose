module.exports =(mongoose) => {
    const modelName = 'Patient';
    const collectionName = 'patients';

    const schema = new mongoose.Schema({
        name: {type: String, require: true},
        password: {type: String, require: true},
        email: {type: String, require: false},
        RemindersInfo: [{
            name: { type: String, required: true },
            remindTime: {type: Date, required: true}
        }]
    }, {
        strict: true,
        id: false,
        }
    );

    schema.set('toObject', {virtual: true});
    schema.set('toJSON', {virtuals: true});

    mongoose.model(modelName, schema, collectionName);
}