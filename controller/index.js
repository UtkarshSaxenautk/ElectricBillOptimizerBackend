import Appliances from "../models/index.js";

export const readAppliances = async (req, res) => {
    try {
        const applainces = await Appliances.find({userId: req.params.user_id});
        res.status(200).json(applainces);
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}
export const createUser = async (req, res) => {
    const applaince = new Appliances(req.body);
    try {
        await applaince.save();
        res.status(201).json("Hurray userdata posted successfully");
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}