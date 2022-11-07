const controller = {};

controller.index = (req, res) => {
    res.status(200).json({
        message: "Inicio"
    });
};

export { controller as ControllerIndex }
