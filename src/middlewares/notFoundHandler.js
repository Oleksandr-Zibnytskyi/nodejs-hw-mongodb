function notFoundHandler(_, res) {
    res.status(404).json({
        message: 'Not found',
      });
}

export { notFoundHandler };
