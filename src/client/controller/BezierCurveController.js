import { BezierCurve } from '../entity/BezierCurve';
import { Events } from '../lib/events';

const BezierCurveController = ({
	accept,
}) => {
	const curve = new BezierCurve();
	accept(Events.ControlPointsAdded, (controlPoints) => {
		const points = controlPoints
			.sort((c1, c2) => {
				return c1.id - c2.id;
			})
			.reduce((acc, curr) => {
				const { x, y } = curr.getPos();
				return [
					...acc,
					x,
					y,
				];
			}, []);
		curve.update(points);
	});
	return curve;
};

export default BezierCurveController;