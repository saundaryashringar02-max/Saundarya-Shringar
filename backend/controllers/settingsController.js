const Settings = require('../models/Settings');
const { syncAllProductPrices } = require('../utils/priceHelper');

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

        // Fetch current settings to check if delivery charge changed
        const oldSettings = await Settings.findOne({ type: 'global' });
        const chargeChanged = oldSettings && deliveryCharge !== undefined && oldSettings.deliveryCharge !== deliveryCharge;

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

        // If shipping charge changed, sync all products
        if (chargeChanged) {
            console.log(`Logistics change detected: Syncing products...`);
            await syncAllProductPrices();
        }

        res.json({ status: 'success', data: { settings } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
