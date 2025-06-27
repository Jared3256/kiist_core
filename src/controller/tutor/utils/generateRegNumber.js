import AdminCounterModel from "../../../models/tutor/tutor.counter.model.js";

function padNumber(num, size = 4) {
    return String(num).padStart(size, '0');
}

export async function generateRegNumber(role) {
    const now = new Date();
    const year = now.getFullYear();
    const prefix = role === "admin" ? "ADM" : "LEC"; // Add more roles as needed

    const counterKey = `${prefix}-${year}`;

    const updatedCounter = await AdminCounterModel.findOneAndUpdate(
        {_id: counterKey},
        {$inc: {seq: 1}},
        {new: true, upsert: true}
    );

    const regNumber = `KIIST/${prefix}/${padNumber(updatedCounter.seq)}/${year}`;
    return regNumber;
}