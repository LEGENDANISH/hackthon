const Crop = require('../models/Crop');
const WeatherService = require('../services/WeatherService');
const MLService = require('../services/MLService');

class CropController {
    constructor() {
        this.weatherService = new WeatherService();
        this.mlService = new MLService();
    }

    async getCropHealth(req, res) {
        try {
            const { cropId } = req.params;
            
            const crop = await Crop.findById(cropId)
                .populate('sensors')
                .populate('farm')
                .exec();

            if (!crop) {
                return res.status(404).json({
                    success: false,
                    message: 'Crop not found'
                });
            }

            const weather = await this.weatherService.getForecast(
                crop.farm.location.coordinates[0],
                crop.farm.location.coordinates[1]
            );

            const healthAnalysis = await this.mlService.analyzeCropHealth({
                crop,
                weather
            });

            res.json({
                success: true,
                data: healthAnalysis
            });
        } catch (error) {
            console.error('Crop health analysis error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = CropController; 