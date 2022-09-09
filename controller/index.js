import Appliances from "../models";

export const readAppliances = async (req, res) => {
    try {
        const applainces = await Appliances.find();
        res.status(200).json(applainces);
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}
export const createAppliance = async (req, res) => {
    const applaince = new Appliances(req.body);
    try {
        await applaince.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}