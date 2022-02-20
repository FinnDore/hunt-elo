import { curveNatural } from '@visx/curve';
import { GradientOrangeRed } from '@visx/gradient';
import { Group } from '@visx/group';
import {
    MarkerArrow,
    MarkerCircle,
    MarkerCross,
    MarkerLine,
    MarkerX,
} from '@visx/marker';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { eloHistorySelector } from '../../../_store/_selectors/elo-store/elo-history.selector';
import { selectedUserIdSelector } from '../../../_store/_selectors/settings/selected-user-id.selector';
import classes from './elo-chart.module.scss';

export interface EloChartProps {
    width: number;
    height: number;
    showControls?: boolean;
}

// eslint-disable-next-line require-jsdoc
export default function Example({
    width = 1000,
    height = 300,
    showControls = true,
}: EloChartProps) {
    const svgHeight = showControls ? height - 40 : height;

    const userId = useSelector(selectedUserIdSelector);
    const eHistory = useSelector(eloHistorySelector(userId));
    const eloHistory = useMemo(() => eHistory ?? [], [eHistory]);

    const yScale = useMemo(
        () =>
            scaleLinear({
                domain: [
                    Math.min(...(eHistory ?? [])),
                    Math.max(...(eHistory ?? [])),
                ],
                range: [height * 0.7, height * 0.3],
                round: true,
                clamp: true,
            }),
        [eHistory, height]
    );

    const xScale = useMemo(
        () =>
            scaleLinear({
                domain: [eloHistory.length - 1, 0],
                range: [0, width],
                round: true,
                clamp: true,
            }),
        [eloHistory.length, width]
    );

    const lineThing = useMemo(() => {
        const even = true;
        const markerStart = even ? 'url(#marker-cross)' : 'url(#marker-x)';
        console.log(eHistory);
        return (
            <Group left={13}>
                <GradientOrangeRed id="elo-gradient" />
                {eloHistory.length > 1 && (
                    <>
                        {eloHistory.map(
                            (val: number, i: number) =>
                                i !== 0 &&
                                i !== eloHistory.length - 1 && (
                                    <circle
                                        key={`${val} ${i}`}
                                        r={5}
                                        cx={width - xScale(i)}
                                        cy={yScale(val)}
                                        stroke="#ffffff52"
                                        fill="transparent"
                                    />
                                )
                        )}
                        <LinePath
                            curve={curveNatural}
                            data={eloHistory}
                            x={(x, i) => width - xScale(i)}
                            y={y => yScale(y)}
                            stroke="url(#elo-gradient)"
                            strokeWidth={even ? 2 : 1}
                            strokeOpacity={even ? 0.6 : 1}
                            shapeRendering="geometricPrecision"
                            markerMid="url(#marker-circle)"
                            markerEnd={'url(#marker-arrow-odd)'}
                            markerStart={markerStart}
                        />
                    </>
                )}
            </Group>
        );
    }, [eHistory, eloHistory, width, xScale, yScale]);

    return (
        <div>
            <svg width={width} height={svgHeight} className={classes['svg']}>
                <MarkerX
                    id="marker-x"
                    stroke="#333"
                    size={22}
                    strokeWidth={4}
                    markerUnits="userSpaceOnUse"
                />
                <MarkerCross
                    id="marker-cross"
                    stroke="#ffff"
                    size={22}
                    strokeWidth={4}
                    strokeOpacity={0.6}
                    markerUnits="userSpaceOnUse"
                />
                <MarkerCircle
                    id="marker-circle"
                    fill="#ffff"
                    size={2}
                    refX={2}
                />
                <MarkerArrow
                    id="marker-arrow-odd"
                    stroke="#ffff"
                    size={8}
                    strokeWidth={1}
                />
                <MarkerLine
                    id="marker-line"
                    fill="#ffff"
                    size={16}
                    strokeWidth={1}
                />
                <MarkerArrow id="marker-arrow" fill="#ffff" refX={2} size={6} />
                <rect
                    width={width}
                    height={svgHeight}
                    fill="#00000000"
                    rx={14}
                    ry={14}
                />

                {lineThing}
            </svg>
        </div>
    );
}
