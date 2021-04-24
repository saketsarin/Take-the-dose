module.exports =(mongoose) => {
    const modelName = 'Patient';
    const collectionName = 'patients';

    const schema = new mongoose.Schema({
        name: {type: String, require: true},
        username: {type: String, require: true},
        password: {type: String, require: true},
        email: {type: String, require: false},
    }, {
        strict: true,
        id: false,
        }
    );

    schema.set('toObject', {virtual: true});
    schema.set('toJSON', {virtuals: true});

    mongoose.model(modelName, schema, collectionName);
}