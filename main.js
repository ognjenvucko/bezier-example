import Framework, { scene } from 'froobit';
import BackgroundController from './src/client/controller/BackgroundController';
import ControlPointController from './src/client/controller/ControlPointController';
import BezierCurveController from './src/client/controller/BezierCurveController';

// assets
import img from './assets/madeWith.png';
import MadeWithController from './src/client/controller/MadeWithController';
import InfoTextController from './src/client/controller/InfoTextController';

// Entry point

const assets = {
	images: {
		img,
	},
};

const controllers = [
	BackgroundController,
	MadeWithController,
	InfoTextController,
	ControlPointController,
	BezierCurveController,
];

const options = {
	assets,
	scene: scene(800, 450),
};

Framework.with(controllers, options).init();