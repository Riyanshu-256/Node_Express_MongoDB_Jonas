// Function to handle request for getting all users
exports.getAllUsers = (req, res) => {

    // Send a response with status 500 (means something is wrong)
    res.status(500).json({
        status: 'error', // Shows there is an error
        message: 'This route is not yet defined!' // Tells that this part is not made yet
    });
};

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet define!'
    });
};

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet define!'
    });
};

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet define!'
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet define!'
    });
};
