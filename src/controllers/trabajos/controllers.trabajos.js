const TRABAJO = require("../../model/trabajos/trabajos")
const ctrls = {}




try {
    ctrls.createJob = async (req, res) => {
        const { date,
            numero,
            trabajadores,
            supervisor,
            progress,
            fechaEnd,
            gastos,
            presupuesto,
            ordencompra } = req.body
        const data = new TRABAJO({
            date,
            numero,
            trabajadores,
            supervisor,
            progress,
            fechaEnd,
            gastos,
            presupuesto,
            ordencompra
        })
        await data.save()
        res.json({
            message: "success",
            body: data

        })
    }
} catch (error) {
    res.json({
        message: "error",
        body: error
    })
}



ctrls.findJobById = async (req, res) => {
    try {
        const data = await TRABAJO.findById({ _id: req.params.id }).populate("presupuesto")
        if (!data) {
            res.status(404).json({
                message: "error",
                body: "not found"
            })
        }

        res.status(200).json({
            message: "success",
            body: data
        })

    } catch (error) {
        res.status(500).json({
            message: "error",
            body: error
        })
    }


}



ctrls.allJobs = async (req, res) => {
    try {
        const data = await TRABAJO.find().populate({
            path: 'presupuesto',
            populate: {
                path: 'client',
                model: 'clients',
            },
        });
        if (!data) {
            res.status(404).json({
                message: "error",
                body: "not found"
            })
        }

        res.status(200).json({
            message: "success",
            body: data
        })
    } catch (error) {
        res.status(500).json({
            message: "error",
            body: error
        })
    }
}
ctrls.allJobsForIdCliend = async (req, res) => {
    try {
        const data = await TRABAJO.find().populate({
            path: 'presupuesto',
            populate: {
                path: 'client',
                model: 'clients',
            },
        });
        
  

        const filteredData = data.filter((element) => {
            return element.presupuesto && element.presupuesto.client && element.presupuesto.client._id && element.presupuesto.client._id.toString() === req.params.id;
        });

        console.log('Filtered Data:', filteredData); 
        if (!filteredData.length) {
            return res.status(404).json({
                message: "error",
                body: "not found"
            });
        }

        res.status(200).json({
            message: "success",
            body: filteredData
        });
    } catch (error) {
        res.status(500).json({
            message: "error",
            body: error
        });
    }
}

ctrls.deleteJob = async (req, res) => {
    try {
        const data = await TRABAJO.findByIdAndDelete({ _id: req.params.id })
        if (!data) {
            res.status(404).json({
                message: "error",
                body: "not found"
            })
        }

        res.status(200).json({
            message: "success",
            body: data
        })
    } catch (error) {

        res.status(500).json({
            message: "error",
            body: error
        })
    }

}

ctrls.updateJob = async (req, res) => {
    try {
        const { date,
            numero,
            trabajadores,
            supervisor,
            progress,
            fechaEnd,
            gastos,
            presupuesto,
            ordencompra } = req.body

        const data = await TRABAJO.findOneAndUpdate({ _id: req.params.id }, {
            date,
            numero,
            trabajadores,
            supervisor,
            progress,
            fechaEnd,
            gastos,
            presupuesto,
            ordencompra
        }, { new: true })

        if (!data) {
            res.status(404).json({
                message: "error",
                body: "not found"
            })
        }

        res.status(200).json({
            message: "success",
            body: data
        })
    } catch (error) {

        res.status(500).json({
            message: "error",
            body: error
        })
    }
}
module.exports = ctrls