const TASK = require("../../model/task/task")
const ctrls = {}



ctrls.createTask = async (req, res) => {
    try {
        const { description, price } = req.body
        console.log("description : ", description);
        const newDescription = await TASK.findOne({ description: description });

        if (newDescription) {
            return res.json({
                message: "error",
                body: "task/description-already-in-use",
            });
        }
        const data = new TASK({
            description,
            price,
            cantidad:1,
            hoursM:1,
            total:price
        })
        await data.save()
        res.json({
            message: "success",
            body: data

        })
    } catch {
        return res.json({
            message: "error",
            body: error,
        });
    }
}



ctrls.allTask = async (req, res) => {
    const data = await TASK.find()
    res.json( data );
};


ctrls.updateTask = async (req, res) => {
    const { description, price } = req.body
    const oldTask = await TASK.findById(req.params.id);

    if (oldTask.description == description) {
        const data = await TASK.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
      return  res.json({
        message: "success",
        body: data,
        })
    
    } else {
        const repeated = await TASK.findOne({description:description})
        if(repeated){
            return res.json({
                message: "error",
                body: "task/description-already-in-use",
              });

        }else{
            const data = await TASK.findByIdAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            );
          return  res.json({
            message: "success",
            body: data,
            })
         
        }
       
    }
  

}

ctrls.deleteTask = async (req, res) => {
    try {
        await TASK.findOneAndDelete({ _id: req.params.id })
        res.json({
            message: "success"
        })

    } catch (error) {
        res.json({
            message: "error",
            body: error
        })
    }
}

module.exports = ctrls