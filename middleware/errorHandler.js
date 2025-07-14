const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);

    res.status(500).json({
        message: err.message || 'Something went wrong',
    });
};

module.exports = errorHandler;
