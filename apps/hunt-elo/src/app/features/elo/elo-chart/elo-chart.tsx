import { curveNatural } from '@visx/curve';
import { Group } from '@visx/group';
import {
    MarkerArrow,
    MarkerCircle,
    MarkerCross,
    MarkerLine,
    MarkerX,
} from '@visx/marker';
import { LinePath } from '@visx/shape';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { eloHistorySelector } from '../../../_store/_selectors/elo-store/elo-history.selector';
import { eloSelector } from '../../../_store/_selectors/elo-store/elo.selector';
import { selectedUserIdSelector } from '../../../_store/_selectors/settings/selected-user-id.selector';

// /**
//  * The elo display component
//  * @returns {object} the elo display component
//  */
// export function EloChart() {
//     const userId = useSelector(selectedUserIdSelector);
//     const elo = useSelector(eloSelector(userId));
//     const eloHistory = useSelector(eloHistorySelector(userId));
//     const width = 1000;
//     const svgHeight = 300;
//     const lineHeight = svgHeight;
//     const series = useMemo(
//         () =>
//             eloHistory ? [[...eloHistory, ...eloHistory, ...eloHistory]] : [[]],
//         [eloHistory]
//     );
//     return (
//         <svg width={width} height={svgHeight}>
//             <MarkerX
//                 id="marker-x"
//                 stroke="#333"
//                 size={22}
//                 strokeWidth={4}
//                 markerUnits="userSpaceOnUse"
//             />
//             <MarkerCross
//                 id="marker-cross"
//                 stroke="#333"
//                 size={22}
//                 strokeWidth={4}
//                 strokeOpacity={0.6}
//                 markerUnits="userSpaceOnUse"
//             />
//             <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} />
//             <MarkerArrow
//                 id="marker-arrow-odd"
//                 stroke="#333"
//                 size={8}
//                 strokeWidth={1}
//             />
//             <MarkerLine
//                 id="marker-line"
//                 fill="#333"
//                 size={16}
//                 strokeWidth={1}
//             />
//             <MarkerArrow id="marker-arrow" fill="#333" refX={2} size={6} />
//             <rect
//                 width={width}
//                 height={svgHeight / 2}
//                 fill="red"
//                 rx={14}
//                 ry={14}
//             />
//             {width > 8 &&
//                 series.map((lineData, i) => {
//                     const even = i % 2 === 0;
//                     let markerStart = even
//                         ? 'url(#marker-cross)'
//                         : 'url(#marker-x)';
//                     if (i === 1) markerStart = 'url(#marker-line)';
//                     const markerEnd = even
//                         ? 'url(#marker-arrow)'
//                         : 'url(#marker-arrow-odd)';

//                     return (
//                         <Group key={`lines-${i}`} left={13} top={0}>
//                             {lineData?.map((d, j) => (
//                                 <circle
//                                     key={i + j}
//                                     r={3}
//                                     cx={j}
//                                     cy={d}
//                                     stroke="rgba(33,33,33,0.5)"
//                                     fill="#ffffff"
//                                 />
//                             ))}
//                             <LinePath<number>
//                                 curve={curveNatural}
//                                 data={lineData ?? [[]]}
//                                 x={i}
//                                 y={(x: number) => x ?? 5}
//                                 stroke="#ffffff"
//                                 strokeWidth={even ? 2 : 1}
//                                 strokeOpacity={even ? 0.6 : 1}
//                                 shapeRendering="geometricPrecision"
//                                 markerMid="url(#marker-circle)"
//                                 markerStart={markerStart}
//                                 markerEnd={markerEnd}
//                             />
//                         </Group>
//                     );
//                 })}
//         </svg>
//     );
// }

// export default EloChart;

import React, { useState } from 'react';
import { extent, max } from 'd3-array';
import * as allCurves from '@visx/curve';
import generateDateValue, {
    DateValue,
} from '@visx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@visx/scale';

type CurveType = keyof typeof allCurves;

const curveTypes = Object.keys(allCurves);
const lineCount = 5;
const series = new Array(lineCount).fill(null).map((_, i) =>
    // vary each series value deterministically
    generateDateValue(25, /* seed= */ i / 72).sort(
        (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()
    )
);
const allData = series.reduce((rec, d) => rec.concat(d), []);

// data accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date],
});
const yScale = scaleLinear<number>({
    domain: [0, max(allData, getY) as number],
});

export type CurveProps = {
    width: number;
    height: number;
    showControls?: boolean;
};

// eslint-disable-next-line require-jsdoc
export default function Example({
    width = 1000,
    height = 300,
    showControls = true,
}: CurveProps) {
    const [curveType, setCurveType] = useState<CurveType>('curveNatural');
    const [showPoints, setShowPoints] = useState<boolean>(true);
    const svgHeight = showControls ? height - 40 : height;
    const lineHeight = svgHeight / 1;

    // update scale output ranges
    xScale.range([0, width - 50]);
    yScale.range([lineHeight - 2, 0]);

    return (
        <div className="visx-curves-demo">
            {/* {showControls && (
                <>
                    <label>
                        Curve type &nbsp;
                        <select
                            onChange={e =>
                                setCurveType(e.target.value as CurveType)
                            }
                            value={curveType}
                        >
                            {curveTypes.map(curve => (
                                <option key={curve} value={curve}>
                                    {curve}
                                </option>
                            ))}
                        </select>
                    </label>
                    &nbsp;
                    <label>
                        Show points&nbsp;
                        <input
                            type="checkbox"
                            checked={showPoints}
                            onChange={() => setShowPoints(!showPoints)}
                        />
                    </label>
                    <br />
                </>
            )} */}
            <svg width={width} height={svgHeight}>
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
                {width > 8 &&
                    series.map((lineData, i) => {
                        if (i !== 0) {
                            return;
                        }
                        const even = i % 2 === 0;
                        const markerStart = even
                            ? 'url(#marker-cross)'
                            : 'url(#marker-x)';
                        // if (i === 1) markerStart = 'url(#marker-line)';
                        const markerEnd = even
                            ? 'url(#marker-arrow)'
                            : 'url(#marker-arrow-odd)';
                        return (
                            <Group
                                key={`lines-${i}`}
                                top={i * lineHeight}
                                left={13}
                            >
                                {lineData.map((d: DateValue, j: number) => (
                                    <circle
                                        key={i + j}
                                        r={5}
                                        cx={xScale(getX(d))}
                                        cy={yScale(getY(d))}
                                        stroke="#ffffff52"
                                        fill="transparent"
                                    />
                                ))}
                                <LinePath<DateValue>
                                    curve={allCurves[curveType]}
                                    data={lineData}
                                    x={d => xScale(getX(d)) ?? 0}
                                    y={d => yScale(getY(d)) ?? 0}
                                    stroke="white"
                                    strokeWidth={even ? 2 : 1}
                                    strokeOpacity={even ? 0.6 : 1}
                                    shapeRendering="geometricPrecision"
                                    markerMid="url(#marker-circle)"
                                    markerEnd={markerEnd}
                                    markerStart={markerStart}
                                />
                            </Group>
                        );
                    })}
            </svg>
        </div>
    );
}
