import { MouseEvents } from 'froobit';
import { ControlPoint } from '../entity/ControlPoint';
import { Events } from '../lib/events';

const POINT_RADIUS = 12;
const CONTROL_POINTS_COUNT = 4;

const ControlPointController = ({
	p5,
	onEvent,
	render,
	trigger,
}) => {
	const controlPoints = {};
	const makeKey = (x, y) => {
		return `${x}:${y}`;
	};
	const splitKey = (key) => {
		return key.split(':');
	};
	const reachedLimit = () => {
		return Object.keys(controlPoints).length === CONTROL_POINTS_COUNT;
	};
	const triggerControlPointsUpdate = () => {
		trigger(Events.ControlPointsAdded, [
			...Object.values(controlPoints),
		]);
	};
	const findControlPointKeyUnderMouse = () => {
		const {
			mouseX: mx,
			mouseY: my,
		} = p5;
		return Object.keys(controlPoints).find((key) => {
			const [ kx, ky ] = splitKey(key);
			const x = parseFloat(kx);
			const y = parseFloat(ky);
			return p5.dist(x, y, mx, my) < POINT_RADIUS / 2;
		});
	};
	const checkIfClickedInside = () => {
		return !!findControlPointKeyUnderMouse();
	};
	let selected = null;
	onEvent(MouseEvents.mousePressed, () => {
		const key = findControlPointKeyUnderMouse();
		if (key) {
			selected = key;
		}
	});
	onEvent(MouseEvents.mouseReleased, () => {
		const {
			mouseX: mx,
			mouseY: my,
		} = p5;
		if (!selected) {
			if (checkIfClickedInside()) {
				return;
			}
			if (reachedLimit()) {
				return;
			}
			const newControlPoint = new ControlPoint({
				x: mx,
				y: my,
			}, POINT_RADIUS);
			controlPoints[makeKey(mx, my)] = newControlPoint;
			render(newControlPoint);
			if (reachedLimit()) {
				triggerControlPointsUpdate();
			}
			return;
		}
		const controlPoint = controlPoints[selected];
		delete controlPoints[selected];
		controlPoints[makeKey(mx, my)] = controlPoint;
		selected = null;
	});
	onEvent(MouseEvents.mouseDragged, () => {
		const {
			mouseX: mx,
			mouseY: my,
		} = p5;
		if (selected) {
			controlPoints[selected].update(mx, my);
			if (reachedLimit()) {
				triggerControlPointsUpdate();
			}
		}
	});
};

export default ControlPointController;