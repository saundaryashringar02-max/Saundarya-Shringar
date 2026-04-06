const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ type: 'global' });
        if (!settings) {
            settings = await Settings.create({ type: 'global' });
        }
        res.json({ status: 'success', data: { settings } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const { 
            taxRate, 
            deliveryCharge, 
            freeDeliveryThreshold,
            estDeliveryDays,
            shippingPartner,
            trackingUrl,
            supportContact
        } = req.body;

        const settings = await Settings.findOneAndUpdate(
            { type: 'global' },
            { 
              taxRate, 
              deliveryCharge, 
              freeDeliveryThreshold,
              estDeliveryDays,
              shippingPartner,
              trackingUrl,
              supportContact,
              updatedBy: req.user?._id 
            },
            { new: true, upsert: true }
        );
        res.json({ status: 'success', data: { settings } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
